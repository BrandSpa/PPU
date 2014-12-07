$ ->
  class ppu.LawyerArticle extends Backbone.Model
    urlRoot: "/api/articles"

  class ppu.LawyerArticles extends Backbone.Collection
    url: "/api/articles"
    model: ppu.LawyerArticle

  class ppu.LawyerArticleCreate extends Backbone.View
    el: $ "#lawyer-article-form"
    template: $ "#lawyer-form-article-template"
    events: 
      'click .lawyer-add-article': 'addForm'

    initialize: ->
      @appendForm()

    appendForm: ->
      ppu.appendForm(@el, @template)

    addForm: (e) ->
      e.preventDefault()
      @appendForm()

    store: (lawyer_id) ->
      ppu.saveMultipeForms(@el, @model, lawyer_id)