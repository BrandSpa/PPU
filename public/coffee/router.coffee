$ ->
  class ppu.Workspace extends Backbone.Router
    routes:
      "abogados" : "lawyers"
      ":lang/abogados" : "lawyers"
      "abogados/:slug" : "lawyer"
      "editar-abogado/:name": 'finishLawyer'
      ":lang/editar-abogado/:id": 'finishLawyer'
      ":lang/crear-abogado": 'adminLawyer'
      "dashboard": 'dashboard'

    initialize: ->
      new ppu.AppView
      
    lawyers: (lang) ->
      ppu.lawyers =  new ppu.Lawyers
      ppu.lawyers.fetch reset: true
      ppu.lawyersFilters = new ppu.LawyersFilters
      ppu.lawyersFilters.render()
      ppu.lawyersView =  new ppu.LawyersView collection: ppu.lawyers

    lawyer: (slug) ->
      ppu.lawyers =  new ppu.Lawyers
      ppu.lawyers.fetch reset: true, data: lang: app.lang, slug: slug
      ppu.LawyerDetailView = new ppu.LawyerDetailView collection: ppu.lawyers

      
  new ppu.Workspace
  Backbone.history.start pushState: true 
