$ ->
  class ppu.TheCurrentFilter extends Backbone.View
    el: $ '#top-bar'
    template: $ "#the-current-filters"
    events:
      'change .countries': 'byCountry'
      'change .category': 'byCategory'
      'keyup .query': 'byKeyword'
      'submit .search': 'bySearch'

    initialize: ->
      @filtersAplied = {lang: app.lang,  published: true, the_actual: true}
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
      app.pubsub.trigger("posts:paginate", data)
      @offset = (@offset+20)

    byCategory: (e) ->
      val = $(e.currentTarget).find('select').val()
      @filterBy(category: val)

    byKeyword: (e) ->
      val = $(e.currentTarget).val()
      if val.length >= 2
        @filterBy(keyword: val)
      else if val.length == 1
        @filterBy(keyword: "", with_featured: true)
      
    bySearch: (e) ->
      e.preventDefault()
      val = $(e.currentTarget).find(".query").val()
      @filterBy(keyword: val)