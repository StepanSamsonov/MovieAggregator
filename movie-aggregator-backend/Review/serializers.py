def serialize(review):
    return {
        'id': review.id,
        'text': review.text,
        'is_positive': review.is_positive,
        'film': review.film.id,
    }
