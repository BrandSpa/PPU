$ ->
	class ppu.Seo extends Backbone.View
		el: $ "#ppu"
		template: $ "#seo-template"

		initialize: ->
			app.pubsub.bind("seo:render", @render, @)

		render: (data) ->
			console.log data