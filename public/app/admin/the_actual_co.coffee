$ ->
  class ppu.admin.TheActualCoView extends Backbone.View
    template: $ '#the-actual-admin-template'
    tagName: 'tr'
    events:
      "click .publish": "publish"
      "click .unpublish": "unpublish"
      "click .change-featured": "changeFeatured"
      "click .publish-on-social-network": "publishFb"
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
      @model.save fields: published: true

    publishFb: (e)->
      e.preventDefault()
      url = setSubdomain(@model.get('lang')) + "posts/#{@model.get('slug')}"
      published = openShare(url)

    unpublish: (e) ->
      e.preventDefault()
      @model.save fields: published: false

    translate: (e) ->
      e.preventDefault()
      id = @model.id
      $.post "/api/posts/#{id}/duplicate"
      .done (model) ->
        window.location = "/en/admin/the-actual/#{model.id}/edit"

    changeFeatured: (e) ->
      el = $(e.currentTarget).find('input').val()
      app.pubsub.trigger('post:changeFeatured', el)
      @model.save fields: featured: el

  class ppu.admin.TheActualCoViews extends Backbone.View
    el: $ "#posts-dasboard"

    initialize: ->
      @listenTo(@collection, 'reset', @render)
      @listenTo(@collection, 'add', @addOne, @)
      app.pubsub.on("posts:filter", @filterCollection, @)
      app.pubsub.on("post:changeFeatured", @changeFeatured, @)
      app.pubsub.on('post:unfeatured', @unfeatured, @)

    filterCollection: (filters) ->
      @collection.fetch reset: true, lang: app.lang, data: filters

    unfeatured: ->
      @collection.fetch reset: true

    changeFeatured: (val) ->
      coll = new ppu.Posts
      @collection.fetch add: false, data: is_featured: val
        .done (models) ->
          coll.add models

    addOne: (model) ->
      view = new ppu.admin.TheActualView model: model
      $(@el).find('thead').append view.render().el

    render: ->
      $(@el).find('tbody').html('')
      @collection.each (model) ->
        view = new ppu.admin.TheActualView model: model
        $(@el).find('tbody').append view.render().el
      , @
