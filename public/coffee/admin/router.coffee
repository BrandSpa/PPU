$ ->
  class ppu.admin.Router extends Backbone.Router
    routes: 
      'dashboard': 'dashboard'

      "admin/lawyers/new": "createLawyer"
      'admin/posts/new': 'createPost'
      'admin/experiences/new': 'createExperience'

      "en/admin/lawyers/new": "createLawyer"
      'en/admin/posts/new': 'createPost'

      'admin/lawyers/:id/edit': 'editLawyer'
      'admin/posts/:id/edit': 'editPost'
      'admin/experiences/:id/edit': 'editExperience'

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

      ppu.experiences = new ppu.Experiences
      ppu.experiences.fetch reset: true
      ppu.admin.experiences = new ppu.admin.ExperiencesView collection: ppu.experiences

    createLawyer: (lang) ->
      ppu.lawyer =  new ppu.Lawyer
      ppu.lawyerCreateForm = new ppu.LawyerCreateForm model: ppu.lawyer
      ppu.lawyerCreateForm.render()

      ppu.categories = new ppu.Categories
      ppu.categories.fetch reset: true
      ppu.admin.categoriesCheckboxnew = new ppu.admin.CategoriesCheckbox collection: ppu.categories

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

      mixins.renderCollection(ppu.LawyerEducations, ppu.LawyerEducationsEdit, lawyer_id: id)
      mixins.renderCollection(ppu.LawyerArticles, ppu.LawyerArticlesEdit, lawyer_id: id)
      mixins.renderCollection(ppu.LawyerJobs, ppu.LawyerJobsEdit, lawyer_id: id)
      mixins.renderCollection(ppu.LawyerRecognitions, ppu.LawyerRecognitionsEdit, lawyer_id: id)
      mixins.renderCollection(ppu.LawyerInstitutions, ppu.LawyerInstitutionsEdit, lawyer_id: id)
      mixins.renderCollection(ppu.LawyerLanguages, ppu.LawyerLanguagesEdit, lawyer_id: id)
      mixins.renderCollection(ppu.LawyerPharases, ppu.LawyerPharasesEdit, lawyer_id: id)
      mixins.renderCollection(ppu.LawyerAwards, ppu.LawyerAwardsEdit, lawyer_id: id)
      mixins.renderCollection(ppu.LawyerAcademics, ppu.LawyerAcademicsEdit, lawyer_id: id)

    createPost: (lang) ->
      ppu.admin.post = new ppu.Post
      ppu.admin.postCreate = new ppu.admin.PostCreate model: ppu.admin.post
      ppu.admin.postCreate.render()

      ppu.categories = new ppu.Categories
      ppu.categories.fetch reset: true
      ppu.admin.categoriesCheckboxnew = new ppu.admin.CategoriesCheckbox collection: ppu.categories

      ppu.admin.galleries = new  ppu.admin.Galleries
      ppu.admin.galleries.fetch reset: true, data: name: "post_header"

    createExperience: (lang) ->
      ppu.admin.experience = new ppu.Experience
      ppu.admin.experienceCreate = new ppu.admin.ExperienceCreate model: ppu.admin.experience
      ppu.admin.experienceCreate.render()

      ppu.categories = new ppu.Categories
      ppu.categories.fetch reset: true
      ppu.admin.categoriesCheckboxnew = new ppu.admin.CategoriesCheckbox collection: ppu.categories

      ppu.admin.galleries = new  ppu.admin.Galleries
      ppu.admin.galleries.fetch reset: true, data: name: "company_logo"

    editPost: (id) ->
      ppu.admin.post = new ppu.Post id: id
      ppu.admin.post.fetch data: lang: app.lang
      ppu.admin.postEdit = new ppu.admin.PostEdit model: ppu.admin.post

      ppu.admin.galleries = new  ppu.admin.Galleries
      ppu.admin.galleries.fetch reset: true, data: name: "post_header"

    editExperience: (id) ->
      ppu.admin.experience = new ppu.Experience id: id
      ppu.admin.experience.fetch data: lang: app.lang
      ppu.admin.experienceEdit = new ppu.admin.ExperienceEdit model: ppu.admin.experience

      ppu.admin.galleries = new  ppu.admin.Galleries
      ppu.admin.galleries.fetch reset: true, data: name: "company_logo"
      
  ppu.admin.router = new ppu.admin.Router
  Backbone.history.start pushState: true 