---
layout: page
title: Photo API
permalink: /photo-api/
---

# Submitting photo content to Arbitrum

Webhook: ```POST https://gateway.arbitrum.com/v1/content/photo```

Parameters:
* Header: `X-Auth-Token` -- provided by Arbitrum	
* Body:
```
{
  "original_id": "client.content.id",
  "url": "client.photo.url"
}
```

Response: ```HTTP 200```

# Getting moderation result from Arbitrum

Webhook: ```POST https://client.webhook.url``` -- provided by client

Parameters:
* Header `X-Auth-Token` -- provided by client
* Body:
```
{
  "original_id": "client.content.id",
  "moderation_result": "rejected"
}
```
* moderation result can be: `rejected` or `approved`
