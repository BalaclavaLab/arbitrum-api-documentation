---
title: /content/text
position: 2
type: post
description: Submit text to Arbitrum server
right_code: |
  ~~~ http
  HTTP/1.1 200 OK
  
  {
    "result": "non_abusive"
  }
  ~~~
  {: title="Response" }

  ~~~ http
  HTTP/1.1 400 Bad Request
  Content-Type: application/json
  
  {
    "error": "Insufficient parameters"
  }
  ~~~
  {: title="Error 400" }
  
  ~~~ http
  HTTP/1.1 403 Forbidden
  Content-Type: application/json

  {
    "error": "Authentication token is invalid"
  }
  ~~~
  {: title="Error 403" }
---
text
: Text for moderation

Example of a valid request:

~~~ http
POST /v3/text HTTP/1.1
Host: text.arbitrum.com
Content-Type: application/json
X-Auth-Token: ARBITRUM_AUTH_TOKEN

{
  "text": "This is comment body"
}
~~~
{: title="HTTPS" }
