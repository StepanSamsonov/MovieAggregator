import json
import math
import globals

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponseNotFound

from Actor.models import Actor
from Company.models import Company
from Film.models import Film
from .models import Genre
from .serializers import serialize, serialize_demo


@csrf_exempt
def genre_view(request, genre_id=None):
    if request.method == 'GET':
        if genre_id:
            genre = Genre.objects.get(id=genre_id)
            response = JsonResponse(serialize(genre))
        else:
            query = request.GET.dict()
            page = int(query['page']) if query.get('page') else 1

            filter_name = query.get('filter') or ''
            film_id_filter = query.get('filmId')
            actor_id_filter = query.get('actorId')
            company_id_filter = query.get('companyId')

            if film_id_filter is not None:
                film = Film.objects.get(id=film_id_filter)
                genres = film.genres.all()
            elif actor_id_filter is not None:
                actor = Actor.objects.get(id=actor_id_filter)
                genres = actor.genre_set.all()
            elif company_id_filter is not None:
                company = Company.objects.get(id=company_id_filter)
                genres = company.genre_set.all()
            else:
                genres = Genre.objects.all()

            genres = genres.filter(name__contains=filter_name)
            total_pages = math.ceil(len(genres)/globals.PAGE_SIZE)

            if len(genres) and page > total_pages or page < 0:
                return HttpResponseNotFound('<h1>Page not found</h1>')

            prev_page = page - 1 if page > 1 else None
            next_page = page + 1 if page < total_pages else None

            response = JsonResponse({
                'data': globals.get_page(page, genres, serialize_demo),
                'page': page,
                'total_pages': total_pages,
                'prev_page': prev_page,
                'next_page': next_page,
            }, safe=False)

    elif request.method == 'POST':
        """
            name: string
            description: string
        """
        data = json.loads(request.body)
        genre = Genre.objects.create(
            name=data['name'],
            description=data['description'],
            image=data['image'],
        )
        response = JsonResponse(serialize(genre))

    elif request.method == 'PUT':
        """
            name: string
            description: string
            actors: ids of actors
            companies: ids of companies
            films: ids of films
        """
        genre = Genre.objects.get(id=genre_id)
        data = json.loads(request.body)
        update_fields = []

        if data.get('name'):
            genre.name = data['name']
            update_fields.append('name')

        if data.get('description'):
            genre.description = data['description']
            update_fields.append('description')

        if data.get('image'):
            genre.image = data['image']
            update_fields.append('image')

        if data.get('actors'):
            actors = Actor.objects.filter(id__in=data['actors'])
            genre.actors.clear()
            genre.actors.add(*actors)

        if data.get('companies'):
            companies = Company.objects.filter(id__in=data['companies'])
            genre.companies.clear()
            genre.companies.add(*companies)

        if data.get('films'):
            films = Film.objects.filter(id__in=data['films'])
            genre.film_set.clear()
            genre.film_set.add(*films)

        genre.save(update_fields=update_fields)
        response = JsonResponse(serialize(genre))

    elif request.method == 'DELETE':
        genre = Genre.objects.get(id=genre_id)
        genre.delete()
        response = JsonResponse({})

    else:
        response = JsonResponse({})

    response = globals.ser_cors_headers(response)
    return response
