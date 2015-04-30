
ppu.TheCurrentController = {
  index: ->
    collection = new ppu.Posts
    collection.fetch reset: true, data: published: 1, featured_order: "ASC", the_actual_ch: 1
    new ppu.TheCurrentViews collection: collection
    filters = new ppu.TheCurrentFilter
    filters.render()
}
