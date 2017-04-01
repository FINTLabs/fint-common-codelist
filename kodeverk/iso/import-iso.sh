#!/bin/sh
echo Importing ISO codelists...
mongoimport --host localhost --db iso --collection iso3166 --file iso_3166_1_alfa_2.json --jsonArray
mongoimport --host localhost --db iso --collection iso639 --file iso_639_1_alfa_2.json --jsonArray
mongoimport --host localhost --db iso --collection iso5218 --file iso_5218.json --jsonArray