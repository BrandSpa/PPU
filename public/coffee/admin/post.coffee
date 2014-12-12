$ ->
  class ppu.admin.Post extends Backbone.Model
    urlRoot: '/api/posts'

  class ppu.admin.Posts extends Backbone.Collection
    url: '/api/posts'
    model: ppu.admin.Post

  class ppu.admin.Post extends Backbone.View
    template: $ "#"

    render: ->

  class ppu.admin.Posts extends Backbone.View
    el: $ "#"

    render: ->

  class ppu.admin.PostCreate extends Backbone.View
    el: $ "#post-create"
    template: $ "#post-create-template"
    events: 
      "click button.store": "store"

    render: ->
      source = @template.html()
      template = Handlebars.compile(source)
      @$el.find('.panel-body').html template()
      ppu.appendDatePicker(@el)
      ppu.appendSummernote(@el)

    store: ->
      console.log $(@el).find('.summernote').code()

  class ppu.admin.PostEdit extends Backbone.View
    el: $ "#"

  class ppu.admin.SelectLawyersModal extends Backbone.View
    el: $ "#"
    events: 
      "submit .search": "search"
    render: ->

