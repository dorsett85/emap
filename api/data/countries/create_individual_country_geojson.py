import json
import csv
import os


"""
Parse countries.geojson and save each country as separate .geojson
This will also print console output to be copied into 0004_create_country_table.sql migration
*** Must be called from the emap base directory ***
"""

# Read in all country data
with open('api/data/countries/countries.geojson') as json_f:
    geojson_data = json.load(json_f)
with open('api/data/countries/country_centroids.csv') as centroids_f:
    centroid_data = [row for row in csv.DictReader(centroids_f)]
with open('api/data/countries/country_data.csv') as miscellaneous_f:
    misc_data = [row for row in csv.DictReader(miscellaneous_f)]


# Loop over individual features (e.g., country data) and process with additional datasets
country_table_values = []
for feature in geojson_data['features']:
    for centroid_row in centroid_data:
        if feature['properties']['ISO_A3'] == centroid_row['ISO_A3']:
            for misc_row in misc_data:
                if centroid_row['Country'] == misc_row['Country'].strip():

                    # Now that we have data that matches between all three datasets,
                    # let's append value data to be inserted into our api_country table
                    sql_text = f"  ('{centroid_row['Country']}', '{centroid_row['ISO_A3']}', {centroid_row['lat']}, "
                    sql_text += f"{centroid_row['lon']}, {misc_row['Population']}, {misc_row['Area (sq. mi.)']})"
                    country_table_values.append(sql_text)

                    # Save the json file if it doesn't exist
                    geojson = f"api/data/countries/{centroid_row['Country']}.geojson"
                    if not os.path.isfile(geojson):
                        with open(geojson, 'w') as fp:
                            json.dump(feature, fp)

# Print the output of country_table_values to be used in 0004_create_country_table.sql migration
print(',\n'.join(country_table_values))
