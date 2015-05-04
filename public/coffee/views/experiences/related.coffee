$ ->

  class ppu.ExperienecesRelated extends Backbone.View
    el: "#experiences-related"

    initialize: ->
      @listenTo @collection, 'reset', @render
      app.pubsub.on('experiences:getRelated', @get, @)

    get: (data) ->
      @collection.fetch reset: true, data: data

    renderOne: (model) ->
      ppu.experienceView = new ppu.ExperienceView model: model
      @$el.append ppu.experienceView.render().el

    render: ->
      $(@el).empty()
      @collection.each (model) ->
        @renderOne(model)
      , @
