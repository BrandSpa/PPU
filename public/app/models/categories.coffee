class ppu.Category extends Backbone.Model
  urlRoot: '/api/categories'

class ppu.Categories extends Backbone.Collection
  url:  '/api/categories'
  model: ppu.Category