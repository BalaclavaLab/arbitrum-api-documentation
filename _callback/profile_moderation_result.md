---
title: Profile Moderation Result
position: 1
description: Arbitrum server sends profile moderation result to callback URL provided by the client
---
id
: Arbitrum internal moderated content ID

original_id
: Client internal profile ID

result
: Either **Rejected**, **Approved**, **Modified**

details
: Mapping from original profile image to Arbitrum classification, a way for Arbitrum to provide specific moderation details, optional field. Only valid in combination with `moderation_result` **Modified**. 
Possible values: **to_be_removed**, **set_as_profile**

Example 1 of a valid callback request:

~~~ http
POST /webhook HTTP/1.1
Host: www.client.url
Content-Type: application/json
X-Auth-Token: CLIENT_AUTH_TOKEN

{
  "id": "arbitrum.content.id",
  "original_id": "client.profile.id",
  "result": "Rejected"
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
  "original_id": "client.profile.id",
  "moderation_result": "Modified",
  "details": {
    "images.client_image_id" : "to_be_removed" 
  }
}
~~~

Example 3 of a valid callback request:

~~~ http
POST /webhook HTTP/1.1
Host: www.client.url
Content-Type: application/json
X-Auth-Token: CLIENT_AUTH_TOKEN

{
  "id": "arbitrum.content.id",
  "original_id": "client.profile.id",
  "result": "Modified",
  "details": {
    "images.client_image_id" : "set_as_profile" 
  }
}
~~~
{: title="HTTPS" }

The server expects `HTTP 2xx` response without any body. Any other response code
will be treated as an error.
{: .warning }
