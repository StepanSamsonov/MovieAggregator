import requests
import json


# START
print('FILM TESTS. Start?')
input()

# POST
actors = requests.get(url='http://localhost:8000/actor')
actors = list(map(lambda x: x['id'], json.loads(actors.text)['data']))
genres = requests.get(url='http://localhost:8000/genre')
genres = list(map(lambda x: x['id'], json.loads(genres.text)['data']))
companies = requests.get(url='http://localhost:8000/company')
companies = list(map(lambda x: x['id'], json.loads(companies.text)['data']))

test_data = {
    'budget': 100000,
    'name': 'Test name',
    'language': 'language',
    'overview': 'Test overview',
    'country': 'country',
    'date': '01/01/1970',
    'revenue': 100000,
    'runtime': 100,
    'tagline': 'Test tagline',
    'image': 'New image',
    'actors': actors[0:2],
    'genres': genres[0:2],
    'companies': [companies[0]],
}
url = 'http://localhost:8000/film'
res = requests.post(url=url, data=json.dumps(test_data))
film_id = str(json.loads(res.text)['id'])
print(res.text)
print('POST TEST COMPLETED SUCCESSFULLY! Continue?')
input()

# GET ALL
url = 'http://localhost:8000/film'
res = requests.get(url=url)
print(res.text)
print('GET ALL TEST COMPLETED SUCCESSFULLY! Continue?')
input()

# GET ONE
url = 'http://localhost:8000/film/{}/'.format(film_id)
res = requests.get(url=url)
print(res.text)
print('GET ONE TEST COMPLETED SUCCESSFULLY! Continue?')
input()

# PUT
url = 'http://localhost:8000/film/{}/'.format(film_id)
test_data = {
    'budget': 100000,
    'name': 'Changed name',
    'language': 'language',
    'overview': 'Changed overview',
    'country': 'country',
    'date': '02/02/1980',
    'revenue': 100000,
    'runtime': 100,
    'tagline': 'Changed tagline',
    'image': 'Changed image',
    'actors': actors[0:2],
    'genres': [genres[0]],
    'companies': [companies[1]],
}
res = requests.put(url=url, data=json.dumps(test_data))
print(res.text)
print('PUT TEST COMPLETED SUCCESSFULLY! Continue?')
input()

# DELETE
url = 'http://localhost:8000/film/{}/'.format(film_id)
res = requests.delete(url=url)
print(res.text)
print('DELETE TEST COMPLETED SUCCESSFULLY! Continue?')
input()
