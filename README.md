# GetCountryCodes

## Technologies used
- [Now▲](https://zeit.co/now)
- [Vue.js](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Bootstrap](https://getbootstrap.com/)
- [BootstrapVue](https://bootstrap-vue.js.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Jekyll](https://jekyllrb.com/)

###  Documentation
Check out the live [documentation](https://getcountrycodes.com/docs)

###  Project Setup

#### 1. Install [now](https://zeit.co/home)

```bash
npm install now@15.8.3
```
#### 2. Create a `.env` file and add the corresponding values from [.env.example](.env.example)

```bash
cp .env.example .env
nano .env
```
#### 3. Install the required dependencies

```bash
cd api/express
npm install
```
```bash
cd www/public/gcc
npm install
```

#### 4. Run the local server in development mode
```bash
now dev
```
#### Finally point your browser to `http://localhost:3000`

###  MongoDB Collections

- **User**
```json
{
	"_id": "1get2country3codes4",
	"user_id": 1,
	"hash_id": "aBcDe",
	"active": true,
	"verified": true,
	"permission_level": 1,
	"api_key": "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
	"email": "email@website.com",
	"password": "wordpass",
	"salt": "sugar",
	"verify_token": "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
	"verify_token_expiry": "1234567890123",
	"login_history": [{
		"ip": "127.0.0.1",
		"location": "World",
		"device": "Good Device",
		"os": "Compatible OS",
		"date": "1970-01-01T00:00:00.000+00:00"
	}],
	"usage": {
		"total": 0,
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
- `Production`
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
