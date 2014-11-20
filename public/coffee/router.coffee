$ ->
  class ppu.Workspace extends Backbone.Router
    routes:
      "abogados" : "lawyers"
      ":lang/abogados" : "lawyers"
      "abogados/:id" : "lawyer"

    lawyers: (lang)->

      ppu.lawyers =  new ppu.Lawyers
      if lang
        ppu.lawyers.fetch reset: true, data: lang: lang
      else
        ppu.lawyers.fetch reset: true

      ppu.lawyersFilters = new ppu.LawyersFilters
      ppu.lawyersView =  new ppu.LawyersView collection: ppu.lawyers

    lawyer: ->

  new ppu.Workspace
  Backbone.history.start pushState: true 
