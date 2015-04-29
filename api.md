## PPU API

## resource posts
[POST] /api/posts

Request

    {
      "lang": "es",
      "country": "Colombia",
      "date": "2015-1-1",
      "author": "Alejandro Sanabria",
      "title": "New Post",
      "content": "<p>Post content</p>",
      "img_name": "",
      "gallery_id": 1,
      "published": "",
      "social_published": "",
      "featured": "",
      "the_actual": "",
      "lawyer_ids": [1,2],
      "category_ids": [1,2]
    }

Response

    {
      id: 1,
      translation_id: null,
      "lang": "es",
      "country": "Colombia",
      "date": "2015-01-01",
      "author": "Alejandro Sanabria",
      "title": "New Post title",
      "content": "<p>Post content</p>",
      "img_name": {
        url: "https://amazons3.com/bucket/image_id"
      }
      "keywords": "Alejandro Sanabria New Post title <p>Post content</p>",
      "excerpt": "Post content"
      "gallery_id": 1,
      "published": 0,
      "social_published": "",
      "featured": "",
      "the_actual": "",
      "created_at": "2015-01-01 00:00:00",
      "updated_at": "2015-01-01 00:00:00",
    }


[GET] /api/posts

Response

    [
      {
        id: 1,
        translation_id: null,
        "lang": "es",
        "country": "Colombia",
        "date": "2015-01-01",
        "author": "Alejandro Sanabria",
        "title": "New Post title",
        "content": "<p>Post content</p>",
        "img_name": {
          url: "https://amazons3.com/bucket/image_id"
        }
        "keywords": "Alejandro Sanabria New Post title <p>Post content</p>",
        "excerpt": "Post content"
        "gallery_id": 1,
        "published": 0,
        "social_published": "",
        "featured": "",
        "the_actual": "",
        "created_at": "2015-01-01 00:00:00",
        "updated_at": "2015-01-01 00:00:00",
      }
    ]

[GET] /api/posts

Request

      published=true&category=Labor


Response

## resource /api/categories

## resource /api/lawyers

## resource /api/experiences
