$ ->
  class ppu.LawyerEducation extends Backbone.Model
    urlRoot: "/api/lawyrs/educations"

  class ppu.LawyerEducations extends Backbone.Collection
    url: "/api/lawyrs/educations"
    model: ppu.LawyerEducation

  class ppu.LawyerEducationCreate extends Backbone.View
    el: $ "#lawyer-form-education"
    template: $ "#lawyer-form-education-template"
    events: 
      'click .lawyer-add-education': 'addForm'

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

  class ppu.LawyerEducationModalCreate extends Backbone.View
    el: $ "#lawyer-relationship-create-modal"
    template: $ "#lawyer-form-education-template"
    _.extend(@.prototype, mixins.lawyerRelationshipModalCreate)

  class ppu.LawyerEducationEditModal extends Backbone.View
    el: $ "#lawyer-education-edit-modal"
    template: $ "#lawyer-form-education-template" 

    _.extend(@.prototype, mixins.lawyerRelationshipModalEdit)

  class ppu.LawyerEducationView extends Backbone.View
    tagName: 'li'
    template: $ '#lawyer-education-template'
    modal: ppu.LawyerEducationEditModal
    _.extend(@.prototype, mixins.lawyerRelationshipView)

  class ppu.LawyerEducationsEdit extends Backbone.View
    el: $ "#lawyer-education-edit"
    view: ppu.LawyerEducationView
    modal: ppu.LawyerEducationModalCreate
    _.extend(@.prototype, mixins.lawyerRelationshipViews)
    