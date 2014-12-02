$ ->
  class ppu.Workspace extends Backbone.Router
    routes:
      "abogados" : "lawyers"
      ":lang/abogados" : "lawyers"
      "abogados/:id" : "lawyer"
      "crear-abogado": 'adminLawyer'
      "crear-abogado": 'adminLawyer'
      "terminar-abogado/:id": 'finishLawyer'
      ":lang/crear-abogado": 'adminLawyer'

    lawyers: (lang) ->
      ppu.lawyers =  new ppu.Lawyers
      ppu.lawyers.fetch reset: true
      ppu.lawyersFilters = new ppu.LawyersFilters
      ppu.lawyersView =  new ppu.LawyersView collection: ppu.lawyers

    lawyer: ->

    adminLawyer: (param) ->
      if param == 'en'
        $('.lawyer-lang option:eq(2)').prop('selected', true)
      else
        $('.lawyer-lang option:eq(1)').prop('selected', true)
      model =  new ppu.Lawyer
      ppu.lawyerCreate = new ppu.LawyerCreate model: model

    finishLawyer: (id) ->
      $("#lawyer-create").fadeOut().remove()
      new_model = new ppu.Lawyer id: id 
      new_model.fetch()
      view = new ppu.LawyerFinish model: new_model

  new ppu.Workspace
  Backbone.history.start pushState: true 
