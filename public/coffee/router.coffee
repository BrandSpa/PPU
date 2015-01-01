$ ->
  class ppu.Workspace extends Backbone.Router
    routes:
      "abogados" : "lawyers"
      "abogados/:slug" : "lawyer"
      "experiencias" : "experiences"
      "experiencias/:slug" : "experience"
      "posts" : "posts"
      "" : "posts"
      "posts/:slug" : "post"
      "areas": "areas"
      "areas/:slug": "area"
      "trabaje-con-nosotros": "curriculum"

    initialize: ->
      new ppu.AppView
      window.urlTranslation = ""
      
    lawyers: (lang) ->
      ppu.lawyers =  new ppu.Lawyers
      ppu.lawyers.fetch reset: true
      ppu.lawyersFilters = new ppu.LawyersFilters
      ppu.lawyersFilters.render()
      ppu.lawyersView =  new ppu.LawyersView collection: ppu.lawyers

    lawyer: (slug) ->
      ppu.lawyers =  new ppu.Lawyers
      ppu.lawyers.fetch reset: true, data: lang: app.lang, slug: slug
      ppu.LawyerDetailView = new ppu.LawyerDetailView collection: ppu.lawyers

    posts: ->
      ppu.postsFeatured = new ppu.Posts
      ppu.postsFeatured.fetch reset: true, data: featured: true
      ppu.postsFilters = new ppu.PostsFilters
      ppu.postsFilters.render()
      ppu.posts = new ppu.Posts
      ppu.posts.fetch reset: true, data: published: true, not_featured: true

      ppu.postsFeaturedView = new ppu.PostsFeaturedView collection: ppu.postsFeatured
      ppu.postsView = new ppu.PostsView collection: ppu.posts

    post: (slug)->
      ppu.post = new ppu.Post id: slug
      ppu.post.fetch()
      ppu.postDetailView = new ppu.PostDetailView model: ppu.post

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

    experience: (slug) ->
      ppu.experience = new ppu.Experience id: slug
      ppu.experience.fetch()
      ppu.experienceDetailView = new ppu.ExperienceDetailView model: ppu.experience

    experiences: () ->
      ppu.experiencesFilters = new ppu.ExperiencesFilters
      ppu.experiencesFilters.render()
      ppu.experiences = new ppu.Experiences
      ppu.experiences.fetch reset: true, data: published: true, not_featured: true
      ppu.experiencesView = new ppu.ExperiencesView collection: ppu.experiences

    curriculum: ->
      ppu.curriculum = new ppu.Curriculum
      ppu.curriculumCreate = new ppu.CurriculumCreate model: ppu.curriculum


  new ppu.Workspace
  Backbone.history.start pushState: true 
