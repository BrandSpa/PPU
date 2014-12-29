$ ->
  class ppu.admin.Router extends Backbone.Router
    routes: 
      'dashboard': 'dashboard'

      "admin/lawyers/new": "createLawyer"
      'admin/posts/new': 'createPost'

      "en/admin/lawyers/new": "createLawyer"
      'en/admin/posts/new': 'createPost'

      'admin/lawyers/:id/edit': 'editLawyer'
      'admin/posts/:id/edit': 'editPost'

      "en/admin/lawyers/:id/edit": "editLawyer"
      'en/admin/posts/:id/edit': 'editPost'

      'crear-abogado': 'createLawyer'
      ':lang/crear-abogado': 'createLawyer'
      'editar-abogado/:id': 'editLawyer'
      'en/editar-abogado/:id': 'editLawyer'


    dashboard: ->
      ppu.lawyers = new ppu.Lawyers
      ppu.lawyers.fetch reset: true
      ppu.admin.lawyers= new ppu.admin.LawyersView collection: ppu.lawyers

      ppu.posts = new ppu.Posts
      ppu.posts.fetch reset: true
      ppu.admin.posts = new ppu.admin.PostsView collection: ppu.posts

    createLawyer: (lang) ->
  
      ppu.lawyer =  new ppu.Lawyer
      ppu.lawyerCreateForm = new ppu.LawyerCreateForm model: ppu.lawyer

      ppu.lawyerAcademic = new ppu.LawyerAcademic
      ppu.lawyerAcademicCreate = new ppu.LawyerAcademicCreate model: ppu.lawyerAcademic

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
      ppu.lawyer.fetch data: lang: app.lang
      view = new ppu.LawyerEditView model: ppu.lawyer

    createPost: (lang) ->
      ppu.admin.post = new ppu.Post
      ppu.admin.postCreate = new ppu.admin.PostCreate model: ppu.admin.post
      ppu.admin.postCreate.render()

      ppu.admin.galleries = new  ppu.admin.Galleries
      ppu.admin.galleries.fetch reset: true, data: name: "post_header"

    editPost: (id) ->
      ppu.admin.post = new ppu.Post id: id
      ppu.admin.post.fetch data: lang: app.lang
      ppu.admin.postEdit = new ppu.admin.PostEdit model: ppu.admin.post

      ppu.admin.galleries = new  ppu.admin.Galleries
      ppu.admin.galleries.fetch reset: true, data: name: "post_header"
      
  ppu.admin.router = new ppu.admin.Router
  Backbone.history.start pushState: true 