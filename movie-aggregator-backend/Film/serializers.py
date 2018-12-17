def serialize(film):
    from Actor.serializers import serialize_demo as serialize_demo_actor
    from Genre.serializers import serialize_demo as serialize_demo_genre
    from Company.serializers import serialize_demo as serialize_demo_company
    from Review.serializers import serialize as serialize_review

    return {
        'id': film.id,
        'budget': film.budget,
        'name': film.name,
        'language': film.language,
        'overview': film.overview,
        'country': film.country,
        'date': film.date.strftime('%d/%m/%Y'),
        'revenue': film.revenue,
        'runtime': film.runtime,
        'tagline': film.tagline,
        'image': film.image,
        'actors': [serialize_demo_actor(actor) for actor in film.actors.all()],
        'genres': [serialize_demo_genre(genre) for genre in film.genres.all()],
        'companies': [serialize_demo_company(company) for company in film.companies.all()],
        'reviews': [serialize_review(review) for review in film.review_set.all()],
    }


def serialize_demo(film):
    return {
        'id': film.id,
        'name': film.name,
        'image': film.image,
    }
