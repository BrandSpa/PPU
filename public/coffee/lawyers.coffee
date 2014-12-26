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

    render: ->
      $(@el).html('')
      @collection.each (model) ->
        view = new ppu.LawyerView model: model
        $(@el).append(view.render().el).hide().fadeIn('slow')
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
      val = $(e.currentTarget).val()
      ppu.lawyers.fetch reset: true, data: position: val
      
    byCountry: (e) ->
      val = $(e.currentTarget).val()
      ppu.lawyers.fetch reset: true, data: country: val

    byCategory: (e) ->
      val = $(e.currentTarget).val()
      ppu.lawyers.fetch reset: true, data: category: val

    byQuery: (e) ->
      val = $(e.currentTarget).val()
      if val.length > 3
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
