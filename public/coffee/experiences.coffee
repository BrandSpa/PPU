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

  	renderOne: (model) ->
  		ppu.experienceView = new ppu.ExperienceView model: model
  		@$el.append ppu.experienceView.render().el

  	render: ->
  		@collection.each (model) ->
  			@renderOne(model)
  		, @

  class ppu.ExperiencesFilters extends Backbone.View
    el: $ '#top-bar'
    template: $ "#experiences-filter"

    events:
      'change .position': 'byPosition'
      'change .country': 'byCountry'
      'change .category': 'byCategory'
      'keydown .query': 'byQuery'

    render: ->
      template = app.compile(@template)
      @$el.html(template)

    byPosition: (e) ->
      val = $(e.currentTarget).find('select').val()
      ppu.lawyers.fetch reset: true, data: position: val
      
    byCountry: (e) ->
      val = $(e.currentTarget).val()
      ppu.lawyers.fetch reset: true, data: country: val

    byCategory: (e) ->
      val = $(e.currentTarget).find('select').val()
      ppu.lawyers.fetch reset: true, data: category: val

    byQuery: (e) ->
      val = $(e.currentTarget).val()
      if val.length >= 3
        ppu.lawyers.fetch reset: true, data: keyword: val

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
      window.urlTranslation = @model.get("translations").slug
      
  		