---
title: /content/photo
position: 2
type: post
description: Submit photo to Arbitrum server
right_code: |
  ~~~ http
  HTTP/1.1 200 OK
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
original_id
: Client internal photo ID

url
: Client photo URL

<!-- This call will return a maximum of 100 books
{: .info } -->

Example of a valid request:
<!-- Lists all the photos you have access to. You can paginate by using the parameters listed above. -->

~~~ http
POST /v1/content/photo HTTP/1.1
Host: gateway.arbitrum.com
Content-Type: application/json
X-Auth-Token: ARBITRUM_AUTH_TOKEN

{
  "original_id": "client.photo.id",
  "url": "http://client.photo.id1.url"
}
~~~
{: title="HTTP" }

After submission, photo is processed by Arbitrum:

1. all incoming photos are added into processing queue
2. photo is downloaded and uploaded to Arbitrum storage
3. automatic-moderation step (algorithms)
4. manual-moderation step (humans)
5. processing moderation result (collecting client statistics, creating historical record)
6. sending response to client via callback

It is client's duty to setup and configure HTTP server that accepts and handles
the callback.
{: .info }
