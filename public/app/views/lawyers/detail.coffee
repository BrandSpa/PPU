$ ->

  class ppu.LawyerDetailView extends Backbone.View
    el: $ '#lawyer'
    template: $ '#lawyer-template'

    initialize: ->
      @listenTo(@model, 'change', @render)

    render: ->
      template = app.compile(@template)
      $(@el).html template( @model.toJSON() )

      @resizeImages()

    resizeImages: ->
      images = @$el.find('.award img')

      _.each images, (e) ->
        $(e).load (a) ->
          if $(@).height() > 90
            $(@).css('height', '90px')
