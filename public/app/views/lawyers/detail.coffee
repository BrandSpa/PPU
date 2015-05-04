$ ->

  class ppu.LawyerDetailView extends Backbone.View
    el: $ '#lawyer'
    template: $ '#lawyer-template'

    initialize: ->
      @listenTo(@model, 'change', @render)
      @getTitle()
      @model.fetch()

    getTitle: ->
      $("#top-bar").html $("#lawyer-detail-title").html()

    render: ->
      template = app.compile(@template)
      $(@el).html template( @model.toJSON() )
      @getImgs()


    getImgs: ->
      h = @$el.find('.award img')
      _.each h, (e) ->
        $(e).load (a) ->
          if $(@).height() > 90
            $(@).css('height', '90px')
