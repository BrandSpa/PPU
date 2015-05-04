$ ->

  class ppu.LawyersView extends Backbone.View
    el: $ '#lawyers'

    initialize: ->
      @listenTo(@collection, 'reset', @render)
      @listenTo(@collection, 'add', @renderOne)

      if app.lang == "en"
        data = _.extend published: 1, order_by_english: ""
      else
        data = _.extend published: 1, order_by_spanish: ""
      @collection.fetch reset: true, data: data
      app.pubsub.on("apply:filters", @filterCollection, @)

    filterCollection: (filters) ->
      filters = _.extend({lang: app.lang}, filters)
      @collection.fetch reset: true, data: filters

    paginate: () ->
      @collection.fetch data: offset: offset

    renderOne: (model) ->
      view = new ppu.LawyerView model: model
      $(@el).append view.render().el

    render: ->
      $(@el).empty()
      @collection.each (model) ->
        @renderOne(model)
      , @
