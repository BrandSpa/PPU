$ ->
  class ppu.admin.ExperienceLawyersSelect extends Backbone.View
    el: $ "#lawyers-result"

    events: 
      "" : ""

    initialize: ->
     @listenTo(@collection, 'reset', @render)

    render: ->
      $("#lawyers-result").html('')
      @collection.each (model) ->
        view = new ppu.admin.ExperienceLawyerSelect model: model
        $("#lawyers-result").prepend view.render().el
      , @

    search: (query) ->
      @collection.fetch reset: true, data: search: query