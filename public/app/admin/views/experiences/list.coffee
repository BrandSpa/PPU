$ ->
  class ppu.admin.ExperiencesView extends Backbone.View
    el: $ "#experiences-dasboard"

    initialize: ->
      @listenTo(@collection, 'reset', @render)
      @listenTo(@collection, 'add', @addOne, @)

    addOne: (model) ->
      view = new ppu.admin.ExperienceView model: model
      $(@el).find('tbody').append view.render().el

    render: ->
      $(@el).find('tbody').html('')
      @collection.each (model) ->
        view = new ppu.admin.ExperienceView model: model
        $(@el).find('tbody').append view.render().el
      , @