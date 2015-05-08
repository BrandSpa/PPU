$ ->
  class ppu.admin.ExperienceEdit extends Backbone.View
    el: $ "#experience-edit"
    template: $ "#experience-create-template"
    events:
      "click button.update": "update"
      "click .open-gallery": "openGallery"
      "keydown input[name='query']": "searchLawyer"
      "change .form-control": "removeError"
      "keydown .form-control": "removeError"

    initialize: ->
      @listenTo(@model, 'change', @render)
      @listenTo(@model, 'error', @renderExperienceErrors, @)
      @listenTo(@model, 'sync', @updated, @)
      app.pubsub.bind('gallery:selected', @appendSelectedGallery, @)

    render: ->
      source = @template.html()
      template = Handlebars.compile(source)
      @$el.find('.panel-body').html template( @model.toJSON() )
      @addDataPicker()
      ppu.appendSummernote(@el)
      @getCategories()
      @showLawyers()

    addDataPicker: ->
      $(@el).find('.datepicker').datepicker
        format: 'dd/mm/yyyy'
        language: 'es'
        autoclose: true


    update: (e) ->
      e.preventDefault()
      $form = @$el.find('form')
      content = $(@el).find('.summernote').code()
      data = new FormData($form[0])
      data.append("fields[content]", content)
      options = ppu.ajaxOptions("PUT", data)
      @model.save data, $.extend({}, options)
        .done (model) ->
          if model
            window.location = "/dashboard"

    getCategories: ->
      ppu.categories = new ppu.Categories
      el = @$el
      categories = @model.get('categories')
      ppu.categories.fetch(data: locale: app.lang).done (collection) ->
        source = $('#lawyer-categories-template').html()
        template = Handlebars.compile(source)
        $('#categories-checkbox').html template( collection )
        _.each categories, (category) ->
          $(el).find("#categories-checkbox input[value='#{category.id}']").attr("checked", "checked")

    showLawyers: ->
      lawyers = @model.get('lawyers')
      _.each lawyers, (lawyer) ->
        view = new ppu.admin.ExperienceLawyersSelected
        view.renderObject(lawyer)

    openGallery: (e) ->
      e.preventDefault()
      ppu.admin.galleryExperienceModal = new ppu.admin.GalleryExperienceModal collection: ppu.admin.galleries
      ppu.admin.galleryExperienceModal.render()

    appendSelectedGallery: (gallery_id) ->
      $(@el).find('.gallery_id').val(gallery_id)
      ppu.admin.galleryExperienceModal.closeModal()

    searchLawyer: (e) ->
      query = $(e.currentTarget).val()
      if query.length > 3
        collection = new ppu.Lawyers
        ppu.admin.ExperienceLawyersSelect = new ppu.admin.ExperienceLawyersSelect collection: collection
        ppu.admin.ExperienceLawyersSelect.search(query)
