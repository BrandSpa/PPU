$ ->
	class ppu.FiltersMobile extends Backbone.View
		el: $ "#filters-modal"
		events:
			"click .apply-filters": "applyFilters"
			"change .category": "addCategory"
			"change .country": "addCountry"

		initialize: ->
			@filters = {}
			app.pubsub.on("filters:showPosition", @showPosition, @)

		filterBy: (data) ->
      data = _.extend(paginate: 0, data)
      data = _.extend(@filtersAplied, data)
      app.pubsub.trigger("posts:filter", data)

		applyFilters: (e) ->
			e.preventDefault()
			app.pubsub.trigger("apply:filters", @filters)
			@$el.modal('hide')

		showPosition: ->
			console.log "dale remove"
			$("#filters-modal").find('.position').removeClass('hidden')

		addFilter: (filter) ->
			@filters = _.extend(@filters, filter)

		addCategory: (e) ->
			val = $(e.currentTarget).find('select').val()
			@addFilter({category: val})

		addCountry: (e) ->
			val = $(e.currentTarget).find('select').val()
			@addFilter({country: val})




