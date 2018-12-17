import requests
import json


# START
print('GENRE TESTS. Start?')
input()

# POST
test_data = {'name': 'Test name', 'description': 'Some description', 'image': 'Base64 data'}
url = 'http://localhost:8000/genre'
res = requests.post(url=url, data=json.dumps(test_data))
genre_id = str(json.loads(res.text)['id'])
print(res.text)
print('POST TEST COMPLETED SUCCESSFULLY! Continue?')
input()

# GET ALL
url = 'http://localhost:8000/genre'
res = requests.get(url=url)
print(res.text)
print('GET ALL TEST COMPLETED SUCCESSFULLY! Continue?')
input()

# GET ONE
url = 'http://localhost:8000/genre/{}/'.format(genre_id)
res = requests.get(url=url)
print(res.text)
print('GET ONE TEST COMPLETED SUCCESSFULLY! Continue?')
input()

# PUT
url = 'http://localhost:8000/genre/{}/'.format(genre_id)
test_data = {'name': 'Changed name', 'description': 'Changed description', 'image': 'Changed base64 data'}
res = requests.put(url=url, data=json.dumps(test_data))
print(res.text)
print('PUT TEST COMPLETED SUCCESSFULLY! Continue?')
input()

# DELETE
url = 'http://localhost:8000/genre/{}/'.format(genre_id)
res = requests.delete(url=url)
print(res.text)
print('DELETE TEST COMPLETED SUCCESSFULLY! Continue?')
input()
