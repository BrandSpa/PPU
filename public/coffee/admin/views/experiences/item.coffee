$ ->
  class ppu.admin.ExperienceView extends Backbone.View
    template: $ '#experience-admin-template'
    tagName: 'tr'
    events: 
      "click .publish": "publish"
      "click .unpublish": "unpublish"
      "click .translate": "translate"

    initialize: ->
      @listenTo(@model, "change", @render)
      
    render: ->
      source = @template.html()
      t = Handlebars.compile(source)
      $(@el).html t( @model.toJSON() )
      @

    publish: (e) ->
      e.preventDefault()
      @model.save published: true

    unpublish: (e) ->
      e.preventDefault()
      @model.save published: false

    translate: (e) ->
      e.preventDefault()
      @model.save duplicate: true 
        .done (model) ->
          window.location = "en/admin/experiences/#{model.id}/edit"