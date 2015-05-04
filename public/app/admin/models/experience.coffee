class ppu.Experience extends Backbone.Model
  urlRoot: '/api/experiences'

class ppu.Experiences extends Backbone.Collection
  url: '/api/experiences'
  model: ppu.Experience