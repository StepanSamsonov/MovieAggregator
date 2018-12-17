import json
import math
import globals

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponseNotFound

from Film.models import Film
from Genre.models import Genre
from .models import Actor
from .serializers import serialize, serialize_demo


@csrf_exempt
def actor_view(request, actor_id=None):
    if request.method == 'GET':
        if actor_id:
            actor = Actor.objects.get(id=actor_id)
            response = JsonResponse(serialize(actor))
        else:
            query = request.GET.dict()
            page = int(query['page']) if query.get('page') else 1
            name_filter = query.get('filter') or ''
            film_id_filter = query.get('filmId')
            genre_id_filter = query.get('genreId')

            if film_id_filter is not None:
                film = Film.objects.get(id=film_id_filter)
                actors = film.actors.all()
            elif genre_id_filter is not None:
                genre = Genre.objects.get(id=genre_id_filter)
                actors = genre.actors.all()
            else:
                actors = Actor.objects.all()

            actors = actors.filter(name__contains=name_filter)
            total_pages = math.ceil(len(actors)/globals.PAGE_SIZE)

            if len(actors) and page > total_pages or page < 0:
                return HttpResponseNotFound('<h1>Page not found</h1>')

            prev_page = page - 1 if page > 1 else None
            next_page = page + 1 if page < total_pages else None

            response = JsonResponse({
                'data': globals.get_page(page, actors, serialize_demo),
                'page': page,
                'total_pages': total_pages,
                'prev_page': prev_page,
                'next_page': next_page,
            }, safe=False)

    elif request.method == 'POST':
        """
            name: string
            birthday: string as %d/%m/%Y
            genres: ids of genres
        """

        data = json.loads(request.body)
        actor = Actor.objects.create(
            name=data['name'],
            image=data['image'],
        )
        actor.save()

        genres = Genre.objects.filter(id__in=data['genres'])
        actor.genre_set.add(*genres)

        response = JsonResponse(serialize(actor))

    elif request.method == 'PUT':
        """
            name: string
            birthday: string as %d/%m/%Y
            genres: ids of genres
            films: ids of films
        """

        actor = Actor.objects.get(id=actor_id)
        data = json.loads(request.body)

        update_fields = []

        if data.get('name'):
            actor.name = data['name']
            update_fields.append('name')

        if data.get('image'):
            actor.image = data['image']
            update_fields.append('image')

        if data.get('films'):
            films = Film.objects.filter(id__in=data['films'])
            actor.film_set.clear()
            actor.film_set.add(*films)

        if data.get('genres'):
            genres = Genre.objects.filter(id__in=data['genres'])
            actor.genre_set.clear()
            actor.genre_set.add(*genres)

        actor.save(update_fields=update_fields)
        response = JsonResponse(serialize(actor))

    elif request.method == 'DELETE':
        actor = Actor.objects.get(id=actor_id)
        actor.delete()
        response = JsonResponse(dict())

    else:
        response = JsonResponse(dict())

    response = globals.ser_cors_headers(response)
    return response
