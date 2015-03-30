
ppu.TheCurrentController = {
  index: ->
    collection = new ppu.Posts
    collection.fetch reset: true, data: published: true, with_featured: true, the_actual: true
    new ppu.TheCurrentViews collection: collection
    filters = new ppu.TheCurrentFilter
    filters.render()
}