---
title: /countries/:country/country_iso2/
position: 7
type: get
description: Get Country ISO2
parameters:
  - name:
    content:
content_markdown: |-
  Returns the ISO2 code of a Country
left_code_blocks:
  - code_block: |-
      echo -n '<API_KEY>:X' | openssl base64

      curl -H "Authorization: Bearer <token>" https://getcountrycodes.com/api/countries/:country/country_iso2/
    title: cURL
    language: bash
  - code_block: |-
      const axios = require('axios')

      var token = Buffer.from("<API_KEY>" + ":X").toString('base64')
      axios.defaults.headers.common['Authorization'] ="Bearer " + token;

      axios.get('https://getcountrycodes.com/api/countries/:country/country_iso2/')
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

      $.get("https://getcountrycodes.com/api/countries/:country/country_iso2/",
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
      r = requests.get('https://getcountrycodes.com/api/countries/:country/country_iso2/', headers=headers)

      r.json()
    title: Python
    language: python
  - code_block: |-
      $token = base64_encode('<API_KEY>:X')
      $client = new GuzzleHttp\Client(['headers' => ['Authorization' => "Bearer $token"]]);

      $response = $client->get('https://getcountrycodes.com/api/countries/:country/country_iso2/');

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
          req, err := http.NewRequest("GET", "https://getcountrycodes.com/api/countries/:country/country_iso2/", nil)
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
        "country_iso2": "IT"
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
