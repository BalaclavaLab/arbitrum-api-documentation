---
title: Response Codes
position: 3
---

Response to each API call will have one of the following status codes:

| Code | Name         | Description                      |
|------|--------------|----------------------------------|
| 200  | OK           | Success                          |
| 201  | Created      | Creation Successful              |
| 400  | Bad Request  | We could not process that action |
| 403  | Forbidden    | We couldn't authenticate you     |
| 404  | Not Found    | Requested resource is missing    |
| 500  | Server Error | Unexpected server error occurred |

All errors will return JSON in the following format:

~~~ json
{
  "error": "error message here"
}
~~~
