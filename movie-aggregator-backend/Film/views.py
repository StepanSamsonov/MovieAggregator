import json
import math
import globals

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponseNotFound
from django.db.models import Count, Q

from datetime import datetime

from .models import Film
from .serializers import serialize, serialize_demo
from Actor.models import Actor
from Genre.models import Genre
from Genre.serializers import serialize_demo as serialize_demo_genre
from Company.models import Company


@csrf_exempt
def film_view(request, film_id=None):
    if request.method == 'GET':
        if film_id:
            film = Film.objects.get(id=film_id)
            response = JsonResponse(serialize(film))
        else:
            query = request.GET.dict()
            page = int(query['page']) if query.get('page') else 1

            languages = list(set([film.language for film in Film.objects.all()]))
            countries = list(set([film.country for film in Film.objects.all()]))
            genres = [serialize_demo_genre(genre) for genre in Genre.objects.all()]

            name_filter = query.get('nameFilter') or ''
            budget_from_filter = query.get('budgetFromFilter') or 0
            budget_to_filter = query.get('budgetToFilter') or 1000000000
            language_filter = request.GET.getlist('languagesFilter') or languages
            country_filter = request.GET.getlist('countriesFilter') or countries
            genre_filter = request.GET.getlist('genresFilter') or [genre['id'] for genre in genres]
            with_reviews_filter = query.get('withReviewsFilter') or 'all'

            films = Film.objects.filter(name__contains=name_filter,
                                        budget__gte=budget_from_filter,
                                        budget__lte=budget_to_filter,
                                        language__in=language_filter,
                                        country__in=country_filter,
                                        )

            if with_reviews_filter == 'yes':
                films = films.annotate(review_count=Count('review')).filter(~Q(review_count=0))
            elif with_reviews_filter == 'no':
                films = films.annotate(review_count=Count('review')).filter(review_count=0)

            if genre_filter:
                genre_filter = Genre.objects.filter(id__in=genre_filter)
                films = [film for film in films if len(set(film.genres.all()) & set(genre_filter)) != 0]

            total_pages = math.ceil(len(films)/globals.PAGE_SIZE)

            if len(films) and page > total_pages or page < 0:
                return HttpResponseNotFound('<h1>Page not found</h1>')

            prev_page = page - 1 if page > 1 else None
            next_page = page + 1 if page < total_pages else None

            response = JsonResponse({
                'data': globals.get_page(page, films, serialize_demo),
                'page': page,
                'total_pages': total_pages,
                'prev_page': prev_page,
                'next_page': next_page,
                'languages': languages,
                'countries': countries,
                'genres': genres,
            }, safe=False)

    elif request.method == 'POST':
        data = json.loads(request.body)
        film = Film.objects.create(
            budget=data['budget'],
            name=data['name'],
            language=data['language'],
            overview=data['overview'],
            country=data['country'],
            date=datetime.strptime(data['date'], '%d/%m/%Y'),
            revenue=data['revenue'],
            runtime=data['runtime'],
            tagline=data['tagline'],
            image=data['image'],
        )
        film.save()

        actors = Actor.objects.filter(id__in=data['actors'])
        film.actors.add(*actors)

        genres = Genre.objects.filter(id__in=data['genres'])
        film.genres.add(*genres)

        companies = Company.objects.filter(id__in=data['companies'])
        film.companies.add(*companies)
        film.save()

        response = JsonResponse(serialize(film))

    elif request.method == 'PUT':
        film = Film.objects.get(id=film_id)
        data = json.loads(request.body)
        update_fields = []

        if data.get('budget'):
            film.budget = int(data['budget'])
            update_fields.append('budget')

        if data.get('name'):
            film.name = data['name']
            update_fields.append('name')

        if data.get('language'):
            film.language = data['language']
            update_fields.append('language')

        if data.get('overview'):
            film.overview = data['overview']
            update_fields.append('overview')

        if data.get('country'):
            film.country = data['country']
            update_fields.append('country')

        if data.get('date'):
            film.date = datetime.strptime(data['date'], '%d/%m/%Y')
            update_fields.append('date')

        if data.get('revenue'):
            film.revenue = int(data['revenue'])
            update_fields.append('revenue')

        if data.get('runtime'):
            film.runtime = int(data['runtime'])
            update_fields.append('runtime')

        if data.get('tagline'):
            film.tagline = data['tagline']
            update_fields.append('tagline')

        if data.get('image'):
            film.image = data['image']
            update_fields.append('image')

        if data.get('actors'):
            film.actors.clear()
            actors = Actor.objects.filter(id__in=data['actors'])
            film.actors.add(*actors)

        if data.get('genres'):
            film.genres.clear()
            genres = Genre.objects.filter(id__in=data['genres'])
            film.genres.add(*genres)

        if data.get('companies'):
            film.companies.clear()
            companies = Company.objects.filter(id__in=data['companies'])
            film.companies.add(*companies)

        film.save(update_fields=update_fields)
        response = JsonResponse(serialize(film))

    elif request.method == 'DELETE':
        film = Film.objects.get(id=film_id)
        film.delete()
        response = JsonResponse(dict())

    else:
        response = JsonResponse(dict())

    response = globals.ser_cors_headers(response)
    return response
