def serialize(company):
    from Film.serializers import serialize_demo as serialize_demo_film
    from Genre.serializers import serialize_demo as serialize_demo_genre

    return {
        'id': company.id,
        'name': company.name,
        'foundingDate': company.founding_date,
        'films': [serialize_demo_film(film) for film in company.film_set.all()],
        'genres': [serialize_demo_genre(genre) for genre in company.genre_set.all()],
    }


def serialize_demo(company):
    return {
        'id': company.id,
        'name': company.name,
        'foundingDate': company.founding_date,
    }
