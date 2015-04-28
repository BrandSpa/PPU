var request = require('supertest');
request = request("http://localhost:3000");

describe("Resource post", function() {

  describe("POST", function() {

    it('should create new post', function(done) {

        var data = {
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
        };

        request
          .post('/api/posts')
          .set('Accept', 'application/json')
          .send(data)
          .expect(201)
          .expect('Content-Type', /application\/json/)
          .end(function(err, res){
            done(err);

          });


      });

  });

});
