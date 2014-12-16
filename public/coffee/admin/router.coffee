$ ->
  class ppu.admin.Router extends Backbone.Router
    routes: 
      'dashboard': 'dashboard'
      'crear-abogado': 'createLawyer'
      ':lang/crear-abogado': 'createLawyer'
      'editar-abogado/:id': 'editLawyer'
      'editar-abogado/:id': 'editLawyer'
      'crear-noticia': 'createPost'
      ':lang/crear-noticia': 'createPost'
    url: Backbone.history.location.href

    dashboard: ->
      ppu.lawyers = new ppu.Lawyers
      ppu.lawyers.fetch reset: true
      ppu.admin.lawyers= new ppu.admin.LawyersView collection: ppu.lawyers

    createLawyer: (lang) ->
      if lang == "en"
        window.lang = 'en'
        $.ajaxSetup
          data: lang: "en"
      else
        window.lang = 'es'
        $.ajaxSetup
          data: lang: "es"

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

      ppu.lawyerCreate = new ppu.LawyerCreateView

    editLawyer: (id) ->
      $("#lawyer-create").remove()
      ppu.lawyer = new ppu.Lawyer id: id
      ppu.lawyer.fetch()
      view = new ppu.LawyerEditView model: ppu.lawyer

    createPost: (lang) ->
      model = new ppu.admin.Post
      ppu.admin.postCreate = new ppu.admin.PostCreate model: model
      ppu.admin.postCreate.render()


  ppu.admin.router = new ppu.admin.Router
  Backbone.history.start pushState: true 