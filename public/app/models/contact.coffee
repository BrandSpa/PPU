class ppu.Contact extends Backbone.Model
  urlRoot: "/api/contacts"

class ppu.Contacts extends Backbone.Collection
  url: "/api/contacts"
  model: ppu.Contact