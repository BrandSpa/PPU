$ ->
	class ppu.FooterContactCreate extends Backbone.View
		el: $ "#footer"
		events:
			"click .contact-save": "store"
			"keydown .form-control": "removeError"

		initialize: ->
			@listenTo(@model, "sync", @stored)
			@listenTo @model, "error", @renderErrors, @
			ppu.appendSelect(@el)

		store: (e) ->
			e.preventDefault()
			$forms = $(@el).find('form')
			datas = new FormData($forms[0])
			options = ppu.ajaxOptions("POST", datas)
			@model.save(datas, $.extend({}, options))

		stored: (model) ->
			if model
				$(@el).find('form').fadeOut("fast")
				$(@el).find('.social').css("margin", 0)
				$(@el).find('.form_thanks').removeClass("hidden")




