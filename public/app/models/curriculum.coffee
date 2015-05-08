class ppu.Curriculum extends Backbone.Model
  urlRoot: "/api/curriculums"

class ppu.Curriculums extends Backbone.Collection
  url: "/api/curriculums"
  model: ppu.Curriculum
