$ ->
  class ppu.PostsFilters extends Backbone.View
    el: $ '#top-bar'
    template: $ "#posts-filter"

    events:
      'change .countries': 'byCountry'
      'change .category': 'byCategory'
      'keyup .query': 'byKeyword'
      'submit .search': 'bySearch'

    initialize: ->
      @filtersAplied = {
        lang: app.lang,
        published: 1,
        the_actual_ch: 0
        the_actual_co: 0
      }
      app.pubsub.on("apply:filters", @filterBy, @)
      app.pubsub.on("general:scroll", @paginate, @)
      @offset = 20

    render: ->
      template = app.compile(@template)
      @$el.html(template)
      ppu.appendSelect(@el)

    filterBy: (data) ->
      data = _.extend(paginate: 0, data)
      data = _.extend(@filtersAplied, data)
      app.pubsub.trigger("posts:filter", data)

    paginate: ->
      data = _.extend(@filtersAplied,  paginate: @offset)
      ppu.posts.fetch data: data, beforeSend: () ->
        $('.preload').removeClass('hidden')
      , success: () ->
        $('.preload').addClass('hidden')

      @offset = ( @offset + 20 )

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

    byKeyword: (e) ->
      val = $(e.currentTarget).val()
      if val.length >= 2
        @filterBy(keyword: val)
      else if val.length == 1
        @filterBy(keyword: "", featured_order: "ASC")

    bySearch: (e) ->
      e.preventDefault()
      val = $(e.currentTarget).find(".query").val()
      @filterBy(keyword: val)
