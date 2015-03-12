$ ->
  class ppu.Experience extends Backbone.Model
    urlRoot: "/api/experiences"

  class ppu.Experiences extends Backbone.Collection
    url: "/api/experiences"
    model: ppu.Experience

  class ppu.ExperienceView extends Backbone.View
    template: $ "#experience-template"
    className: "col-md-6 col-sm-6 col-xs-12 experience-item"
    events:
      "click": "open"

    open: ->
      window.location = "/experiencias/#{@model.get('slug')}"

    render: ->
      template = app.compile(@template)
      $(@el).html template( @model.toJSON() )
      @

  class ppu.ExperiencesView extends Backbone.View
    el: $ "#experiences"

    initialize: ->
      @listenTo(@collection, 'reset', @render)
      @listenTo(@collection, 'add', @renderOne)
      app.pubsub.bind("experiences:filter", @filterCollection, @)
      app.pubsub.on("apply:filters", @filterCollection, @)

    filterCollection: (filters) ->
      @collection.fetch reset: true, lang: app.lang, data: filters

    renderOne: (model) ->
      ppu.experienceView = new ppu.ExperienceView model: model
      @$el.append ppu.experienceView.render().el

    render: ->
      $(@el).html('')
      @collection.each (model) ->
        ppu.experienceView = new ppu.ExperienceView model: model
        @$el.append ppu.experienceView.render().el
      , @

  class ppu.ExperiencesFilters extends Backbone.View
    el: $ '#top-bar'
    template: $ "#experiences-filter"

    events:
      'change .position': 'byPosition'
      'change .countries': 'byCountry'
      'change .category': 'byCategory'
      'keydown .query': 'byQuery'
      'submit .search': 'bySearch'

    initialize: ->
      @filtersAplied = {lang: app.lang}
      app.pubsub.on("general:scroll", @paginate, @)
      @offset = 20

    render: ->
      template = app.compile(@template)
      @$el.html(template)
      ppu.appendSelect(@el)

    paginate: ->
      data = _.extend(@filtersAplied,  paginate: @offset)
      ppu.experiences.fetch data: data, beforeSend: () ->
        $('.preload').removeClass('hidden')
      , success: () ->
        $('.preload').addClass('hidden')
      @offset = (@offset+20)

    filterBy: (data) ->
      @offset = 0
      data = _.extend(paginate: 0,  data)
      data = _.extend(@filtersAplied,  data)
      app.pubsub.trigger("experiences:filter", data)
      
    byPosition: (e) ->
      val = $(e.currentTarget).find('select').val()
      @filterBy(position: val)
      
    byCountry: (e) ->
      val = $(e.currentTarget).find('select').val()
      @filterBy(country: val)

    CountryNotChecked: (el) ->
      val = if el.val() == "Colombia" then "Chile" else "Colombia"
      $(".countries").find("input[value='#{val}']").prop('checked', true)
      val

    byCategory: (e) ->
      val = $(e.currentTarget).find('select').val()
      @filterBy(category: val)

    byQuery: (e) ->
      val = $(e.currentTarget).val()
      if val.length >= 1
        @filterBy(keyword: val)
      else
        @filterBy(keyword: "")

    bySearch: (e) ->
      e.preventDefault()
      val = $(e.currentTarget).find(".query").val()
      @filterBy(keyword: val)

  class ppu.ExperienceDetailView extends Backbone.View
    el: $ "#experience"
    template: $ "#experience-detail-template"

    initialize: ->
      @listenTo(@model, "change", @render)
      @getTitle()

    getTitle: ->
      $("#top-bar").html $("#experience-detail-title").html()

    render: ->
      template = app.compile(@template)
      @$el.html(template( @model.toJSON() ))
      @setUrlTranslation(@model)
      dataRelated = category: @model.get('categories')[0].name, without: @model.id
      app.pubsub.trigger('experiences:getRelated', dataRelated)

  class ppu.ExperienecesRelated extends Backbone.View
    el: "#experiences-related"

    initialize: ->
      @listenTo @collection, 'reset', @render
      app.pubsub.on('experiences:getRelated', @get, @)

    get: (data) ->
      @collection.fetch reset: true, data: data

    renderOne: (model) ->
      ppu.experienceView = new ppu.ExperienceView model: model
      @$el.append ppu.experienceView.render().el

    render: ->
      $(@el).empty()
      @collection.each (model) ->
        @renderOne(model)
      , @
       
  