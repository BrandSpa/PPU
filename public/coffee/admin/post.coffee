$ ->
  class ppu.admin.Post extends Backbone.Model
    urlRoot: '/api/posts'

  class ppu.admin.Posts extends Backbone.Collection
    url: '/api/posts'
    model: ppu.admin.Post

  class ppu.admin.Post extends Backbone.View
    template: $ "#"

    render: ->

  class ppu.admin.Posts extends Backbone.View
    el: $ "#"

    render: ->

  class ppu.admin.PostCreate extends Backbone.View
    el: $ "#"

  class ppu.admin.PostEdit extends Backbone.View
    el: $ "#"