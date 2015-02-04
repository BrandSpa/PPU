$ ->
	class ppu.Experience extends Backbone.Model
		urlRoot: "/api/experiences"

	class ppu.Experiences extends Backbone.Collection
		url: "/api/experiences"
		model: ppu.Experience

	class ppu.ExperienceView extends Backbone.View
  	template: $ "#experience-template"
  	className: "col-md-6 col-sm-6 col-xs-12 experience-item"

  	render: ->
  		template = app.compile(@template)
  		$(@el).html template( @model.toJSON() )
  		@

  class ppu.ExperiencesView extends Backbone.View
  	el: $ "#experiences"

  	initialize: ->
      @listenTo(@collection, 'reset', @render)
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
      'change .country': 'byCountry'
      'change .category': 'byCategory'
      'keydown .query': 'byQuery'
      'submit .search': 'bySearch'

    initialize: ->
      @filtersAplied = {lang: app.lang}

    render: ->
      template = app.compile(@template)
      @$el.html(template)
      ppu.appendSelect(@el)

    filterBy: (data) ->
      data = _.extend(@filtersAplied,  data)
      app.pubsub.trigger("experiences:filter", data)
      
    byPosition: (e) ->
      val = $(e.currentTarget).find('select').val()
      @filterBy(position: val)
      
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
       
  