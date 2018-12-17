import requests
import json


# START
print('COMPANY TESTS. Start?')
input()

# POST
genres = requests.get('http://localhost:8000/genre')
genres = list(map(lambda x: x['id'], json.loads(genres.text)['data']))
test_data = {'name': 'Test name', 'founding_date': 1970, 'genres': [genres[0]]}
url = 'http://localhost:8000/company'
res = requests.post(url=url, data=json.dumps(test_data))
company_id = str(json.loads(res.text)['id'])
print(res.text)
print('POST TEST COMPLETED SUCCESSFULLY! Continue?')
input()

# GET ALL
url = 'http://localhost:8000/company'
res = requests.get(url=url)
print(res.text)
print('GET ALL TEST COMPLETED SUCCESSFULLY! Continue?')
input()

# GET ONE
url = 'http://localhost:8000/company/{}/'.format(company_id)
res = requests.get(url=url)
print(res.text)
print('GET ONE TEST COMPLETED SUCCESSFULLY! Continue?')
input()

# PUT
url = 'http://localhost:8000/company/{}/'.format(company_id)
test_data = {'name': 'Changed name', 'founding_date': 1980, 'genres': genres[0:2]}
res = requests.put(url=url, data=json.dumps(test_data))
print(res.text)
print('PUT TEST COMPLETED SUCCESSFULLY! Continue?')
input()

# DELETE
url = 'http://localhost:8000/company/{}/'.format(company_id)
res = requests.delete(url=url)
print(res.text)
print('DELETE TEST COMPLETED SUCCESSFULLY! Continue?')
input()
