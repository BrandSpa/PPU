$ ->
  class ppu.admin.Post extends Backbone.Model
    urlRoot: '/api/posts'

  class ppu.admin.Posts extends Backbone.Collection
    url: '/api/posts'
    model: ppu.admin.Post

  class ppu.admin.PostView extends Backbone.View
    template: $ "#"

    render: ->

  class ppu.admin.PostsView extends Backbone.View
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
      console.log @model
      $form = @$el.find('form')
      content = $(@el).find('.summernote').code()
      data = new FormData($form[0])
      data.append("post[content]", content)
      options = ppu.ajaxOptions("POST", data)
      @model.save data, $.extend({}, options)

  class ppu.admin.PostEdit extends Backbone.View
    el: $ "#"

  class ppu.admin.SelectLawyersModal extends Backbone.View
    el: $ "#"
    template: "#lawyer-select"
    events: 
      "submit .search": "search"

    render: ->
      @$el.find('.modal-body').html app.compileTemplate(@template)
      @$el.modal()
      @

    search:  (e) ->
      query = $(e.currentTarget).val()
      @collection.fetch data: query: query


  class ppu.admin.galleryModal extends Backbone.View 
    el: $ "#gallery-modal"
    template: "#gallery-template"

    render: ->
      @$el.find('.modal-body').html app.compileTemplate(@template)
      @$el.modal()
      @



