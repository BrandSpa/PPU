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
    className: 'lawyer-list'
      
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
    el: $ '#lawyers-filters'
    events:
      'change .position': 'byPosition'
      'change .country': 'byCountry'
      'change .category': 'byCategory'
      'submit .search': 'byQuery'

    byPosition: (e) ->
      val = $(e.currentTarget).val()
      position = el.val()
      ppu.lawyers.fetch reset: true, data: position: val
      
    byCountry: (e) ->
      val = $(e.currentTarget).val()
      ppu.lawyers.fetch reset: true, data: country: val

    byCategory: (e) ->
      val = $(e.currentTarget).val()
      ppu.lawyers.fetch reset: true, data: category: val

  class ppu.LawyerDetailView extends Backbone.View
    el: $ '#lawyer-detail'
    template: $ '#lawyer-show-template'
    
    initialize: ->
      @listenTo(@model, 'change', @render)

    render: ->
      source = @template.html()
      compile = Handlebars.compile(source)
      $(@el).html t( @model.toJSON() )
