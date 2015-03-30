class ppu.Lawyer extends Backbone.Model
  urlRoot: "/api/lawyers"

  fetchBySlug: (slug)->
    @fetch data: $.param slug: slug, locale: app.lang

class ppu.Lawyers extends Backbone.Collection
  url: "/api/lawyers"
  model: ppu.Lawyer