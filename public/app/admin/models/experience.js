ppu.Experience = (function(superClass) {
  extend(Experience, superClass);

  function Experience() {
    return Experience.__super__.constructor.apply(this, arguments);
  }

  Experience.prototype.urlRoot = "/api/experiences";

  return Experience;
})(Backbone.Model);

ppu.Experiences = (function(superClass) {
  extend(Experiences, superClass);

  function Experiences() {
    return Experiences.__super__.constructor.apply(this, arguments);
  }

  Experiences.prototype.url = "/api/experiences";

  Experiences.prototype.model = ppu.Experience;

  return Experiences;
})(Backbone.Collection);
