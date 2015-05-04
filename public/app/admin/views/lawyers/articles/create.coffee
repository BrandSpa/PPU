$ ->
  class ppu.LawyerArticleCreate extends Backbone.View
    el: $ "#lawyer-form-article"
    template: $ "#lawyer-article-form-template"
    events: 
      'click .lawyer-add-article': 'addForm'

    initialize: ->
      @appendForm()
      app.pubsub.bind('lawyer:stored', @store, @)

    appendForm: ->
      ppu.appendForm(@el, @template)

    addForm: (e) ->
      e.preventDefault()
      @appendForm()

    store: (data) ->
      ppu.saveMultipeForms(@el, @model, data.id)