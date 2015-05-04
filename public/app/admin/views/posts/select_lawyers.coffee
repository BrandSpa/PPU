$ ->
  class ppu.admin.PostSelectLawyers extends Backbone.View
    el: $ "#"
    template: "#lawyer-select"
    events: 
      "submit .search": "search"

    render: ->
      @$el.find('.modal-body').html app.compileTemplate(@template)
      @$el.modal()
      @

    search:  (e) ->
      query = $(e.currentTarget).val()
      @collection.fetch data: query: query