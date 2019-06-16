---
title: /countries/:country/
position: 2
type: get
description: Get Country Details
parameters:
  - name:
    content:
content_markdown: |-
  Returns details about a specific Country
left_code_blocks:
  - code_block: |-
      echo -n '<API_KEY>:X' | openssl base64

      curl -H "Authorization: Bearer <token>" https://getcountrycodes.com/api/countries/:country/
    title: cURL
    language: bash
  - code_block: |-
      const axios = require('axios')

      var token = Buffer.from("<API_KEY>" + ":X").toString('base64')
      axios.defaults.headers.common['Authorization'] ="Bearer " + token;

      axios.get('https://getcountrycodes.com/api/countries/:country/')
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

      $.get("https://getcountrycodes.com/api/countries/:country/",
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
      r = requests.get('https://getcountrycodes.com/api/countries/:country/', headers=headers)

      r.json()
    title: Python
    language: python
  - code_block: |-
      $token = base64_encode('<API_KEY>:X')
      $client = new GuzzleHttp\Client(['headers' => ['Authorization' => "Bearer $token"]]);

      $response = $client->get('https://getcountrycodes.com/api/countries/:country/');

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
          req, err := http.NewRequest("GET", "https://getcountrycodes.com/api/countries/:country/", nil)
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
        region": "Southern Europe"
      }
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
