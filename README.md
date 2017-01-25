---
layout: page
title: README
permalink: /readme/
---

# Submitting marketplace content to Arbitrum

Webhook: ```POST https://gateway.arbitrum.com/v1/content/marketplace```

Parameters:
* Header: `X-Auth-Token` -- provided by Arbitrum	
* Body:
```
{
  "original_id": "client.content.id",
  "photos": [
    {"id": "content.photo.id1", "url": "http://client.photo.id1.url"},
    {"id": "content.photo.id2", "url": "http://client.photo.id2.url"}
  ],
  "description": "Marketplace content description",
  "location": "United Kingdom",
  "price": "£99.99"
  "likes_count": 22,
  "user_id": "client.user.id",
  "user_avatar_url": "client.user.avatar.url",
  "created_time": 1484572111142
}
```

Response: ```HTTP 200```

# Getting moderation result from Arbitrum

Webhook: ```POST https://client.webhook.url``` -- provided by client

Parameters:
* Header `X-Auth-Token` -- provided by client
* Body:
```{
  "original_id": "client.content.id",
  "moderation_result": "rejected"
}``` moderation result can be: `rejected` or `approved`
