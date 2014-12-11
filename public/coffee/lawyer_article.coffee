$ ->
  class ppu.LawyerArticle extends Backbone.Model
    urlRoot: "/api/articles"

  class ppu.LawyerArticles extends Backbone.Collection
    url: "/api/articles"
    model: ppu.LawyerArticle

  class ppu.LawyerArticleCreate extends Backbone.View
    el: $ "#lawyer-form-article"
    template: $ "#lawyer-article-form-template"
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

  class ppu.LawyerArticlesEditModal extends Backbone.View
    el: $ "#lawyer-article-edit-modal"
    template: $ "#lawyer-article-form-template" 

    _.extend(@.prototype, mixins.lawyerRelationshipModalEdit)

  class ppu.LawyerArticleView extends Backbone.View
    tagName: 'li'
    template: $ '#lawyer-article-template'
    modal: ppu.LawyerArticlesEditModal
    _.extend(@.prototype, mixins.lawyerRelationshipView)

  class ppu.LawyerArticleModalCreate extends Backbone.View
    el: $ "#lawyer-relationship-create-modal"
    template: $ "#lawyer-article-form-template"
    _.extend(@.prototype, mixins.lawyerRelationshipModalCreate)

  class ppu.LawyerArticlesEdit extends Backbone.View
    el: $ "#lawyer-article-edit"
    view: ppu.LawyerArticleView
    modal: ppu.LawyerArticleModalCreate
    _.extend(@.prototype, mixins.lawyerRelationshipViews)

  
      

