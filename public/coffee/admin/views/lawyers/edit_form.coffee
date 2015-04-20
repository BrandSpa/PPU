$ ->
  class ppu.LawyerEditView extends Backbone.View
    el: $ '.container-lawyer'
    template: $ '#lawyer-template'
    events: 
      'click .open-edit-lawyer': 'openEdit'
      'click .open-share': 'openShare'
      "click .confirm-translate": "confirmTranslate"
      "click .translate": "translate"
    
    initialize: ->
      @listenTo(@model, 'change', @render)
      @listenTo(@model, 'change', @renderCategories)
      app.pubsub.bind("lawyer:translate", @translate, @)

    render: ->
      id = @model.get('id')
      source = @template.html()
      t = Handlebars.compile(source)
      $(@el).html t( @model.toJSON() )
      $("#lawyer-finish").removeClass("hidden")
      ppu.currentLawyerId = id
      
    renderCategories: ->
      source = $("#lawyer-category-template").html()
      t = Handlebars.compile(source)
      $("#lawyer-category-edit").find('ul').html t( @model.toJSON() )

    openEdit: (e) ->
      e.preventDefault()
      view = new ppu.lawyerEdit model: @model
      view.render()

    confirmTranslate: (e)->
      e.preventDefault()
      v = new ppu.lawyerConfirmTranslate
      v.render()

    translate: (e) ->
      @model.save duplicate: true
        .done (mod) ->
          window.location = "/en/admin/lawyers/#{mod.id}/edit"

    openShare: (e) ->
      $('#share-modal').modal()