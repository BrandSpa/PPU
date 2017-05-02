$ ->
  class ppu.Workspace extends Backbone.Router

    routes:
      # Posts
      "" : "posts"
      "posts" : "posts"
      "posts/:slug" : "post"

      # Laywers
      "abogados" : "lawyers"
      "abogados/:slug" : "lawyer"

      # Experiences
      "experiencias" : "experiences"
      "experiencias/:slug" : "experience"

      # The actual
      "el-actual" : "theActual"
      "el-actual/:slug" : "theActualDetail"

      # The Actual Colombia
      "el-actual-colombia" : "theActualCo"
      "el-actual-colombia/:slug" : "theActualCoDetail"

      # The Actual Perú
      "el-actual-peru" : "theActualPe"
      "el-actual-peru/:slug" : "theActualPeDetail"

      # Areas
      "areas": "areas"
      "areas/:slug": "area"

      # Pages
      "trabaje-con-nosotros": "curriculum"
      "nosotros": "us"
      "probono": "probono"

    initialize: ->
      new ppu.AppView
      window.urlTranslation = ""
      ppu.contact = new ppu.Contact
      ppu.FooterContactCreate = new ppu.FooterContactCreate model: ppu.contact

    posts: ->
      ppu.PostsController.index()

    post: (slug)->
      ppu.PostsController.show(slug)

    lawyers: () ->
      ppu.LawyersController.index()

    lawyer: (slug) ->
      ppu.LawyersController.show(slug)

    theActual: ->
      ppu.TheActualChController.index()

    theActualDetail: (slug)->
      ppu.TheActualChController.show(slug)

    theActualCo: ->
      ppu.TheActualCoController.index()

    theActualCoDetail: (slug)->
      ppu.TheActualCoController.show(slug)

    areas: ->
      ppu.CategoriesController.index()

    area: (slug)->
      ppu.CategoriesController.show(slug)

    experiences: () ->
      ppu.ExperiencesController.index()

    experience: (slug) ->
      ppu.ExperiencesController.show(slug)

    curriculum: ->
      ppu.curriculumsController.index()

    us: ->
      ppu.UsController.index()

    probono: ->
      ppu.ProbonoController.index()

  new ppu.Workspace

