---
title: /content/text
position: 2
type: post
description: Submit text to Arbitrum server
right_code: |
  ~~~ json
  {
    "result": "non_abusive"
  }
  ~~~
  
  ~~~ json
  {
    "result": "abusive"
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
  {: title="Error" }
---
text
: Text for moderation

~~~ http
POST /v1/text HTTP/1.1
Host: text.arbitrum.com
Content-Type: application/json
X-Auth-Token: ARBITRUM_AUTH_TOKEN

{
  "text": "This is comment body"
}
~~~
{: title="HTTPS" }
