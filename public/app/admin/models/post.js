ppu.Post = (function(superClass) {
  extend(Post, superClass);

  function Post() {
    return Post.__super__.constructor.apply(this, arguments);
  }

  Post.prototype.urlRoot = "/api/posts";

  return Post;
})(Backbone.Model);

ppu.Posts = (function(superClass) {
  extend(Posts, superClass);

  function Posts() {
    return Posts.__super__.constructor.apply(this, arguments);
  }

  Posts.prototype.url = "/api/posts";

  Posts.prototype.model = ppu.Post;

  return Posts;
})(Backbone.Collection);
