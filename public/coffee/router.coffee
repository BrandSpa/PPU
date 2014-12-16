$ ->
  class ppu.Workspace extends Backbone.Router
    routes:
      "abogados" : "lawyers"
      ":lang/abogados" : "lawyers"
      "abogados/:id" : "lawyer"
      "editar-abogado/:name": 'finishLawyer'
      ":lang/editar-abogado/:id": 'finishLawyer'
      ":lang/crear-abogado": 'adminLawyer'
      "dashboard": 'dashboard'
    
    lawyers: (lang) ->
      ppu.lawyers =  new ppu.Lawyers
      ppu.lawyers.fetch reset: true
      ppu.lawyersFilters = new ppu.LawyersFilters
      ppu.lawyersView =  new ppu.LawyersView collection: ppu.lawyers

    lawyer: (name) ->

      
  new ppu.Workspace
  Backbone.history.start pushState: true 
