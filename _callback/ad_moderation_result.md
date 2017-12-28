---
title: Ad Moderation Result
position: 2
description: Arbitrum server sends ad moderation result to callback URL provided by the client
---
id
: Arbitrum internal moderated content ID

original_id
: Client internal advertisement ID

result
: Either **abusive**, **non_abusive**, **non_abusive_needs_changes**

iab_category
: `IAB` category proposed by Arbitrum, optional field

has_https
: Indicator of whether or not original `click_url` protocol was an `HTTPS`, optional boolean field

Example 1 of a valid callback request:

~~~ http
POST /webhook HTTP/1.1
Host: www.client.url
Content-Type: application/json
X-Auth-Token: CLIENT_AUTH_TOKEN

{
  "id": "arbitrum.content.id",
  "original_id": "client.ad.id",
  "result": "abusive",
  "has_https": "true"
}
~~~

Example 2 of a valid callback request:

~~~ http
POST /webhook HTTP/1.1
Host: www.client.url
Content-Type: application/json
X-Auth-Token: CLIENT_AUTH_TOKEN

{
  "id": "arbitrum.content.id",
  "original_id": "client.ad.id",
  "result": "non_abusive_needs_changes",
  "iab_category": "ad.newIabCategory",
  "has_https": "true"
}
~~~
{: title="HTTPS" }

The server expects `HTTP 2xx` response without any body. Any other response code
will be treated as an error.
{: .warning }
