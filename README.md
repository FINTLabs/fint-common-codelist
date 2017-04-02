# FINT common codelist service

This service expose the following ISO code list using the FINT information model:
* [ISO/IEC 5218](https://dokumentasjon.felleskomponent.no/docs/iso_kjonn)
* [ISO 3166-1 alpha-2](https://dokumentasjon.felleskomponent.no/docs/iso_landkode)
* [ISO 639-1 alpha-2](https://dokumentasjon.felleskomponent.no/docs/iso_sprak)

# Installation
Use the `docker-application-stack.yml` file to setup the service on docker. After the services is up running one need to populate
the database. In the mongo container run the following commands:
```shell
$ cd server/kodeverk/iso
$ ./import-iso.sh
``` 
This will import the Norwegian translation of the codes.

# Endpoints
| Endpoint                                  | Eksample                                                                   | Description                      |
|-------------------------------------------|----------------------------------------------------------------------------|----------------------------------|
| /felles/kodeverk/31661alpha2              | https://api.felleskomponent.no/felles/kodeverk/iso/31661alpha2             | Gets all ISO 3166-1 alpha2 codes |
| /felles/kodeverk/31661alpha2/systemid/:id | https://api.felleskomponent.no/felles/kodeverk/iso/31661alpha2/systemid/NO | Gets one ISO 3166-1 alpha2 code  |
| /felles/kodeverk/6391alpha2               | https://api.felleskomponent.no/felles/kodeverk/iso/6391alpha2              | Gets all ISO 639-1 alpha2 codes  |
| /felles/kodeverk/6391alpha2/systemid/:id  | https://api.felleskomponent.no/felles/kodeverk/iso/6391alpha2/systemid/no  | Gets one ISO 639-1 alpha2 code   |
| /felles/kodeverk/5218                     | https://api.felleskomponent.no/felles/kodeverk/iso/5218                    | Gets one ISO 5218 codes          |
| /felles/kodeverk/5218/systemid/:id        | https://api.felleskomponent.no/felles/kodeverk/iso/5218/systemid/0         | Gets one ISO 5218 code           |