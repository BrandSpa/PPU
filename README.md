# PPU
web app for ppu news about all legal issues and experience.

## Deployment
- Digital Ocean VPS
- Ruby
- Passenger
- Mysql

## Backend

- Ruby on rails 4.1.2: used for api
- Amazon s3: used for upload media


## Frontend
- Coffeescript
- Backbone
- Underscore
- Handlebars
- Gulp

## API

## resource /api/posts
POST

Request

    {
      "lang": "es",
      "country": "Colombia",
      "date": "2015-1-1",
      "author": "Alejandro Sanabria",
      "title": "New Post",
      "content": "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",
      "content_plain": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "img_name": "",
      "gallery_id": 1,
      "published": 1,
      "social_published": "",
      "featured": "",
      "unfeatured": "",
      "the_actual": "",
      "lawyer_ids": [],
      "category_ids": []
    }

Response

## resource /api/categories

## resource /api/lawyers

## resource /api/experiences

[![Deployment status from dploy.io](https://brandspa.dploy.io/badge/88313865893883/18780.png)](http://dploy.io)
