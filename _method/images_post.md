---
title: /content/images
position: 1
type: post
description: Submit image to Arbitrum server
right_code: |
  ~~~ http
  HTTP/1.1 200 OK
  ~~~
  {: title="Response" }
  
  ~~~ http
  POST /webhook HTTP/1.1
  Host: www.client.url
  Content-Type: application/json
  X-Auth-Token: CLIENT_AUTH_TOKEN
  
  {
    "id": "arbitrum.content.id",
    "original_id": "client.image.id",
    "result": "Rejected"
  }
  ~~~
  {: title="Callback" }

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
original_id
: Client internal image ID

url
: Client image URL

<!-- This call will return a maximum of 100 books
{: .info } -->

Example of a valid request:
<!-- Lists all the images you have access to. You can paginate by using the parameters listed above. -->

~~~ http
POST /v3/content/images HTTP/1.1
Host: gateway.arbitrum.com
Content-Type: application/json
X-Auth-Token: ARBITRUM_AUTH_TOKEN

{
  "original_id": "client.image.id",
  "url": "http://client.image.id1.url"
}
~~~
{: title="HTTPS" }

After submission, image is processed by Arbitrum:

1. all incoming images are added into processing queue;
2. image is downloaded and uploaded to Arbitrum storage;
3. automatic moderation step (algorithms);
4. manual moderation step (humans);
5. processing moderation result (collecting client statistics, creating historical record);
6. sending response to client via [callback](/#/callback/image_moderation_result).

It is client's responsibility to setup and configure their HTTP server that accepts and
handles the callback.
{: .info }
