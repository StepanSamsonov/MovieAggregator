import json
import math
import globals

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponseNotFound

from .models import Review
from .serializers import serialize
from Film.models import Film


@csrf_exempt
def review_view(request, review_id=None):
    if request.method == 'GET':
        if review_id:
            review = Review.objects.get(id=review_id)
            response = JsonResponse(serialize(review))
        else:
            total_pages = math.ceil(len(Review.objects.all())/globals.PAGE_SIZE)
            query = request.GET.dict()
            page = int(query['page']) if query.get('page') else 1

            if page > total_pages:
                return HttpResponseNotFound('<h1>Page not found</h1>')

            prev_page = str(page - 1) if page > 1 else None
            next_page = str(page + 1) if page < total_pages else None

            response = JsonResponse({
                'data': globals.get_page(page, Review.objects.all(), serialize),
                'page': page,
                'total_pages': total_pages,
                'prev_page': prev_page,
                'next_page': next_page,
            }, safe=False)

    elif request.method == 'POST':
        data = json.loads(request.body)
        review = Review.objects.create(
            text=data['text'],
            is_positive=data['is_positive'],
            film=Film.objects.get(id=data['film']),
        )
        response = JsonResponse(serialize(review))

    elif request.method == 'PUT':
        review = Review.objects.get(id=review_id)
        data = json.loads(request.body)
        update_fields = []

        if data.get('text'):
            review.text = data['text']
            update_fields.append('text')

        if data.get('is_positive'):
            review.is_positive = data['is_positive']
            update_fields.append('is_positive')

        if data.get('film'):
            review.film = Film.objects.get(id=data['film'])
            update_fields.append('film')

        review.save(update_fields=update_fields)
        response = JsonResponse(serialize(review))

    elif request.method == 'DELETE':
        review = Review.objects.get(id=review_id)
        review.delete()
        response = JsonResponse(dict())

    else:
        response = JsonResponse(dict())

    response = globals.ser_cors_headers(response)
    return response
