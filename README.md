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

   ```
   Collection ID: posts
   Collection Name: posts
   ```

   Select `Document Level` in `Settings` tab

   Select `Attributes` tab

   | Attribute name | Type    | Format       | required |
   | -------------- | ------- | ------------ | -------- |
   | title          | string  | string(200)  | true     |
   | content        | string  | string(5000) | true     |
   | userId         | string  | string(255)  | true     |
   | createdAt      | integer | integer      | true     |
   | cover          | string  | url          | false    |

   Head over to `Index` tab and add these indexes.

   | Index name | Type     | Attributes  |
   | ---------- | -------- | ----------- |
   | userId     | unique   | userId(ASC) |
   | title      | fulltext | title(ASC)  |

   Head over to `Settings` and click `View as JSON` and ensure the data is equal to below data.

   ```json
   {
     "$id": "posts",
     "$read": ["role:all"],
     "$write": [],
     "name": "posts",
     "enabled": true,
     "permission": "document",
     "attributes": [
       {
         "key": "title",
         "type": "string",
         "status": "available",
         "required": true,
         "array": false,
         "size": 200,
         "default": null
       },
       {
         "key": "content",
         "type": "string",
         "status": "available",
         "required": true,
         "array": false,
         "size": 5000,
         "default": null
       },
       {
         "key": "cover",
         "type": "string",
         "status": "available",
         "required": false,
         "array": false,
         "format": "url",
         "default": null
       },
       {
         "key": "userId",
         "type": "string",
         "status": "available",
         "required": true,
         "array": false,
         "size": 1000,
         "default": null
       },
       {
         "key": "createdAt",
         "type": "integer",
         "status": "available",
         "required": true,
         "array": false,
         "min": -9223372036854776000,
         "max": 9223372036854776000,
         "default": null
       }
     ],
     "indexes": [
       {
         "key": "userId",
         "type": "unique",
         "status": "failed",
         "attributes": ["userId"],
         "orders": ["ASC"]
       },
       {
         "key": "title",
         "type": "fulltext",
         "status": "available",
         "attributes": ["title"],
         "orders": ["ASC"]
       }
     ]
   }
   ```

3. `likes` collection

   ```
   Collection ID: likes
   Collection Name: likes
   ```

   Select `Collection Level` in `Settings` tab

   ```
   Read access: role:all
   Write access: role:all
   ```

   Select `Attributes` tab

   | Attribute name | Type   | Format      | required |
   | -------------- | ------ | ----------- | -------- |
   | userId         | string | string(255) | true     |
   | postId         | string | string(255) | true     |

   Head over to `Index` tab and add these indexes.

   | Index name | Type | Attributes               |
   | ---------- | ---- | ------------------------ |
   | filter     | key  | userId(ASC), postId(ASC) |
   | postFilter | key  | postId(ASC)              |

   Head over to `Settings` and click `View as JSON` and ensure the data is equal to below data.

   ```json
   {
     "$id": "likes",
     "$read": ["role:all"],
     "$write": ["role:all"],
     "name": "likes",
     "enabled": true,
     "permission": "collection",
     "attributes": [
       {
         "key": "userId",
         "type": "string",
         "status": "available",
         "required": true,
         "array": false,
         "size": 255,
         "default": null
       },
       {
         "key": "postId",
         "type": "string",
         "status": "available",
         "required": true,
         "array": false,
         "size": 255,
         "default": null
       }
     ],
     "indexes": [
       {
         "key": "filter",
         "type": "key",
         "status": "available",
         "attributes": ["userId", "postId"],
         "orders": ["ASC", "ASC"]
       },
       {
         "key": "postFilter",
         "type": "key",
         "status": "available",
         "attributes": ["postId"],
         "orders": ["ASC"]
       }
     ]
   }
   ```

4. `comments` collection

   ```
   Collection ID: comments
   Collection Name: comments
   ```

   Select `Collection Level` in `Settings` tab

   ```
   Read access: role:all
   Write access: role:all
   ```

   Select `Attributes` tab

   | Attribute name | Type    | Format      | required |
   | -------------- | ------- | ----------- | -------- |
   | userId         | string  | string(255) | true     |
   | postId         | string  | string(255) | true     |
   | comment        | string  | string(500) | true     |
   | createdAt      | integer | integer     | true     |

   Head over to `Index` tab and add these indexes.

   | Index name | Type | Attributes  |
   | ---------- | ---- | ----------- |
   | postFilter | key  | postId(ASC) |

   Head over to `Settings` and click `View as JSON` and ensure the data is equal to below data.

   ```json
   {
     "$id": "comments",
     "$read": ["role:all"],
     "$write": ["role:all"],
     "name": "comments",
     "enabled": true,
     "permission": "collection",
     "attributes": [
       {
         "key": "userId",
         "type": "string",
         "status": "available",
         "required": true,
         "array": false,
         "size": 255,
         "default": null
       },
       {
         "key": "postId",
         "type": "string",
         "status": "available",
         "required": true,
         "array": false,
         "size": 255,
         "default": null
       },
       {
         "key": "comment",
         "type": "string",
         "status": "available",
         "required": true,
         "array": false,
         "size": 500,
         "default": null
       },
       {
         "key": "createdAt",
         "type": "integer",
         "status": "available",
         "required": true,
         "array": false,
         "min": -9223372036854776000,
         "max": 9223372036854776000,
         "default": null
       }
     ],
     "indexes": [
       {
         "key": "postFilter",
         "type": "key",
         "status": "available",
         "attributes": ["postId"],
         "orders": ["ASC"]
       }
     ]
   }
   ```

5. `notifications` collection

   ```
   Collection ID: notifications
   Collection Name: notifications
   ```

   Select `Collection Level` in `Settings` tab

   ```
   Read access: role:all
   Write access: role:all
   ```

   Select `Attributes` tab

   | Attribute name | Type    | Format      | required |
   | -------------- | ------- | ----------- | -------- |
   | targetUserId   | string  | string(255) | true     |
   | actionUserId   | string  | string(255) | true     |
   | actionPostId   | string  | string(255) | true     |
   | postId         | string  | string(255) | true     |
   | message        | string  | string(255) | true     |
   | createdAt      | integer | integer     | true     |

   Head over to `Index` tab and add these indexes.

   | Index name | Type | Attributes        |
   | ---------- | ---- | ----------------- |
   | filter     | key  | targetUserId(ASC) |

   Head over to `Settings` and click `View as JSON` and ensure the data is equal to below data.

   ```json
   {
     "$id": "notifications",
     "$read": ["role:all"],
     "$write": ["role:all"],
     "name": "notifications",
     "enabled": true,
     "permission": "collection",
     "attributes": [
       {
         "key": "targetUserId",
         "type": "string",
         "status": "available",
         "required": true,
         "array": false,
         "size": 255,
         "default": null
       },
       {
         "key": "actionUserId",
         "type": "string",
         "status": "available",
         "required": true,
         "array": false,
         "size": 255,
         "default": null
       },
       {
         "key": "actionPostId",
         "type": "string",
         "status": "available",
         "required": true,
         "array": false,
         "size": 255,
         "default": null
       },
       {
         "key": "message",
         "type": "string",
         "status": "available",
         "required": true,
         "array": false,
         "size": 255,
         "default": null
       },
       {
         "key": "createdAt",
         "type": "integer",
         "status": "available",
         "required": true,
         "array": false,
         "min": -9223372036854776000,
         "max": 9223372036854776000,
         "default": null
       }
     ],
     "indexes": [
       {
         "key": "filter",
         "type": "key",
         "status": "available",
         "attributes": ["targetUserId"],
         "orders": ["ASC"]
       }
     ]
   }
   ```

### Setup storage

Create a new bucket

```
Bucket ID: images
Bucket Name: images
```

Select `Collection Level` in `Settings` tab

```
Read access: role:all
Write access: role:all
```

Head over to `Settings` and click `View as JSON` and ensure the data is equal to below data.

```json
{
  "$id": "images",
  "$read": ["role:all"],
  "$write": ["role:all"],
  "permission": "bucket",
  "dateCreated": DATE_CREATED,
  "dateUpdated": DATE_UPDATED,
  "name": "images",
  "enabled": true,
  "maximumFileSize": 30000000,
  "allowedFileExtensions": [],
  "encryption": true,
  "antivirus": true
}
```

### Hookup database with app

1. Select `Settings` from Home.
2. Copy the `Project ID` & the `API Endpoint`
3. Create a file named `appwrite.json` in root

```json
{
  "endpoint": "paste your API Endpoint", // http://localhost/v1
  "projectId": "paste your Project ID"
}
```

### Start app

```bash
$ npm install

## Or yarn

$ yarn install
```

```bash
$ npm run dev

## Or yarn

$ yarn dev
```
