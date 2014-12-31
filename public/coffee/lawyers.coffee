$ ->
  class ppu.Lawyer extends Backbone.Model
    urlRoot: "/api/lawyers"

    fetchBySlug: (slug)->
      @fetch data: $.param slug: slug, locale: app.lang

  class ppu.Lawyers extends Backbone.Collection
    url: "/api/lawyers"
    model: ppu.Lawyer

  class ppu.LawyerView extends Backbone.View
    template: $ '#lawyer-template'
    className: 'col-md-6 col-sm-6 col-xs-12 lawyer-item'
      
    render: ->
      source = @template.html()
      compile = Handlebars.compile(source)
      $(@el).html(compile( @model.toJSON() ))
      @

  class ppu.LawyersView extends Backbone.View
    el: $ '#lawyers'

    initialize: ->
      @listenTo(@collection, 'reset', @render)
      @listenTo(@collection, 'add', @renderOne)
      app.pubsub.bind("general:scroll", @paginate, @)

    paginate: ->
      offset = $(@el).data('offset') || 0
      @collection.fetch data: offset: (offset+15)
      $(@el).data('offset', (offset+15))

    renderOne: (model) ->
      view = new ppu.LawyerView model: model
      $(@el).append view.render().el

    render: ->
      $(@el).html('')
      @collection.each (model) ->
        @renderOne(model)
      , @
      
  class ppu.LawyersFilters extends Backbone.View
    el: $ '#top-bar'
    template: $ "#lawyers-filter"

    events:
      'change .position': 'byPosition'
      'change .country': 'byCountry'
      'change .category': 'byCategory'
      'keydown .query': 'byQuery'

    render: ->
      template = app.compile(@template)
      @$el.html(template)

    byPosition: (e) ->
      val = $(e.currentTarget).find('select').val()
      ppu.lawyers.fetch reset: true, data: position: val
      
    byCountry: (e) ->
      if $(".countries").find('input[type="checkbox"]:checked').length == 2
        ppu.lawyers.fetch reset: true
      else
        val = $(e.currentTarget).val()
        if $(e.currentTarget).is(":checked")
          ppu.lawyers.fetch reset: true, data: country: val
        

    byCategory: (e) ->
      val = $(e.currentTarget).find('select').val()
      ppu.lawyers.fetch reset: true, data: category: val

    byQuery: (e) ->
      val = $(e.currentTarget).val()
      if val.length >= 3
        ppu.lawyers.fetch reset: true, data: keyword: val
        

  class ppu.LawyerDetailView extends Backbone.View
    el: $ '#lawyer'
    template: $ '#lawyer-template'
    
    initialize: ->
      @listenTo(@collection, 'reset', @render)

    render: ->
      @collection.each (model) ->
        template = app.compile(@template)
        $(@el).html template( model.toJSON() )
      , @
