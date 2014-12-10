$ ->
  class ppu.LawyerEducation extends Backbone.Model
    url: "/api/educations"

  class ppu.LawyerEducations extends Backbone.Collection
    url: "/api/educations"
    model: ppu.LawyerEducation

  class ppu.LawyerEducationCreate extends Backbone.View
    el: $ "#lawyer-form-education"
    template: $ "#lawyer-form-education-template"
    events: 
      'click .lawyer-add-education': 'addForm'

    initialize: ->
      @appendForm()

    appendForm: ->
      ppu.appendForm(@el, @template)

     addForm: (e) ->
      e.preventDefault()
      @appendForm()

    store: (lawyer_id) ->
      ppu.saveMultipeForms(@el, @model, lawyer_id)

  class ppu.LawyerEducationView extends Backbone.View
    tagName: 'li'
    template: $ '#lawyer-education-template'
   
    _.extend(@.prototype, mixins.lawyerRelationshipView)

  class ppu.LawyerEducationsEdit extends Backbone.View
    el: $ "#lawyer-education-edit"
    view: ppu.LawyerEducationView
    
    _.extend(@.prototype, mixins.lawyerRelationshipViews)
    