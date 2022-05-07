<img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9sbnvyv22dhhuq83lnvk.png" width="100%" alt="dumb.to" />

# Dumb.to

Dumb is a blogging app similar like dev.to made with Next JS & appwrite as backend.

<img src="./public/dumb.svg" alt="dumb.to" />

## Features

- Users can create articles
- Like article
- Comment on article
- Author will get notified whenever someone like or comment on post
- Update profile

## Setup

### Setup [AppWrite](https://appwrite.io/)

Install [AppWrite](https://appwrite.io/)

#### Setup database

1. `users` collection

   ```
   Collection ID: users
   Collection Name: users
   ```

   Select `Collection Level` in `Settings` tab

   ```
   Read access: role:all
   Write access: role:all
   ```

   Select `Attributes` tab

   | Attribute name | Type   | Format      | required |
   | -------------- | ------ | ----------- | -------- |
   | email          | string | email       | true     |
   | name           | string | string(255) | true     |
   | profile        | string | url         | true     |
   | bio            | string | string(255) | false    |

   Head over to `Settings` and click `View as JSON` and ensure the data is equal to below data.

   ```json
   {
     "$id": "users",
     "$read": ["role:all"],
     "$write": ["role:all"],
     "name": "users",
     "enabled": true,
     "permission": "collection",
     "attributes": [
       {
         "key": "email",
         "type": "string",
         "status": "available",
         "required": true,
         "array": false,
         "format": "email",
         "default": null
       },
       {
         "key": "profile",
         "type": "string",
         "status": "available",
         "required": true,
         "array": false,
         "format": "url",
         "default": null
       },
       {
         "key": "name",
         "type": "string",
         "status": "available",
         "required": true,
         "array": false,
         "size": 255,
         "default": null
       },
       {
         "key": "bio",
         "type": "string",
         "status": "available",
         "required": false,
         "array": false,
         "size": 255,
         "default": null
       }
     ],
     "indexes": []
   }
   ```

2. `posts` collection
