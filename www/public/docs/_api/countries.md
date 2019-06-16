---
title: /countries/
position: 1
type: get
description: Get All Countries
parameters:
  - name:
    content:
content_markdown: |-
  This call will return all available Countries
  {: .info }

  Lists details about all available Countries.
left_code_blocks:
  - code_block: |-
      echo -n '<API_KEY>:X' | openssl base64

      curl -H "Authorization: Bearer <token>" https://getcountrycodes.com/api/countries/
    title: cURL
    language: bash
  - code_block: |-
      const axios = require('axios')

      var token = Buffer.from("<API_KEY>" + ":X").toString('base64')
      axios.defaults.headers.common['Authorization'] ="Bearer " + token;

      axios.get('https://getcountrycodes.com/api/countries/')
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
    title: Node.js
    language: javascript
  - code_block: |-
      var token = btoa('<API_KEY>:X');

      $.ajaxSetup({
        headers:{
          'Authorization': "Bearer " + token
        }
      });

      $.get("https://getcountrycodes.com/api/countries/",
      function(data) {
        alert(data);
      });
    title: jQuery
    language: javascript
  - code_block: |-
      import requests
      import base64

      token = base64.b64encode(b'<API_KEY>:X')

      headers = {'Authorization': 'Bearer ' + token}
      r = requests.get('https://getcountrycodes.com/api/countries/', headers=headers)

      r.json()
    title: Python
    language: python
  - code_block: |-
      $token = base64_encode('<API_KEY>:X')
      $client = new GuzzleHttp\Client(['headers' => ['Authorization' => "Bearer $token"]]);

      $response = $client->get('https://getcountrycodes.com/api/countries/');

      $body = $response->getBody();
      echo $body;
    title: PHP
    language: php
  - code_block: |-
      import (
          "net/http"
          "log"
          "io/ioutil"
          "encoding/base64"
      )

      func main() {
          var token = base64.NewEncoding("<API_KEY>:X")

          client := &http.Client{}
          req, err := http.NewRequest("GET", "https://getcountrycodes.com/api/countries/", nil)
          req.Header.Add("Authorization", "Bearer" + token)

          resp, err := client.Do(req)
          if err != nil {
              log.Fatalln(err)
          }

          body, err := ioutil.ReadAll(resp.Body)
          if err != nil {
              log.Fatalln(err)
          }
          log.Println(string(body))
      }
    title: Go
    language: go
right_code_blocks:
  - code_block: |2-
      [
        {
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
        },
        {
          "country": "Côte d’Ivoire",
          "country_official": "Republic of Côte d'Ivoire",
          "calling_code": "+225",
          "capital": "Yamoussoukro",
          "continent": "Africa",
          "continent_iso2": "AF",
          "country_iso2": "CI",
          "country_iso3": "CIV",
          "country_iso3_num": "384",
          "currency_iso3": "XOF",
          "currency_name": "West African CFA franc",
          "currency_unit": "Franc",
          "currency_symbol": "CFA",
          "currency_subunit": "centime",
          "region": "Western Africa"
        }
      ]
    title: Response
    language: json
  - code_block: |2-
      {
        "error": true,
        "error_code": 1,
        "message": "Country not found"
      }
    title: Error
    language: json
---
