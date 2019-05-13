---
title: Authentication
position: 2
parameters:
  - name:
    content:
content_markdown: |-
  You need to be authenticated for all your API requests. You can generate an API_KEY in your developer dashboard [GetCountryCodes](https://getcountrycodes.com).

  Your `<token>` can be created by combining your API_KEY and the letter "X" as such "API_KEY:X" and applying the Base64 function to the resulting string.

  Add the resulting `<token>` to all your API requests using the Authorization Header:  
  ```Authorization: Bearer <token>```

  Without the Authorization Header, your API calls won't succeed.
  {: .error}
left_code_blocks:
  - code_block:
    title:
    language:
right_code_blocks:
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
      echo -n '<API_KEY>:X' | openssl base64

      curl -H "Authorization: Bearer <token>" https://getcountrycodes.com/api/countries/
    title: cURL
    language: bash
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
---
