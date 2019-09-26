# GetCountryCodes

## Technologies used
- [Now▲](https://zeit.co/now)
- [Vue.js](https://vuejs.org/)
- [Vuetify](https://vuetifyjs.com/en/)
- [Bootstrap](https://getbootstrap.com/)
- [BootstrapVue](https://bootstrap-vue.js.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Jekyll](https://jekyllrb.com/)

###  Documentation
Check out the live [documentation](https://getcountrycodes.com/docs)

###  MongoDB Collections

- **User**
```json
{
  "_id": "1get2country3codes4",
  "user_id": 1,
  "hash_id": "aBcDe",
  "creation_date": "X",
  "active": true,
  "api_key": "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "email": "email@website.com",
  "wordpass": "password",
  "sugar": "salt",
  "usage": {
    "/countries": 0,
    "/countries/country": 0,
    "/countries/country/country": 0,
    "/countries/country/calling_code": 0,
    "/countries/country/capital": 0,
    "/countries/country/continent": 0,
    "/countries/country/continent_iso2": 0,
    "/countries/country/country_iso2": 0,
    "/countries/country/country_iso3": 0,
    "/countries/country/currency_iso3": 0,
    "/countries/country/currency_name": 0,
    "/countries/country/currency_symbol": 0
  }
}
```

###  Sample Country Code

- **Italy**
```json
"italy": {
  "country": "Italy",
  "country_official": "Italian Republic",
  "calling_code": "+39",
  "capital": "Rome",
  "continent": "Europe",
  "continent_iso2": "EU",
  "country_iso2": "IT",
  "country_iso3": "ITA",
  "country_iso3_num": "380",
  "currency_iso3": "EUR",
  "currency_name": "Euro",
  "currency_unit": "Euro",
  "currency_symbol": "€",
  "currency_subunit": "cent",
  "region": "Southern Europe"
}
```

### Environments
- `Production
- `Staging`
- `Local`

### Available Endpoints
- `/countries`
- `/countries/country`
- `/register`
- `/login`
- `/logout`
- `/usage`

API Key required
