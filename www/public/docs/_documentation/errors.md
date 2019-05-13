---
title: Errors
position: 3
parameters:
  - name:
    content:
content_markdown: |-
  HTTP Errors

  | Code | Name | Description |
  | --- | --- | --- |
  | 200 | OK | Success |
  | 400 | Bad Request | The server could not process that action |
  | 403 | Forbidden | The server could not authenticate you |
  | 405 | Method Not Allowed | The method received is not supported |

  Application Errors

  | Code| Description |
  | --- | --- | --- |
  | 1 | Country not found  |
  | 2 | Country detail not found |
  | 3 | Authorization `<token>` not provided |
  | 4 | Authorization `<token>` invalid |

  All errors will return JSON in the following format:
left_code_blocks:
  - code_block: |-
      {
        "error": true,
        "error_code": 1,
        "message": "Error message here"
      }
    title: Response
    language: json
right_code_blocks:
  - code_block:
    title:
    language:
---
