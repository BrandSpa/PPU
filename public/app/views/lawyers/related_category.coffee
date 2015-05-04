$ ->

  class ppu.lawyersRelatedCategory extends Backbone.View
    el: $ "#lawyers-related"
    template: $ ("#lawyer-related-template")

    initialize: ->
      @listenTo(@collection, "reset", @render)
      app.pubsub.bind("lawyers:related", @getRelated, @)

    getRelated: (category) ->
      if app.lang == "en"
        position = "Partner"
      else
        position = "Socio"

      @collection.fetch reset: true, data: lang: app.lang, category: category, position: position

    render: ->
      template = app.compile(@template)
      $("#lawyers-related").html template( @collection.toJSON() )
