---
layout: page
title: Listing API
permalink: /listing-api/
---

# Overview

Arbitrum Listing API is very simple and is based on HTTP webhooks:

* An Arbitrum webhook that is used to submit listing for moderation
* a client webhook that is used to receive moderation result when listing was moderated in Arbitrum

Authorization is done by appending authorization token in HTTP header for each request.

## Webhooks

### Submitting listing for moderation in Arbitrum

In order to submit listing for moderation:

* make request ```POST https://gateway.arbitrum.com/v1/content/listing```
* add `X-Auth-Token` header
* pass listing JSON object in the request body

Example listing JSON:
{% highlight json %}
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
{% endhighlight %}

| Field  | Description |
| ------------- | ------------- |
| `original_id` | Client internal listing id |
| `photos` | Collection of photos, each having client internal photo id and downloadable url |
| `description` | Listing description |
| `location` | Location |
| `price` | Price  |
| `user_id` | Client internal user id |
| `created_time` | Listing creation time in milliseconds |

On successful requests Arbitrum server responds with HTTP 200 response code.
Possible response codes:

| Code  | Description |
| ------------- | ------------- |
| `200` | Success |
| `400` | Invalid `X-Auth-Token` |
| `404` | Requested url not found |
| `500` | Arbitrum internal server error |

After submission, listing is processed by Arbitrum:

1. all incoming listings are added into processing queue
2. listing photos are downloaded and uploaded to Arbitrum storage
3. automatic-moderation step (algorithms)
4. manual-moderation step (humans)
5. processing moderation result (collecting client statistics, creating historical record)
6. sending response to client

### Receiving moderation result from Arbitrum

After moderation is complete:

* Arbitrum makes request ```POST https://client.url/webhook```
* adds `X-Auth-Token` header
* passes moderation result JSON object in the request body

{% highlight json %}
{
  "original_id": "client.content.id",
  "moderation_result": "rejected"
}
{% endhighlight %}

| Field  | Description |
| ------------- | ------------- |
| `original_id` | Client internal listing id |
| `moderation_result` | `rejected` or `approved` |

It is client duty to setup and configure HTTP server that accepts and handles feedback.