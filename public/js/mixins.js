mixins.lawyerRelationshipView = {
  events: {
    "click .open-edit": "openEdit"
  },
  render: function() {
    var source, template;
    source = $(this.template).html();
    template = Handlebars.compile(source);
    this.$el.html(template(this.model.toJSON()));
    this.$el.append('<a href="#" class="btn btn-info btn-xs open-edit" >Editar</a>');
    return this;
  },
  openEdit: function(e) {
    e.preventDefault();
    return console.log(this.model);
  }
};

mixins.lawyerRelationshipViews = {
  initialize: function() {
    return this.listenTo(this.collection, 'reset', this.renderCollection);
  },
  renderOne: function(model) {
    var view;
    view = new this.view({
      model: model
    });
    return this.$el.find('ul').append(view.render().el);
  }
};

mixins.renderCollection = function(collection_name, view_name, data) {
  var collection, view;
  collection = new collection_name;
  collection.fetch({
    reset: true,
    data: data
  });
  return view = new view_name({
    collection: collection
  });
};
