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
      "dashboard": 'dashboard'

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

      ppu.lawyer =  new ppu.Lawyer
      ppu.lawyerCreateForm = new ppu.LawyerCreateForm model: ppu.lawyer

      ppu.lawyerArticle = new ppu.LawyerArticle
      ppu.lawyerArticleCreate = new ppu.LawyerArticleCreate model: ppu.lawyerArticle

      ppu.lawyerAward = new ppu.LawyerAward
      ppu.lawyerAwardCreate = new ppu.LawyerAwardCreate model: ppu.lawyerAward

      ppu.lawyerEducation = new ppu.LawyerEducation
      ppu.lawyerEducationCreate = new ppu.LawyerEducationCreate model: ppu.lawyerEducation

      ppu.lawyerInstitution = new ppu.LawyerInstitution
      ppu.lawyerInstitutionCreate = new ppu.LawyerInstitutionCreate model: ppu.lawyerInstitution

      ppu.lawyerJob = new ppu.LawyerJob
      ppu.lawyerJobCreate = new ppu.LawyerJobCreate model: ppu.lawyerJob

      ppu.lawyerLanguage = new ppu.LawyerLanguage
      ppu.lawyerLanguageCreate = new ppu.LawyerLanguageCreate model: ppu.lawyerLanguage

      ppu.lawyerPharase = new ppu.LawyerPharase
      ppu.lawyerPharaseCreate = new ppu.LawyerPharaseCreate model: ppu.lawyerPharase

      ppu.lawyerRecognition = new ppu.LawyerRecognition
      ppu.lawyerRecognitionCreate = new ppu.LawyerRecognitionCreate model: ppu.lawyerRecognition

      ppu.lawyerCreate = new ppu.LawyerCreate

    finishLawyer: (id) ->
      $("#lawyer-create").fadeOut().remove()
      ppu.lawyerFinish = new ppu.Lawyer id: id 
      ppu.lawyerFinish.fetch()
      view = new ppu.LawyerFinish model: ppu.lawyerFinish

    dashboard: ->
      ppu.lawyers = new ppu.Lawyers
      ppu.lawyers.fetch reset: true
      ppu.lawyersDashboard = new ppu.LawyersDashboard collection: ppu.lawyers

  new ppu.Workspace
  Backbone.history.start pushState: true 
