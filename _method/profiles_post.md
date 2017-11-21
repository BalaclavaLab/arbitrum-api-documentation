---
title: /content/profiles
position: 1
type: post
description: Submit profile to Arbitrum server
right_code: |
  ~~~ http
  HTTP/1.1 200 OK
  ~~~
  {: title="Response" }

  ~~~ http
  HTTP/1.1 403 Forbidden
  Content-Type: application/json

  {
    "error": "Authentication token is invalid"
  }
  ~~~
  {: title="Error" }
---

original_id
: Client internal user profile ID

user_id
: Profile id

facebook_id
: Profile Facebook ID

location
: Geohash of profile location

email
: Profile email

first_name
: Profile first name

last_name
: Profile last name

gender
: Profile gender, "male" or "female"

birthday
: Profile birthday in YYYY-MM-DD format

bio
: Profile bio

photos
: Collection of photos, each having profile internal photo ID and downloadable URL

avatar_photo_id
: Profile avatar photo id (photo in photos collection)

created_time
: Profile created time in milliseconds

<!-- This call will return a maximum of 100 books
{: .info } -->

Example of a valid request:
<!-- Lists all the photos you have access to. You can paginate by using the parameters listed above. -->

~~~ http
POST /v1/content/profiles HTTP/1.1
Host: gateway.arbitrum.com
Content-Type: application/json
X-Auth-Token: ARBITRUM_AUTH_TOKEN

{
  "original_id": "client.contentId",
  "user_id": "profile.userId",
  "facebook_id": "profile.facebookId",
  "location": "profile.location",
  "email": "profile.email",
  "user_id": "profile.userId",
  "first_name": "profile.firstName",
  "last_name": "profile.lastName",
  "gender": "profile.gender",
  "birthday": "profile.birthday",
  "bio": "profile.bio",
  "photos": [
    {"id": "profile.photoId1", "url": "http://profile.photo.id1.url"},
    {"id": "profile.photoId2", "url": "http://profile.photo.id2.url"}
  ],
  "avatar_photo_id": "profile.photoId1",
  "created_time": 1484572111142
}
~~~
{: title="HTTPS" }

After submission, profile is processed by Arbitrum:

1. all incoming profile are added into processing queue;
2. profile photos are downloaded and uploaded to Arbitrum storage;
3. automatic moderation step (algorithms);
4. manual moderation step (humans);
5. processing moderation result (collecting client statistics, creating historical record);
6. sending response to client via [callback](/#/callback/moderation_result).


It is client's responsibility to setup and configure their HTTP server that accepts and
handles the callback.
{: .info }
