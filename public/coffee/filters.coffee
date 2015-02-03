$ ->
	class ppu.FiltersMobile extends Backbone.View
		el: $ "#filters-modal"
		events: 
			"click .apply-filters": "applyFilters"
			"change .category": "addCategory"
			"change .country": "addCountry"

		initialize: ->
			@filters = {}

		applyFilters: (e) ->
			e.preventDefault()
			app.pubsub.trigger("apply:filters", @filters)
			@$el.modal('hide')

		addFilter: (filter) ->
			@filters = _.extend(@filters, filter)

		addCategory: (e) ->
			val = $(e.currentTarget).find('select').val()
			@addFilter({by_category: val})
		
		addCountry: (e) ->
			val = $(e.currentTarget).find('select').val()
			@addFilter({by_country: val})
			



