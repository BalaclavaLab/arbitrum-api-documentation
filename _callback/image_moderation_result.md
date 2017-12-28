---
title: Image Moderation Result
position: 1
description: Arbitrum server sends moderation result to callback URL provided by the client
---
id
: Arbitrum internal moderated content ID

original_id
: Client internal image ID

result
: Either **abusive** or **non_abusive**

Example of a valid callback request:

~~~ http
POST /webhook HTTP/1.1
Host: www.client.url
Content-Type: application/json
X-Auth-Token: CLIENT_AUTH_TOKEN

{
  "id": "arbitrum.content.id",
  "original_id": "client.image.id",
  "result": "abusive"
}
~~~
{: title="HTTPS" }

The server expects `HTTP 2xx` response without any body. Any other response code
will be treated as an error.
{: .warning }
