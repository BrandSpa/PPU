$ ->
  class ppu.Workspace extends Backbone.Router
    routes:
      "abogados" : "lawyers"
      "abogados/:slug" : "lawyer"
      "experiencias" : "experiences"
      "experiencias/:slug" : "experience"
      "posts" : "posts"
      "el-actual" : "theActual"
      "el-actual/:slug" : "theActualDetail"
      "" : "posts"
      "posts/:slug" : "post"
      "areas": "areas"
      "areas/:slug": "area"
      "trabaje-con-nosotros": "curriculum"
      "nosotros": "us"
      "probono": "probono"

    initialize: ->
      new ppu.AppView
      window.urlTranslation = ""
      ppu.contact = new ppu.Contact
      ppu.FooterContactCreate = new ppu.FooterContactCreate model: ppu.contact
      
    lawyers: () ->
      ppu.lawyers =  new ppu.Lawyers
      ppu.lawyersView =  new ppu.LawyersView collection: ppu.lawyers
      ppu.lawyersFilters = new ppu.LawyersFilters
      ppu.filtersMobile = new ppu.FiltersMobile
    
    lawyer: (slug) ->
      ppu.lawyer = new ppu.Lawyer id: slug
      ppu.LawyerDetailView = new ppu.LawyerDetailView model: ppu.lawyer

    posts: ->
      ppu.posts = new ppu.Posts
      ppu.posts.fetch reset: true, data: with_featured: true, published: true, without_the_actual: true
      ppu.postsView = new ppu.PostsView collection: ppu.posts

      ppu.postsFilters = new ppu.PostsFilters
      ppu.postsFilters.render()
      ppu.filtersMobile = new ppu.FiltersMobile

    theActual: ->
      ppu.TheCurrentController.index()

    theActualDetail: (slug)->
      ppu.post = new ppu.Post id: slug
      ppu.posts = new ppu.Posts
      ppu.post.fetch()
      ppu.postDetailView = new ppu.TheActualDetailView model: ppu.post
      ppu.postsRelated = new ppu.PostsRelated collection: ppu.posts


    post: (slug)->
      ppu.post = new ppu.Post id: slug
      ppu.posts = new ppu.Posts
      ppu.post.fetch()
      ppu.postDetailView = new ppu.PostDetailView model: ppu.post
      ppu.postsRelated = new ppu.PostsRelated collection: ppu.posts

    areas: ->
      ppu.categories = new ppu.Categories
      ppu.categories.fetch reset: true
      ppu.categoriesView = new ppu.CategoriesView collection: ppu.categories

    area: (slug)->
      ppu.category = new ppu.Category id: slug
      ppu.category.fetch()
      ppu.categoryDetail = new ppu.CategoryDetail model: ppu.category

      ppu.categories = new ppu.Categories
      ppu.categoriesList = new ppu.CategoriesList collection: ppu.categories

      ppu.lawyers = new ppu.Lawyers
      ppu.lawyersRelated = new ppu.lawyersRelatedCategory collection: ppu.lawyers

    experience: (slug) ->
      ppu.experience = new ppu.Experience id: slug
      ppu.experience.fetch()
      ppu.experienceDetailView = new ppu.ExperienceDetailView model: ppu.experience
      ppu.experiences = new ppu.Experiences
      ppu.experienecesRelated = new ppu.ExperienecesRelated collection: ppu.experiences

    experiences: () ->
      ppu.experiencesFilters = new ppu.ExperiencesFilters
      ppu.experiencesFilters.render()
      ppu.experiences = new ppu.Experiences
      ppu.experiences.fetch reset: true, data: published: true, not_featured: true
      ppu.experiencesView = new ppu.ExperiencesView collection: ppu.experiences

      ppu.filtersMobile = new ppu.FiltersMobile

    curriculum: ->
      ppu.curriculum = new ppu.Curriculum
      ppu.curriculumCreate = new ppu.CurriculumCreate model: ppu.curriculum
      
      title = $("#work-with-title-template").html()
      $("#top-bar").html title

    us: ->
      title = $("#us-title-template").html()
      $("#top-bar").html title

    probono: ->
      title = $("#probono-title-template").html()
      $("#top-bar").html title

  new ppu.Workspace
  Backbone.history.start pushState: true
