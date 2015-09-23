$ ->

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
      app.pubsub.on("apply:filters", @filterBy, @)
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
