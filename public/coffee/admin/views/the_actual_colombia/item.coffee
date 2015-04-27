$ ->
  class ppu.admin.TheActualColombiaView extends Backbone.View
    template: $ '#the-actual-admin-template'
    tagName: 'tr'
    events: 
      "click .publish": "publish"
      "click .unpublish": "unpublish"
      "click .change-featured": "changeFeatured"
      "click .publish-on-social-network": "publishFb"
      "click .highlight": "highlight"
      "click .unhighlight": "unhighlight"

    initialize: ->
      @listenTo(@model, "change", @render)
      
    render: ->
      source = @template.html()
      t = Handlebars.compile(source)
      $(@el).html t( @model.toJSON() )
      @

    publish: (e) ->
      e.preventDefault()
      @model.save fields: published: true

    highlight: (e) ->
      e.preventDefault()
      that = @
      that.model.save fields: featured: 3, the_actual: true
      .done () ->
        app.pubsub.trigger('post:unfeatured')
     
    publishFb: (e)-> 
      e.preventDefault()
      url = setSubdomain(@model.get('lang')) + "posts/#{@model.get('slug')}"
      published = openShare(url)

    unpublish: (e) ->
      e.preventDefault()
      @model.save fields: published: false

    translate: (e) ->
      e.preventDefault()
      @model.save duplicate: true 
        .done (model) ->
          window.location = "en/admin/posts/#{model.id}/edit"

    changeFeatured: (e) ->
      el = $(e.currentTarget).find('input').val()
      app.pubsub.trigger('post:changeFeatured', el)
      @model.save fields: featured: el