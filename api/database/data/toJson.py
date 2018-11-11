import csv
import json

# Open the CSV and create csv reader
f = open('api/data/worldcities100.csv', 'rU')
reader = csv.DictReader(f)

# Convert to a list for easier processing
city_list = [list(row.items()) for row in reader]

# Convert to fixture form for seeding database
ready_for_json = []
for i, v in enumerate(city_list):
    ready_for_json.append({
        'model': 'api.place',
        'pk': i + 1,
        'fields': dict(v)
    })
out = json.dumps(ready_for_json)

# Save json
f = open('api/fixtures/worldcities100.json', 'w')
f.write(out)
