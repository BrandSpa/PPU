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

      #The actual Colombia
      'admin/the-actual-co/new': 'createTheActualCo'
      'admin/the-actual-co/:id/edit': 'editTheActualCo'
      'en/admin/the-actual-co/:id/edit': 'editTheActualCo'
      'admin/the-actual-co': 'theActualCo'

      #Experiences
      'admin/experiences': 'experience'
      'admin/experiences/new': 'createExperience'
      'admin/experiences/:id/edit': 'editExperience'
      'en/admin/experiences/:id/edit': 'editExperience'

    dashboard: ->
      ppu.admin.LawyersController.index()

    lawyer: ->
      ppu.admin.LawyersController.show()

    createLawyer: (lang) ->
      ppu.admin.LawyersController.create()

    editLawyer: (id) ->
      ppu.admin.LawyersController.edit(id)

    post: ->
      ppu.admin.PostsController.index()

    createPost: (lang) ->
      ppu.admin.PostsController.create()

    editPost: (id) ->
      ppu.admin.PostsController.edit()

    theActual: ->
      ppu.admin.TheActualChController.index()

    createTheActual: ->
      ppu.admin.TheActualChController.create()

    editTheActual: (id) ->
      ppu.admin.TheActualChController.edit(id)

    theActualCo: ->
      ppu.admin.TheActualCoController.index()

    createTheActualCo: ->
      ppu.admin.TheActualCoController.edit(id)

    editTheActualCo: (id) ->
      ppu.admin.TheActualCoController.edit(id)

    experience: ->
      ppu.admin.ExperiencesController.index()

    createExperience: (lang) ->
      ppu.admin.ExperiencesController.create()

    editExperience: (id) ->
      ppu.admin.ExperiencesController.edit(id)


  ppu.admin.router = new ppu.admin.Router
  Backbone.history.start pushState: true
