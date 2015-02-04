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
      order = @order_by()
      @collection.fetch reset: true, data: order
      app.pubsub.on("apply:filters", @filterCollection, @)

    filterCollection: (filters) ->
      filters = _.extend({lang: app.lang}, filters)
      @collection.fetch reset: true, data: filters


    order_by: ->
      if app.lang == "en"
        order_by_english: true
      else
        order_by_spanish: true

    paginate: () ->
      @collection.fetch data: offset: offset
    
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
    offset: 20
    events:
      'change .position': 'byPosition'
      'change .country': 'byCountry'
      'change .category': 'byCategory'
      'keyup .query': 'byQuery'
      'submit .search': 'bySearch'

    initialize: ->
      @render()
      @filtersAplied = {lang: app.lang}
      @order_by()
      @$el.data("filtersAplied", @filtersAplied)
      app.pubsub.on("general:scroll", @paginate, @)
      app.pubsub.trigger("filters:showPosition")

    order_by: ->
      if app.lang == "en"
        _.extend(@filtersAplied, order_by_english: true)
      else
        _.extend(@filtersAplied, order_by_spanish: true)
       
    render: ->
      template = app.compile(@template)
      @$el.html(template)
      ppu.appendSelect(@el)

    paginate: ->
      data = _.extend(@filtersAplied, paginate: @offset)
      ppu.lawyers.fetch data: data
      @offset = (@offset+20)

    byPosition: (e) ->
      val = $(e.currentTarget).find('select').val()
      data = _.extend(@filtersAplied,paginate: 0, position: val)
      ppu.lawyers.fetch reset: true, data: data
      
    byCountry: (e) ->
      el = $(e.currentTarget)

      if $(".countries").find('input[type="checkbox"]:checked').length == 2
        data = _.extend(@filtersAplied,paginate: 0,  country: "")
        ppu.lawyers.fetch reset: true, data: data
      else
        if el.find(":not(:checked)")
           value = el.val()
          if value == "Colombia"
            val = "Chile"
          else
            val = "Colombia"
            
          $(".countries").find("input[value='#{val}']").prop('checked', true)
          data = _.extend(@filtersAplied,paginate: 0,  country: val)
          ppu.lawyers.fetch reset: true, data: data          
         
    byCategory: (e) ->
      val = $(e.currentTarget).find('select').val()
      data = _.extend(@filtersAplied,paginate: 0, category: val)
      ppu.lawyers.fetch reset: true, data: data
      
    byQuery: (e) ->
      val = $(e.currentTarget).val()
      if val.length >= 1
        data = _.extend(@filtersAplied,paginate: 0, search: val)
        ppu.lawyers.fetch reset: true, data: data
    
    bySearch: (e) ->
      e.preventDefault()
      val = $(e.currentTarget).find(".query").val()
      data = _.extend(@filtersAplied, paginate: 0, search: val)
      ppu.lawyers.fetch reset: true, data: data

  class ppu.LawyerDetailView extends Backbone.View
    el: $ '#lawyer'
    template: $ '#lawyer-template'
    events:
      "click .share": "openShare"
    
    initialize: ->
      @listenTo(@model, 'change', @render)
      @getTitle()
      @model.fetch()

    getTitle: ->
      $("#top-bar").html $("#lawyer-detail-title").html()

    render: ->
      template = app.compile(@template)
      $(@el).html template( @model.toJSON() )

  class ppu.lawyersRelatedCategory extends Backbone.View
    el: $ "#lawyers-related"
    template: $ ("#lawyer-related-template")

    initialize: ->
      @listenTo(@collection, "reset", @render)
      app.pubsub.bind("lawyers:related", @getRelated, @)

    getRelated: (category) ->
      if app.lang == "en"
        position = "Partner"
      else
        position = "Socio"

      @collection.fetch reset: true, data: lang: app.lang, category: category, position: position

    render: ->
      template = app.compile(@template)
      $("#lawyers-related").html template( @collection.toJSON() )