def serialize(genre):
    from Actor.serializers import serialize_demo as serialize_demo_actor
    from Company.serializers import serialize_demo as serialize_demo_company
    from Film.serializers import serialize_demo as serialize_demo_film

    return {
        'id': genre.id,
        'name': genre.name,
        'description': genre.description,
        'image': genre.image,
        'actors': [serialize_demo_actor(actor) for actor in genre.actors.all()],
        'companies': [serialize_demo_company(company) for company in genre.companies.all()],
        'films': [serialize_demo_film(film) for film in genre.film_set.all()],
    }


def serialize_demo(genre):
    return {
        'id': genre.id,
        'name': genre.name,
        'image': genre.image,
    }
