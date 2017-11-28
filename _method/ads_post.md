---
title: /content/ads
position: 1
type: post
description: Submit ad to Arbitrum server
right_code: |
  ~~~ http
  HTTP/1.1 200 OK
  ~~~
  {: title="Response" }

  ~~~ http
  POST /callback HTTP/1.1
  Host: client.api.com
  Content-Type: application/json
  X-Auth-Token: ARBITRUM_AUTH_TOKEN
  
  {
    "ad_id": "ad.id",
    "result": "non_abusive"
  }
  ~~~
  {: title="Callback1" }
  
  ~~~ http
  POST /callback HTTP/1.1
  Host: client.api.com
  Content-Type: application/json
  X-Auth-Token: ARBITRUM_AUTH_TOKEN
  
  {
    "ad_id": "ad.id",
    "result": "abusive"
  }
  ~~~
  {: title="Callback2" }

  ~~~ http
  POST /callback HTTP/1.1
  Host: client.api.com
  Content-Type: application/json
  X-Auth-Token: ARBITRUM_AUTH_TOKEN
  
  {
    "ad_id": "ad.id",
    "result": "change_category",
    "categories": ["category1", "category2"]
  }
  ~~~
  {: title="Callback3" }
  
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

ad_id
: Client internal ad ID

categories
: Array of ad categories

click_url
: Expected ad click url

content
: Ad or creative url

device
: Device for which ad will be served

country
: Country from which ad will be served

<!-- This call will return a maximum of 100 books
{: .info } -->

Example of a valid request:
<!-- Lists all the photos you have access to. You can paginate by using the parameters listed above. -->

~~~ http
POST /v3/content/ads HTTP/1.1
Host: gateway.arbitrum.com
Content-Type: application/json
X-Auth-Token: ARBITRUM_AUTH_TOKEN

{
  "ad_id": "ad.id",
  "categories": ["ad.category1", "ad.category2"]
  "click_url": "ad.clickUrl",
  "content": "ad.url",
  "device": "ad.device",
  "country": "ad.country"
}
~~~
{: title="HTTPS" }

After submission, ad is processed by Arbitrum:

1. all incoming ads are added into processing queue;
2. ad creatives are downloaded and uploaded to Arbitrum storage;
3. automatic moderation step (algorithms);
4. manual moderation step (humans);
5. processing moderation result (collecting client statistics, creating historical record);
6. sending response to client via [callback](/#/callback/moderation_result).


It is client's responsibility to setup and configure their HTTP server that accepts and
handles the callback.
{: .info }
