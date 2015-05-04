
ppu.TheActualCoController = {
  index: ->
    collection = new ppu.Posts
    collection.fetch reset: true, data: published: 1, featured_order: "ASC", the_actual_co: 1
    new ppu.TheCurrentViews collection: collection
    filters = new ppu.TheCurrentFilter
    filters.render()
    
  show: (slug) ->
    ppu.post = new ppu.Post id: slug
    ppu.posts = new ppu.Posts
    ppu.post.fetch()
    ppu.postDetailView = new ppu.TheActualDetailView model: ppu.post
    ppu.postsRelated = new ppu.PostsRelated collection: ppu.posts
}
