---
title: /content/listings
position: 1
type: post
description: Submit marketplace listing to Arbitrum server
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
: Client internal listing ID

photos
: Collection of photos, each having client internal photo ID and downloadable URL

description
: Listing description

location
: Location

price
: Price

user_id
: Client internal user ID

created_time
: Listing creation time in milliseconds

<!-- This call will return a maximum of 100 books
{: .info } -->

Example of a valid request:
<!-- Lists all the photos you have access to. You can paginate by using the parameters listed above. -->

~~~ http
POST /v3/content/listings HTTP/1.1
Host: gateway.arbitrum.com
Content-Type: application/json
X-Auth-Token: ARBITRUM_AUTH_TOKEN

{
  "original_id": "client.content.id",
  "photos": [
    {"id": "content.photo.id1", "url": "http://client.photo.id1.url"},
    {"id": "content.photo.id2", "url": "http://client.photo.id2.url"}
  ],
  "description": "Marketplace content description",
  "location": "United Kingdom",
  "price": "£99.99",
  "user_id": "client.user.id",
  "created_time": 1484572111142
}
~~~
{: title="HTTPS" }

After submission, listing is processed by Arbitrum:

1. all incoming listings are added into processing queue;
2. listing photos are downloaded and uploaded to Arbitrum storage;
3. automatic moderation step (algorithms);
4. manual moderation step (humans);
5. processing moderation result (collecting client statistics, creating historical record);
6. sending response to client via [callback](/#/callback/moderation_result).


It is client's responsibility to setup and configure their HTTP server that accepts and
handles the callback.
{: .info }
