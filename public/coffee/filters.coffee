$ ->
	class ppu.FiltersMobile extends Backbone.View
		el: $ "#filters-modal"
		events: 
			"click .apply-filters": "applyFilters"
			"change .category": "addCategory"
			"change .country": "addCountry"

		applyFilters: (e) ->
			e.preventDefault()
			filters = $(e.currentTarget).data("filters")
			console.log filters

		addFilter: (filter)->
			btnfilters = $(".apply-filters")
			filters = btnfilters.data("filters")
			newFilter = _.extend(filters, filter)
			btnfilters.data("filters", newFilter)

		addCategory: (e) ->
			val = $(e.currentTarget).find('select').val()
			@addFilter({category: val})
		
		addCountry: (e) ->
			val = $(e.currentTarget).find('select').val()
			@addFilter({country: val})
			



