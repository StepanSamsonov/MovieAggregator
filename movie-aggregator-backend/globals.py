PAGE_SIZE = 20
BASE_URL = 'localhost:8000'


def get_page(page, collection, serialize):
    return [serialize(actor) for actor in collection[PAGE_SIZE*(page-1):PAGE_SIZE*page]]


def ser_cors_headers(response):
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"

    return response
