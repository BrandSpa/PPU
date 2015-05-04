$ ->

  class ppu.ExperiencesView extends Backbone.View
    el: $ "#experiences"

    initialize: ->
      @listenTo(@collection, 'reset', @render)
      @listenTo(@collection, 'add', @renderOne)
      app.pubsub.bind("experiences:filter", @filterCollection, @)
      app.pubsub.on("apply:filters", @filterCollection, @)

    filterCollection: (filters) ->
      @collection.fetch reset: true, lang: app.lang, data: filters

    renderOne: (model) ->
      ppu.experienceView = new ppu.ExperienceView model: model
      @$el.append ppu.experienceView.render().el

    render: ->
      $(@el).html('')
      @collection.each (model) ->
        ppu.experienceView = new ppu.ExperienceView model: model
        @$el.append ppu.experienceView.render().el
      , @
