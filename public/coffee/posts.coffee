$ ->
  class ppu.Post extends Backbone.Model
    urlRoot: '/api/posts'

  class ppu.Posts extends Backbone.Collection
    url: '/api/posts'
    model: ppu.Post

  class ppu.PostView extends Backbone.View
    template: $ "#post-template"
    className: "col-md-6 col-sm-6 col-xs-12 post-item"
    events: 
      "click .share-hover": "open"

    open: ->
      window.location = "/posts/#{@model.get('slug')}"

    render: ->
      template = app.compile(@template)
      $(@el).html template( @model.toJSON() )
      @

  class ppu.PostFeaturedView extends Backbone.View
    template: $ "#post-template"
    className: "col-md-6 col-sm-6 col-xs-12 post-featured-item"

    render: ->
      template = app.compile(@template)
      $(@el).html template( @model.toJSON() )
      @

  class ppu.PostsView extends Backbone.View
    el: $ "#posts"

    initialize: ->
      @listenTo(@collection, 'reset', @render)
      @listenTo(@collection, 'add', @renderOne)
      app.pubsub.on("posts:filter", @filterCollection, @)
      app.pubsub.on("apply:filters", @filterCollection, @)

    filterCollection: (filters) ->
      filters = _.extend(lang: app.lang, filters)
      @collection.fetch reset: true, data: filters

    renderOne: (model) ->
      ppu.postView = new ppu.PostView model: model
      @$el.append ppu.postView.render().el

    renderMain: (model) ->
      ppu.postMainFeaturedView = new ppu.PostMainFeaturedView model: model
      @$el.prepend ppu.postMainFeaturedView.render().el

    render: ->
      @$el.empty()
      i = 0
      @collection.each (model) ->
        if i == 0
          @renderMain(model)
        else
          @renderOne(model)
        i++
      , @

  class ppu.PostMainFeaturedView extends Backbone.View
    template: $ "#post-main-featured-template"
    className: "col-md-6 col-sm-6 col-xs-12 post-main-featured-item"
    events: 
      "click .share-hover": "open"

    open: ->
      window.location = "/posts/#{@model.get('slug')}"
    
    render: ->
      template = app.compile(@template)
      $(@el).html template( @model.toJSON() )
      @

  class ppu.PostsFeaturedView extends Backbone.View
    el: $ "#posts-featured"
    
    initialize: ->
      @listenTo(@collection, "reset", @render)
      app.pubsub.bind("posts:rendered", @getFeatured, @)
      app.pubsub.on("posts:filter", @remove, @)

    getFeatured: ->
      @collection.fetch reset: true, data: featured: true

    renderMain: (model) ->
      ppu.postMainFeaturedView = new ppu.PostMainFeaturedView model: model
      @$el.prepend ppu.postMainFeaturedView.render().el

    renderOne: (model) ->
      ppu.postView = new ppu.PostFeaturedView model: model
      @$el.append ppu.postView.render().el

    render: ->
      @collection.each (model) ->
        if model.get('featured') == 1
          @renderMain(model)
        else
          @renderOne(model)
      , @
        
  class ppu.PostsFilters extends Backbone.View
    el: $ '#top-bar'
    template: $ "#posts-filter"

    events:
      'change .country': 'byCountry'
      'change .category': 'byCategory'
      'keydown .query': 'byKeyword'
      'submit .search': 'bySearch'

    initialize: ->
      @filtersAplied = {lang: app.lang, not_featured: true}
      app.pubsub.on("general:scroll", @paginate, @)
      @offset = 20

    render: ->
      template = app.compile(@template)
      @$el.html(template)
      ppu.appendSelect(@el)

    filterBy: (data) ->
      data = _.extend(paginate: 0, data)
      data = _.extend(@filtersAplied, data)
      app.pubsub.trigger("posts:filter", data)

    paginate: ->
      data = _.extend(@filtersAplied,  paginate: @offset)
      ppu.posts.fetch data: data
      @offset = (@offset+20)

    byCountry: (e) ->
      el = $(e.currentTarget)

      if $(".countries").find('input[type="checkbox"]:checked').length == 2
        @filterBy(country: "")
      else
        if el.find(":not(:checked)")
          val = @CountryNotChecked(el)
          @filterBy(country: val)

    CountryNotChecked: (el) ->
      val = if el.val() == "Colombia" then "Chile" else "Colombia"
      $(".countries").find("input[value='#{val}']").prop('checked', true)
      val

    byCategory: (e) ->
      val = $(e.currentTarget).find('select').val()
      @filterBy(category: val)

    byKeyword: (e) ->
      val = $(e.currentTarget).val()
      if val.length >= 1
        @filterBy(keyword: val)
        

    bySearch: (e) ->
      e.preventDefault()
      val = $(e.currentTarget).find(".query").val()
      @filterBy(keyword: val)
      
  class ppu.PostDetailView extends Backbone.View
    el: $ "#post-detail"
    template: $ "#post-detail-template"

    initialize: ->
      @listenTo(@model, "change", @render)
      @getTitle()
    
    getTitle: ->
      $("#top-bar").html $("#post-detail-title").html()

    render: ->
      template = app.compile(@template)
      @$el.html(template( @model.toJSON() ))
      @setUrlTranslation(@model)
      @model.get('categories')
      relatedData = category: @model.get('categories')[0].name, without: @model.id
      app.pubsub.trigger('posts:getRelated', relatedData)

  class ppu.PostsRelated extends Backbone.View
    el: $ "#posts-related"

    initialize: ->
      @listenTo @collection, 'reset', @render
      app.pubsub.on('posts:getRelated', @get, @)

    get: (data) ->
      console.log data
      @collection.fetch reset: true, data: data

    renderOne: (model) ->
      console.log @
      ppu.postView = new ppu.PostView model: model
      @$el.append ppu.postView.render().el

    render: ->
      @$el.empty()
      @collection.each (model) ->
        @renderOne(model)
      , @



