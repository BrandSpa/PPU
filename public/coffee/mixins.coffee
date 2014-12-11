mixins.lawyerRelationshipView =
  events:
    "click .open-edit": "openEdit"
  initialize: ->
    @listenTo @model, 'change', @render

  render: ->
    source = $(@template).html()
    template = Handlebars.compile(source)
    @$el.html template( @model.toJSON() )
    @$el.append '<a href="#" class="btn btn-info btn-xs open-edit" >Editar</a>'
    @

  openEdit: (e) ->
    e.preventDefault()
    view = new @modal model: @model
    view.render()

mixins.lawyerRelationshipViews =
  events:
    'click .open-modal-create' : 'openCreate'

  initialize: ->
    @listenTo(@collection, 'reset', @renderCollection)
    @listenTo(@collection, 'add', @renderCollection)

  renderCollection: ->
    @$el.find('ul').html('')
    @collection.each (model) ->
      @renderOne(model)
    , @

  renderOne: (model) ->
    view = new  @view model: model
    @$el.find('ul').append( view.render().el )

  openCreate: (e)->
    e.preventDefault()
    lawyer_id = @collection.models[0].get('lawyer_id')
    view = new @modal model: new @collection.model, collection: @collection
    view.render(lawyer_id)

mixins.renderCollection = (collection_name, view_name, data) ->
  collection = new collection_name
  collection.fetch reset: true, data: data
  view =  new view_name collection: collection

mixins.lawyerRelationshipModalCreate =
  events:
    "click .create": "create"
    "click .modal-close": "close"

  initialize: ->
    @listenTo(@model, 'sync', @created)

  render: (lawyer_id) ->
    data = lawyer_id: lawyer_id
    @$el.find('.modal-body').html('')
    source = $(@template).html()
    template = Handlebars.compile(source)
    @$el.find('.modal-body').html template(data)
    $(@el).modal backdrop: 'static'
   
  create: (e) ->
    e.preventDefault()
    el = $(e.currentTarget)
    lawyer_id = el.data('lawyer_id')
    $form = @$el.find('form')
    data = new FormData($form[0])
    @model.save data, $.extend({}, ppu.ajaxOptions("POST", data))

  created: (model) ->
    if model.id
      @collection.add(model)
      @closeModal()

  close: (e) ->
    e.preventDefault()
    @closeModal()


mixins.lawyerRelationshipModalEdit =
  events:
    "click .update": "update"
    "click .modal-close": "close"

  initialize: ->
    @listenTo(@model, 'sync', @updated)

  render: () ->
    @$el.find('.modal-body').html('')
    source = $(@template).html()
    template = Handlebars.compile(source)
    @$el.find('.modal-body').html template( @model.toJSON() )
    $(@el).modal backdrop: 'static'
   
  update: (e) ->
    e.preventDefault()
    $form = @$el.find('form')
    data = new FormData($form[0])
    @model.save data, $.extend({}, ppu.ajaxOptions("PUT", data))

  updated: (model) ->
    if model.id
      @closeModal()

  close: (e) ->
    e.preventDefault()
    @closeModal()