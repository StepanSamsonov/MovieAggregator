def serialize(actor):
    from Film.serializers import serialize_demo as serialize_demo_film
    from Genre.serializers import serialize_demo as serialize_demo_genre

    return {
        'id': actor.id,
        'name': actor.name,
        'image': actor.image,
        'films': [serialize_demo_film(film) for film in actor.film_set.all()],
        'genres': [serialize_demo_genre(genre) for genre in actor.genre_set.all()]
    }


def serialize_demo(actor):
    return {
        'id': actor.id,
        'name': actor.name,
        'image': actor.image,
    }
