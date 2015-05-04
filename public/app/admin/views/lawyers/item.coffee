$ ->
  class ppu.admin.LawyerView extends Backbone.View
    tagName: 'tr'
    template: $ '#lawyer-dashbord-template'
    events: 
      "click .confirm-translate": "confirmTranslate"
      "click .publish": "publish"
      "click .unpublish": "unpublish"

    initialize: ->
      @listenTo(@model, 'change', @render)
      @listenTo(@model, 'error', @showErrors)
      app.pubsub.bind("lawyer:translate", @translate, @)

    render: ->
      source = @template.html()
      t = Handlebars.compile(source)
      $(@el).html t( @model.toJSON() )
      @

    publish: (e) ->
      e.preventDefault()
      @model.save fields: published: true
      id = @model.get('translations').id
      $.ajax url: "/api/lawyers/#{id}", type: 'PUT', data: fields: published: true

    unpublish: (e) ->
      e.preventDefault()
      @model.save fields: published: false
      id = @model.get('translations').id
      $.ajax url: "/api/lawyers/#{id}", type: 'PUT', data: fields: published: false

    confirmTranslate: (e)->
      e.preventDefault()
      console.log v
      v = new ppu.lawyerConfirmTranslate
      v.render()

    translate: (e) ->
      @model.save duplicate: true
        .done (mod) ->
          window.location = "/en/admin/lawyers/#{mod.id}/edit"