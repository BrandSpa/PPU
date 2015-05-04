$ ->

  class ppu.LawyersFilters extends Backbone.View
    el: $ '#top-bar'
    template: $ "#lawyers-filter"
    offset: 20
    events:
      'change .position': 'byPosition'
      'change .countries': 'byCountry'
      'change .category': 'byCategory'
      'keyup .query': 'byQuery'
      'submit .search': 'bySearch'

    initialize: ->
      @render()
      @filtersAplied = {lang: app.lang, published: 1}
      @order_by()
      @$el.data("filtersAplied", @filtersAplied)
      app.pubsub.on("general:scroll", @paginate, @)
      app.pubsub.trigger("filters:showPosition")

    order_by: ->
      if app.lang == "en"
        _.extend(@filtersAplied, order_by_english: "")
      else
        _.extend(@filtersAplied, order_by_spanish: "")

    render: ->
      template = app.compile(@template)
      @$el.html(template)
      ppu.appendSelect(@el)

    paginate: ->
      data = _.extend(@filtersAplied, paginate: @offset)
      ppu.lawyers.fetch data: data, beforeSend: () ->
        $('.preload').removeClass('hidden')
      , success: () ->
        $('.preload').addClass('hidden')
      @offset = (@offset+20)

    byPosition: (e) ->
      val = $(e.currentTarget).find('select').val()
      data = _.extend(@filtersAplied, paginate: 0, position: val)
      ppu.lawyers.fetch reset: true, data: data

    byCountry: (e) ->
      val = $(e.currentTarget).find('select').val()
      data = _.extend(@filtersAplied,paginate: 0,  country: val)
      ppu.lawyers.fetch reset: true, data: data

    byCategory: (e) ->
      val = $(e.currentTarget).find('select').val()
      data = _.extend(@filtersAplied, paginate: 0, category: val)
      ppu.lawyers.fetch reset: true, data: data

    byQuery: (e) ->
      val = $(e.currentTarget).val()
      if val.length >= 1
        data = _.extend(@filtersAplied,paginate: 0, search: val)
        ppu.lawyers.fetch reset: true, data: data

    bySearch: (e) ->
      e.preventDefault()
      val = $(e.currentTarget).find(".query").val()
      data = _.extend(@filtersAplied, paginate: 0, search: val)
      ppu.lawyers.fetch reset: true, data: data
