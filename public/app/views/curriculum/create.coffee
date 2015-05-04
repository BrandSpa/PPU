$ ->
	class ppu.CurriculumCreate extends Backbone.View
		el: $ "#work-with-us"

		events:
			"click .send-cv": "store"

		initialize: ->
			@listenTo(@model, "sync", @stored)
			@listenTo @model, "error", @renderErrors, @

		store: (e) ->
			e.preventDefault()
			$forms = $(@el).find('form')
			datas = new FormData($forms[0])
			options = ppu.ajaxOptions("POST", datas)
			@model.save(datas, $.extend({}, options))

		renderTitle: ->
			title = $("#work-with-title-template").html()
			$("#top-bar").html title

		stored: (model)->
			if model
				$forms = $(@el).find('form').fadeOut()
				$(@el).find(".form_thanks").removeClass("hidden")
