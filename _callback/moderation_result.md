---
title: Moderation Result
position: 1
description: Arbitrum server send moderation result to callback URL provided by the client
---
original_id
: Client internal listing ID

moderation_result
: Either **rejected** or **approved**

Example of a valid callback request:

~~~ http
POST /webhook HTTP/1.1
Host: www.client.url
Content-Type: application/json
X-Auth-Token: CLIENT_AUTH_TOKEN

{
  "original_id": "client.content.id",
  "moderation_result": "rejected"
}
~~~
{: title="HTTP" }

The server expects `HTTP 2xx` response without any body. Any other response code
will be treated as an error.
{: .warning }
