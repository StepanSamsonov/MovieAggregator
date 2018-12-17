import json
import math
import globals

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponseNotFound

from Film.models import Film
from Genre.models import Genre
from .models import Company
from .serializers import serialize, serialize_demo


@csrf_exempt
def company_view(request, company_id=None):
    if request.method == 'GET':
        if company_id:
            company = Company.objects.get(id=company_id)
            response = JsonResponse(serialize(company))
        else:
            query = request.GET.dict()
            page = int(query['page']) if query.get('page') else 1

            name_filter = query['nameFilter'] if query.get('nameFilter') else ''
            date_filter_from = query.get('dateFilterFrom') or 0
            date_filter_to = query.get('dateFilterTo') or 3000
            film_id_filter = query.get('filmId') or None
            genre_id_filter = query.get('genreId') or None

            if film_id_filter is not None:
                film = Film.objects.get(id=film_id_filter)
                companies = film.companies.all()
            elif genre_id_filter is not None:
                genre = Genre.objects.get(id=genre_id_filter)
                companies = genre.companies.all()
            else:
                companies = Company.objects.all()

            companies = companies.filter(name__contains=name_filter,
                                         founding_date__gte=date_filter_from,
                                         founding_date__lte=date_filter_to,
                                         )
            total_pages = math.ceil(len(companies)/globals.PAGE_SIZE)

            if len(companies) and page > total_pages or page < 0:
                return HttpResponseNotFound('<h1>Page not found</h1>')

            prev_page = page - 1 if page > 1 else None
            next_page = page + 1 if page < total_pages else None

            response = JsonResponse({
                'data': globals.get_page(page, companies, serialize_demo),
                'page': page,
                'total_pages': total_pages,
                'prev_page': prev_page,
                'next_page': next_page,
            }, safe=False)

    elif request.method == 'POST':
        """
            name: string
            founding_date: year, integer
            genres: ids of genres
        """

        data = json.loads(request.body)
        company = Company.objects.create(
            name=data['name'],
            founding_date=int(data['founding_date'])
        )
        company.save()

        genres = Genre.objects.filter(id__in=data['genres'])
        company.genre_set.add(*genres)

        response = JsonResponse(serialize(company))

    elif request.method == 'PUT':
        """
            name: string
            founding_date: year, integer
            genres: ids of genres
            films: ids of films
        """

        company = Company.objects.get(id=company_id)
        data = json.loads(request.body)
        update_fields = []

        if data.get('name'):
            company.name = data['name']
            update_fields.append('name')

        if data.get('founding_date'):
            company.founding_date = int(data['founding_date'])
            update_fields.append('founding_date')

        if data.get('genres'):
            genres = Genre.objects.filter(id__in=data['genres'])
            company.genre_set.clear()
            company.genre_set.add(*genres)

        if data.get('films'):
            films = Film.objects.filter(id__in=data['films'])
            company.film_set.clear()
            company.film_set.add(*films)

        company.save(update_fields=update_fields)
        response = JsonResponse(serialize(company))

    elif request.method == 'DELETE':
        company = Company.objects.get(id=company_id)
        company.delete()
        response = JsonResponse(dict())

    else:
        response = JsonResponse(dict())

    response = globals.ser_cors_headers(response)
    return response
