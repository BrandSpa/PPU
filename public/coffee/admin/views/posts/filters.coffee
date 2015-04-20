$ ->
  class ppu.admin.PostsFilters extends Backbone.View
    el: $ '.post-filter'
  
    events:
      'click .see-more' : 'seeMore'
      'change .country': 'byCountry'
      'change .category': 'byCategory'
      'keydown .query': 'byKeyword'

    initialize: ->
      @filtersAplied = {lang: "es"}

    render: ->
      template = app.compile(@template)
      @$el.html(template)

    filterBy: (data) ->
      data = _.extend(@filtersAplied,  data)
      app.pubsub.trigger("posts:filter", data)

    seeMore: (e) ->
      e.preventDefault()
      offset = $(@el).data('offset') || 20
      data = _.extend(@filtersAplied, paginate: offset)
      ppu.posts.fetch data: data
      $(@el).data('offset', (offset+20))

    byCountry: (e) ->
      el = $(e.currentTarget)
      val = el.val()
      data = _.extend(@filtersAplied,  by_country: val)
      app.pubsub.trigger("posts:filter", data)

    CountryNotChecked: (el) ->
      val = if el.val() == "Colombia" then "Chile" else "Colombia"
      $(".countries").find("input[value='#{val}']").prop('checked', true)

    byCategory: (e) ->
      val = $(e.currentTarget).find('select').val()
      data = _.extend(@filtersAplied, by_category: val)
      app.pubsub.trigger("posts:filter", data)

    byKeyword: (e) ->
      val = $(e.currentTarget).val()
      if val.length >= 1
        @filterBy(keyword: val)