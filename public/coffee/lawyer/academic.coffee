$ ->
  class ppu.LawyerAcademic extends Backbone.Model
    urlRoot: "/api/lawyrs/academics"

  class ppu.LawyerAcademics extends Backbone.Collection
    url: "/api/lawyrs/academics"
    model: ppu.LawyerAcademic

  class ppu.LawyerAcademicCreate extends Backbone.View
    el: $ "#lawyer-form-academic"
    template: $ "#lawyer-academic-form-template"
    events:
      'click .lawyer-add-academic': 'addForm'

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

  class ppu.LawyerAcademicsEditModal extends Backbone.View
    el: $ "#lawyer-academic-edit-modal"
    template: $ "#lawyer-academic-form-template"
    _.extend(@.prototype, mixins.lawyerRelationshipModalEdit)

  class ppu.LawyerAcademicView extends Backbone.View
    tagName: 'li'
    template: $ '#lawyer-academic-template'
    modal: ppu.LawyerAcademicsEditModal
    _.extend(@.prototype, mixins.lawyerRelationshipView)

  class ppu.LawyerAcademicModalCreate extends Backbone.View
    el: $ "#lawyer-relationship-create-modal"
    template: $ "#lawyer-academic-form-template"
    _.extend(@.prototype, mixins.lawyerRelationshipModalCreate)

  class ppu.LawyerAcademicsEdit extends Backbone.View
    el: $ "#lawyer-academic-edit"
    view: ppu.LawyerAcademicView
    modal: ppu.LawyerAcademicModalCreate
    _.extend(@.prototype, mixins.lawyerRelationshipViews)
