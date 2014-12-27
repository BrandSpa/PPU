$ ->
  class ppu.Workspace extends Backbone.Router
    routes:
      "abogados" : "lawyers"
      "abogados/:slug" : "lawyer"
      "posts" : "posts"
      "post/:slug" : "post"

    initialize: ->
      new ppu.AppView
      
    lawyers: (lang) ->
      ppu.lawyers =  new ppu.Lawyers
      ppu.lawyers.fetch reset: true
      ppu.lawyersFilters = new ppu.LawyersFilters
      ppu.lawyersFilters.render()
      ppu.lawyersView =  new ppu.LawyersView collection: ppu.lawyers

    lawyer: (slug) ->
      ppu.lawyers =  new ppu.Lawyers
      ppu.lawyers.fetch reset: true, data: lang: app.lang, slug: slug
      ppu.LawyerDetailView = new ppu.LawyerDetailView collection: ppu.lawyers

    posts: ->
      ppu.postsFeatured = new ppu.Posts
      ppu.postsFeatured.fetch reset: true, data: featured: true
      ppu.postsFilters = new ppu.PostsFilters
      ppu.postsFilters.render()
      ppu.posts = new ppu.Posts
      ppu.posts.fetch reset: true

      ppu.postsFeaturedView = new ppu.PostsFeaturedView collection: ppu.postsFeatured
      ppu.postsView = new ppu.PostsView collection: ppu.posts

    post: (slug)->
      
  new ppu.Workspace
  Backbone.history.start pushState: true 
