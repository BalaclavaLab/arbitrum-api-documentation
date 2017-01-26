---
layout: page
title: Photo API
permalink: /photo-api/
---

# Overview

Arbitrum Listing API is very simple and is based on HTTP webhooks:

* An Arbitrum webhook that is used to submit photo for moderation
* a client webhook that is used to receive moderation result when photo was moderated in Arbitrum

Authorization is done by appending authorization token in HTTP header for each request.

## Webhooks

### Submitting photos for moderation in Arbitrum

In order to submit photo for moderation:

* make request ```POST https://gateway.arbitrum.com/v1/content/photo```
* add `X-Auth-Token` header
* pass JSON object in the request body

Example JSON:
{% highlight json %}
{
  "original_id": "client.photo.id",
  "url": "http://client.photo.id1.url"
}
{% endhighlight %}

| Field  | Description |
| ------------- | ------------- |
| `original_id` | Client internal photo id |
| `url` | Client photo url |

On successful requests Arbitrum server responds with HTTP 200 response code.

Possible response codes:

| Code  | Description |
| ------------- | ------------- |
| `200` | Success |
| `400` | Invalid `X-Auth-Token` |
| `404` | Requested url not found |
| `500` | Arbitrum internal server error |

After submission, photo is processed by Arbitrum:

1. all incoming photos are added into processing queue
2. photo is downloaded and uploaded to Arbitrum storage
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
| `original_id` | Client internal photo id |
| `moderation_result` | `rejected` or `approved` |

It is client duty to setup and configure HTTP server that accepts and handles feedback.