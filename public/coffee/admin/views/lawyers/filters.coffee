$ ->
  class ppu.admin.LawyersFilters extends Backbone.View
    el: $ '.lawyers-filters'
    events:
      'click .see-more' : 'seeMore'
      'keyup .query' : 'search'
      'change .lawyer-filter-lang' : 'filterLang'
      'change .lawyer-filter-country' : 'filterCountry'
      'change .lawyer-filter-category' : 'filterCategory'
      'change .lawyer-filter-position' : 'filterPosition'

    initialize: ->
      @filtersAplied = {lang: app.lang}

    seeMore: (e) ->
      e.preventDefault()
      offset = $(@el).data('offset') || 20
      data = _.extend(@filtersAplied, paginate: offset)
      ppu.lawyers.fetch data: data
      $(@el).data('offset', (offset+20))

    search: (e) ->
      e.preventDefault()
      query = $(e.currentTarget).val()
      if query.length >= 3
        data = _.extend(@filtersAplied, paginate: 0, search: query)
        app.pubsub.trigger("lawyers:filter", data)

    filterLang: (e) ->
      val = $(e.currentTarget).val()
      data = _.extend(@filtersAplied, paginate: 0, lang: val)
      console.log data
      app.pubsub.trigger("lawyers:filter", data)

    filterCountry: (e) ->
      val = $(e.currentTarget).val()
      data = _.extend(@filtersAplied, paginate: 0, country: val)
      console.log _.extend(@filtersAplied, paginate: 0, country: val)
      app.pubsub.trigger("lawyers:filter", data)

    filterPosition: (e) ->
      val = $(e.currentTarget).val()
      data = _.extend(@filtersAplied, paginate: 0, position: val)
      app.pubsub.trigger("lawyers:filter",data)

    filterCategory: (e) ->
      val = $(e.currentTarget).val()
      data = _.extend(@filtersAplied, paginate: 0, category: val)
      app.pubsub.trigger("lawyers:filter",data)