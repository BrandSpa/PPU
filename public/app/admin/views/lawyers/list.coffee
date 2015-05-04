$ ->
  class ppu.admin.LawyersView extends Backbone.View
    el: $ '#lawyers-dashboard'
      
    initialize: ->
      @listenTo(@collection, 'reset', @render)
      @listenTo(@collection, 'add', @addOne)
      @filtersAplied = {lang: app.lang}
      app.pubsub.bind("lawyers:filter", @filterCollection, @)

    filterCollection: (data) ->
      $(".lawyers-filters").data('offset', 0)
      @collection.fetch reset: true, data: data

    addOne: (model) ->
      view = new ppu.admin.LawyerView model: model
      $(@el).find('tbody').append view.render().el

    render: ->
      $(@el).find('tbody').empty()
      @collection.each (model) ->
        @addOne(model)
      , @