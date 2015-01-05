$ ->
	class ppu.Contact extends Backbone.Model
		urlRoot: "/api/contacts"

	class ppu.Contacts extends Backbone.Collection
		url: "/api/contacts"
		model: ppu.Contact

	class ppu.FooterContactCreate extends Backbone.View
		el: $ "#footer"
		events:
			"click .contact-save": "store"
			"keydown .form-control": "removeError"

		initialize: ->
			@listenTo(@model, "sync", @stored)
			@listenTo @model, "error", @renderErrors, @

		store: (e) ->
			e.preventDefault()
			$forms = $(@el).find('form')
			datas = new FormData($forms[0])
			options = ppu.ajaxOptions("POST", datas)
			@model.save(datas, $.extend({}, options))

		stored: (model) ->
			if model
				$(@el).find('form').fadeOut("fast")
				$(@el).find('.form_thanks').removeClass("hidden")



