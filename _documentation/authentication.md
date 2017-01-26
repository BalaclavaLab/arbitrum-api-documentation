---
title: Authentication
position: 2
right_code: |
  ~~~ bash
  curl -X POST -H "X-Auth-Token: YOUR_TOKEN" -d '{...}' \
    https://gateway.arbitrum.com/v1/content/listing
  ~~~
  {: title="Curl" }
---

You need to be authenticated for all API requests.
The key is provided to you by the staff and is unique to each client.

Add the API key to all requests via `X-Auth-Token` HTTP header.

Please keep the token private. Should the token be exposed to third parties,
it may cause service abuse, disruption or outage.
{: .error }
