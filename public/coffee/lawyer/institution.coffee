$ ->
  class ppu.LawyerInstitution extends Backbone.Model
    urlRoot: "/api/lawyrs/institutions"

  class ppu.LawyerInstitutions extends Backbone.Collection
    url: "/api/lawyrs/institutions"
    model: ppu.LawyerInstitution

  class ppu.LawyerInstitutionCreate extends Backbone.View
    el: $ "#lawyer-form-institution"
    template: $ "#lawyer-form-institution-template"
    events: 
      'click .lawyer-add-institution': 'addForm'

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

  class ppu.LawyerInstitutionsEditModal extends Backbone.View
    el: $ "#lawyer-institution-edit-modal"
    template: $ "#lawyer-form-institution-template" 
    _.extend(@.prototype, mixins.lawyerRelationshipModalEdit)

  class ppu.LawyerInstitutionView extends Backbone.View
    tagName: 'li'
    template: $ '#lawyer-institution-template'
    modal: ppu.LawyerInstitutionsEditModal

    _.extend(@.prototype, mixins.lawyerRelationshipView)

  class ppu.LawyerInstitutionModalCreate extends Backbone.View
    el: $ "#lawyer-relationship-create-modal"
    template: $ "#lawyer-form-institution-template"
    _.extend(@.prototype, mixins.lawyerRelationshipModalCreate)

  class ppu.LawyerInstitutionsEdit extends Backbone.View
    el: $ "#lawyer-institution-edit"
    view: ppu.LawyerInstitutionView
    modal: ppu.LawyerInstitutionModalCreate
    _.extend(@.prototype, mixins.lawyerRelationshipViews)