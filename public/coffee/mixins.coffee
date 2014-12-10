mixins.lawyerRelationshipView =
  events:
    "click .open-edit": "openEdit"

  render: ->
    source = $(@template).html()
    template = Handlebars.compile(source)
    @$el.html template( @model.toJSON() )
    @$el.append '<a href="#" class="btn btn-info btn-xs open-edit" >Editar</a>'
    @

  openEdit: (e) ->
    e.preventDefault()
    console.log @model

mixins.lawyerRelationshipViews =
  initialize: ->
      @listenTo(@collection, 'reset', @renderCollection)

  renderOne: (model) ->
    view = new  @view model: model
    @$el.find('ul').append( view.render().el )

mixins.renderCollection = (collection_name, view_name, data) ->
  collection = new collection_name
  collection.fetch reset: true, data: data
  view =  new view_name collection: collection