---
title: Authentication
position: 2
right_code: |
  ~~~ http
  POST /v1/content/listing HTTP/1.1
  Host: gateway.arbitrum.com
  Content-Type: application/json
  X-Auth-Token: ARBITRUM_AUTH_TOKEN

  {...}
  ~~~
  {: title="HTTPS" }

  ~~~ bash
  curl -X POST -d '{...}'
    -H 'Content-Type: application/json'
    -H 'X-Auth-Token: ARBITRUM_AUTH_TOKEN'
    'https://gateway.arbitrum.com/v1/content/listing'
  ~~~
  {: title="Curl" }

  ~~~ ruby
  require 'net/https'

  uri = URI('https://gateway.arbitrum.com/v1/content/listing')
  Net::HTTP.post uri, '{...}',
    'Content-Type' => 'application/json',
    'X-Auth-Token' => 'ARBITRUM_AUTH_TOKEN'
  ~~~
  {: title="Ruby" }
---

You need to be authenticated for all API requests.
The key is provided to you by the staff and is unique to each client.

Add the API key to all requests via `X-Auth-Token` HTTP header.

Please keep the token private. Should the token be exposed to third parties,
it may cause service abuse, disruption or outage.
{: .error }
