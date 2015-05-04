
ppu.TheActualChController = {
  index: ->
    collection = new ppu.Posts
    collection.fetch reset: true, data: published: 1, featured_order: "ASC", the_actual_ch: 1
    new ppu.TheActualChViews collection: collection
    filters = new ppu.TheActualChFilter
    filters.render()

  show: (slug) ->
    ppu.post = new ppu.Post id: slug
    ppu.posts = new ppu.Posts
    ppu.post.fetch()
    ppu.postDetailView = new ppu.TheActualDetailView model: ppu.post
    ppu.postsRelated = new ppu.PostsRelated collection: ppu.posts
}
