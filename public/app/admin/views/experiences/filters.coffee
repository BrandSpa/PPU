$ ->
  class ppu.admin.ExperiencesFilters extends Backbone.View
    el: $ '.experience-filter'

    events:
      'change .position': 'byPosition'
      'change .country': 'byCountry'
      'change .category': 'byCategory'
      'keydown .query': 'byQuery'
      'click .see-more' : 'seeMore'

    initialize: ->
      @filtersAplied = {}

    render: ->
      template = app.compile(@template)
      @$el.html(template)

    filterBy: (field, val) ->
      data = _.extend(@filtersAplied,  field: val)
      app.pubsub.trigger("experiences:filter", data)

    seeMore: (e) ->
      e.preventDefault()
      offset = $(@el).data('offset') || 20
      data = _.extend(@filtersAplied, paginate: offset)
      ppu.experiences.fetch data: data
      $(@el).data('offset', (offset+20))

    byPosition: (e) ->
      val = $(e.currentTarget).find('select').val()
      @filterBy('by_position', val)

    byCountry: (e) ->
      val = $(e.currentTarget).val()
      if $(".countries").find('input[type="checkbox"]:checked').length == 2
        @filterBy('by_country', "")
      else
        if el.find(":not(:checked)")
          val = @CountryNotChecked(el)
          @filterBy('by_country', val)

    CountryNotChecked: (el) ->
      val = if el.val() == "Colombia" then "Chile" else "Colombia"
      $(".countries").find("input[value='#{val}']").prop('checked', true)
      val

    byCategory: (e) ->
      val = $(e.currentTarget).find('select').val()
      @filterBy('by_category', val)

    byQuery: (e) ->
      val = $(e.currentTarget).val()
      if val.length >= 3
        @filterBy('by_keyword', val)