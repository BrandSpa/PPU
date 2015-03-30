class ppu.Post extends Backbone.Model
  urlRoot: '/api/posts'

class ppu.Posts extends Backbone.Collection
  url: '/api/posts'
  model: ppu.Post