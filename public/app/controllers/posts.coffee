ppu.PostsController = {
  
  index: ->
    ppu.posts = new ppu.Posts

    ppu.posts.fetch reset: true,
    data:
      featured_order: "ASC",
      published: 1,
      the_actual_ch: 0
      the_actual_co: 0

    ppu.postsView = new ppu.PostsView collection: ppu.posts

    ppu.postsFilters = new ppu.PostsFilters
    ppu.postsFilters.render()
    ppu.filtersMobile = new ppu.FiltersMobile

  show:(slug) ->
    ppu.post = new ppu.Post id: slug
    ppu.posts = new ppu.Posts
    ppu.post.fetch()
    ppu.postDetailView = new ppu.PostDetailView model: ppu.post
    ppu.postsRelated = new ppu.PostsRelated collection: ppu.posts
    $("#top-bar").html $("#post-detail-title").html()

}
