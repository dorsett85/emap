import json
import os


"""
Parse countries.geojson and save each country as separate .geojson 
*** Must be called from the emap base directory ***
"""

country_names

# Read in countries.geojson
with open('api/data/countries/countries.geojson') as f:
    data = json.load(f)
    for feature in data['features']:
        geojson = f'api/data/countries/{feature["properties"]["ADMIN"]}.geojson'
        with open(geojson, 'w') as fp:
            json.dump(feature, fp)

