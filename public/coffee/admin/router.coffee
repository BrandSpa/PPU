$ ->
  class ppu.admin.Router extends Backbone.Router
    routes:
      'dashboard': 'dashboard'

      #Lawyers
      'crear-abogado': 'createLawyer'
      "admin/lawyers/new": "createLawyer"
      "en/admin/lawyers/new": "createLawyer"
      ':lang/crear-abogado': 'createLawyer'
      'admin/lawyers/:id/edit': 'editLawyer'
      "en/admin/lawyers/:id/edit": "editLawyer"
      'editar-abogado/:id': 'editLawyer'
      'en/editar-abogado/:id': 'editLawyer'

      #Posts
      'admin/posts': 'post'
      'admin/posts/new': 'createPost'
      'en/admin/posts/new': 'createPost'
      'admin/posts/:id/edit': 'editPost'
      'en/admin/posts/:id/edit': 'editPost'

      #The actual
      'admin/the-actual/new': 'createTheActual'
      'admin/the-actual/:id/edit': 'editTheActual'
      'en/admin/the-actual/:id/edit': 'editTheActual'
      'admin/the-actual': 'theActual'

      #Experiences
      'admin/experiences': 'experience'
      'admin/experiences/new': 'createExperience'
      'admin/experiences/:id/edit': 'editExperience'
      'en/admin/experiences/:id/edit': 'editExperience'

    dashboard: ->
      ppu.lawyers = new ppu.Lawyers
      ppu.lawyers.fetch reset: true
      ppu.admin.lawyers= new ppu.admin.LawyersView collection: ppu.lawyers
      ppu.admin.lawyersFilters = new ppu.admin.LawyersFilters

    post: ->
      ppu.posts = new ppu.Posts
      ppu.posts.fetch reset: true, data: without_the_actual: true
      ppu.admin.posts = new ppu.admin.PostsView collection: ppu.posts
      ppu.admin.postsFilters = new ppu.admin.PostsFilters

    createPost: (lang) ->
      ppu.admin.post = new ppu.Post
      ppu.admin.postCreate = new ppu.admin.PostCreate model: ppu.admin.post
      ppu.admin.postCreate.render()

      ppu.categories = new ppu.Categories
      ppu.categories.fetch reset: true
      ppu.admin.categoriesCheckboxnew = new ppu.admin.CategoriesCheckbox collection: ppu.categories

      ppu.admin.galleries = new  ppu.admin.Galleries
      ppu.admin.galleries.fetch reset: true, data: name: "post_header"

    editPost: (id) ->
      ppu.admin.post = new ppu.Post id: id
      ppu.admin.post.fetch data: lang: app.lang
      ppu.admin.postEdit = new ppu.admin.PostEdit model: ppu.admin.post

      ppu.admin.galleries = new  ppu.admin.Galleries
      ppu.admin.galleries.fetch reset: true, data: name: "post_header"

    theActual: ->
      ppu.posts = new ppu.Posts
      ppu.posts.fetch reset: true, data: the_actual: true
      ppu.admin.posts = new ppu.admin.TheActualViews collection: ppu.posts
      ppu.admin.postsFilters = new ppu.admin.PostsFilters

    createTheActual: ->
      ppu.admin.post = new ppu.Post
      ppu.admin.postCreate = new ppu.admin.TheActualCreate model: ppu.admin.post
      ppu.admin.postCreate.render()

      ppu.categories = new ppu.Categories
      ppu.categories.fetch reset: true
      ppu.admin.categoriesCheckboxnew = new ppu.admin.CategoriesCheckbox collection: ppu.categories

      ppu.admin.galleries = new  ppu.admin.Galleries
      ppu.admin.galleries.fetch reset: true, data: name: "post_header"

    editTheActual: (id) ->
      ppu.admin.post = new ppu.Post id: id
      ppu.admin.post.fetch data: lang: app.lang
      ppu.admin.postEdit = new ppu.admin.PostEdit model: ppu.admin.post

      ppu.admin.galleries = new  ppu.admin.Galleries
      ppu.admin.galleries.fetch reset: true, data: name: "post_header"

    lawyer: ->
      ppu.lawyers = new ppu.Lawyers
      ppu.lawyers.fetch reset: true
      ppu.admin.lawyers= new ppu.admin.LawyersView collection: ppu.lawyers
      ppu.admin.lawyersFilters = new ppu.admin.LawyersFilters

    createLawyer: (lang) ->
      ppu.lawyer =  new ppu.Lawyer
      ppu.lawyerCreateForm = new ppu.LawyerCreateForm model: ppu.lawyer
      ppu.lawyerCreateForm.render()

      ppu.categories = new ppu.Categories
      ppu.categories.fetch reset: true
      ppu.admin.categoriesCheckboxnew = new ppu.admin.CategoriesCheckbox collection: ppu.categories

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

    experience: ->
      ppu.experiences = new ppu.Experiences
      ppu.experiences.fetch reset: true
      ppu.admin.experiences = new ppu.admin.ExperiencesView collection: ppu.experiences
      ppu.admin.experiencesFilters = new ppu.admin.ExperiencesFilters

    createExperience: (lang) ->
      ppu.admin.experience = new ppu.Experience
      ppu.admin.experienceCreate = new ppu.admin.ExperienceCreate model: ppu.admin.experience
      ppu.admin.experienceCreate.render()

      ppu.categories = new ppu.Categories
      ppu.categories.fetch reset: true
      ppu.admin.categoriesCheckboxnew = new ppu.admin.CategoriesCheckbox collection: ppu.categories

      ppu.admin.galleries = new  ppu.admin.Galleries
      ppu.admin.galleries.fetch reset: true, data: name: "company_logo"

    editExperience: (id) ->
      ppu.admin.experience = new ppu.Experience id: id
      ppu.admin.experience.fetch data: lang: app.lang
      ppu.admin.experienceEdit = new ppu.admin.ExperienceEdit model: ppu.admin.experience

      ppu.admin.galleries = new  ppu.admin.Galleries
      ppu.admin.galleries.fetch reset: true, data: name: "company_logo"

  ppu.admin.router = new ppu.admin.Router
  Backbone.history.start pushState: true
