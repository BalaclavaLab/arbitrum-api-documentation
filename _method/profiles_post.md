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
  {: title="Callback1" }
  
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
  {: title="Callback2" }
  
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
  {: title="Callback3" }

  ~~~ http
  HTTP/1.1 400 Bad Request
  Content-Type: application/json
  
  {
    "error": "Insufficient parameters"
  }
  ~~~
  {: title="Error 400" }
 
  ~~~ http
  HTTP/1.1 403 Forbidden
  Content-Type: application/json

  {
    "error": "Authentication token is invalid"
  }
  ~~~
  {: title="Error 403" }
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

registration_ip
: Profile registration ip

usage_ip
: Profile usage ip

created_time
: Profile created time in milliseconds

<!-- This call will return a maximum of 100 books
{: .info } -->

Example of a valid request:
<!-- Lists all the photos you have access to. You can paginate by using the parameters listed above. -->

~~~ http
POST /v3/content/profiles HTTP/1.1
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
  "registration_ip": "profile.registrationIp",
  "usage_ip": "profile.usageIp",
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
6. sending response to client via [callback](/#/callback/profile_moderation_result).


It is client's responsibility to setup and configure their HTTP server that accepts and
handles the callback.
{: .info }
