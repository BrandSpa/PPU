$ ->
	class ppu.Curriculum extends Backbone.Model
		urlRoot: "/api/curriculums"

	class ppu.Curriculums extends Backbone.Collection
		url: "/api/curriculums"
		model: ppu.Curriculum

	class ppu.CurriculumCreate extends Backbone.View
		el: $ "#work-with-us"
		events: 
			"click .send-cv": "saveCV"

		initialize: ->
			@listenTo(@model, "sync", @stored)

		saveCV: (e) ->
			e.preventDefault()
			$forms = $(@el).find('form')
			datas = new FormData($forms[0])
			options = ppu.ajaxOptions("POST", datas)
			@model.save(datas, $.extend({}, options))

		stored: (model)->
			if model
				$forms = $(@el).find('form')
				$forms.fadeOut()
				
			
