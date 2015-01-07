$ ->
  class ppu.Post extends Backbone.Model
    urlRoot: '/api/posts'

  class ppu.Posts extends Backbone.Collection
    url: '/api/posts'
    model: ppu.Post

  class ppu.PostView extends Backbone.View
    template: $ "#post-template"
    className: "col-md-6 col-sm-6 col-xs-12 post-item"

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
      app.pubsub.bind("posts:filter", @filterCollection, @)

    filterCollection: (filters) ->
      @collection.fetch reset: true, lang: app.lang, data: filters

    renderOne: (model) ->
      ppu.postView = new ppu.PostView model: model
      @$el.append ppu.postView.render().el

    render: ->
      app.pubsub.trigger("seo:render", @collection)
      @$el.html("")
      @collection.each (model) ->
        @renderOne(model)
      , @

  class ppu.PostMainFeaturedView extends Backbone.View
    template: $ "#post-main-featured-template"
    className: "col-md-6 col-sm-6 col-xs-12 post-main-featured-item"
    
    render: ->
      template = app.compile(@template)
      $(@el).html template( @model.toJSON() )
      @

  class ppu.PostsFeaturedView extends Backbone.View
    el: $ "#posts-featured"
    
    initialize: ->
      @listenTo(@collection, "reset", @render)
      app.pubsub.bind("posts:filter", @hide, @)

    hide: ->
      @$el.fadeOut()

    renderMain: (model) ->
      ppu.postMainFeaturedView = new ppu.PostMainFeaturedView model: model
      @$el.append ppu.postMainFeaturedView.render().el

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
      @filtersAplied = {lang: app.lang}

    render: ->
      template = app.compile(@template)
      @$el.html(template)
      ppu.appendSelect(@el)

    filterBy: (data) ->
      data = _.extend(@filtersAplied,  data)
      app.pubsub.trigger("posts:filter", data)

    byCountry: (e) ->
      el = $(e.currentTarget)

      if $(".countries").find('input[type="checkbox"]:checked').length == 2
        @filterBy(by_country: "")
      else
        if el.find(":not(:checked)")
          val = @CountryNotChecked(el)
          @filterBy(by_country: val)

    CountryNotChecked: (el) ->
      val = if el.val() == "Colombia" then "Chile" else "Colombia"
      $(".countries").find("input[value='#{val}']").prop('checked', true)
      val

    byCategory: (e) ->
      val = $(e.currentTarget).find('select').val()
      @filterBy(by_category: val)

    byKeyword: (e) ->
      val = $(e.currentTarget).val()
      if val.length >= 1
        @filterBy(by_keyword: val)

    bySearch: (e) ->
      e.preventDefault()
      val = $(e.currentTarget).find(".query").val()
      @filterBy(by_keyword: val)


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

