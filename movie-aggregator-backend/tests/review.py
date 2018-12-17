import requests
import json


# START
print('REVIEW TESTS. Start?')
input()

# POST
films = requests.get('http://localhost:8000/film')
films = list(map(lambda x: x['id'], json.loads(films.text)['data']))
test_data = {'text': 'Some text',
             'is_positive': True,
             'film': films[0]
             }
url = 'http://localhost:8000/review'
res = requests.post(url=url, data=json.dumps(test_data))
review_id = str(json.loads(res.text)['id'])
print(res.text)
print('POST TEST COMPLETED SUCCESSFULLY! Continue?')
input()

# GET ALL
url = 'http://localhost:8000/review'
res = requests.get(url=url)
print(res.text)
print('GET ALL TEST COMPLETED SUCCESSFULLY! Continue?')
input()

# GET ONE
url = 'http://localhost:8000/review/{}/'.format(review_id)
res = requests.get(url=url)
print(res.text)
print('GET ONE TEST COMPLETED SUCCESSFULLY! Continue?')
input()

# PUT
url = 'http://localhost:8000/review/{}/'.format(review_id)
test_data = {'text': 'Changed text',
             'is_positive': False,
             'film': films[0]
             }
res = requests.put(url=url, data=json.dumps(test_data))
print(res.text)
print('PUT TEST COMPLETED SUCCESSFULLY! Continue?')
input()

# DELETE
url = 'http://localhost:8000/review/{}/'.format(review_id)
res = requests.delete(url=url)
print(res.text)
print('DELETE TEST COMPLETED SUCCESSFULLY! Continue?')
input()
