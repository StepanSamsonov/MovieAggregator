import requests
import json


# START
print('ACTOR TESTS. Start?')
input()

# POST
res = requests.get('http://localhost:8000/genre')

genres = list(map(lambda x: x['id'], json.loads(res.text)['data']))

test_data = {'name': 'Test name', 'image': 'Image link', 'genres': [genres[0]]}
url = 'http://localhost:8000/actor'
res = requests.post(url=url, data=json.dumps(test_data))
actor_id = str(json.loads(res.text)['id'])
print(res.text)
print('POST TEST COMPLETED SUCCESSFULLY! Continue?')
input()

# GET ALL
url = 'http://localhost:8000/actor'
res = requests.get(url=url)
print(res.text)
print('GET ALL TEST COMPLETED SUCCESSFULLY! Continue?')
input()

# GET ONE
url = 'http://localhost:8000/actor/{}/'.format(actor_id)
res = requests.get(url=url)
print(res.text)
print('GET ONE TEST COMPLETED SUCCESSFULLY! Continue?')
input()

# PUT
url = 'http://localhost:8000/actor/{}/'.format(actor_id)
test_data = {'name': 'Changed name', 'image': 'Changed image link', 'genres': genres[0:2]}
res = requests.put(url=url, data=json.dumps(test_data))
print(res.text)
print('PUT TEST COMPLETED SUCCESSFULLY! Continue?')
input()

# DELETE
url = 'http://localhost:8000/actor/{}/'.format(actor_id)
res = requests.delete(url=url)
print(res.text)
print('DELETE TEST COMPLETED SUCCESSFULLY! Continue?')
input()
