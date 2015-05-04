ppu.ExperiencesController = {

  index: ->
    ppu.experiencesFilters = new ppu.ExperiencesFilters
    ppu.experiencesFilters.render()
    ppu.experiences = new ppu.Experiences
    ppu.experiences.fetch reset: true
    ppu.experiencesView = new ppu.ExperiencesView collection: ppu.experiences

  show: (slug) ->
    ppu.experiencesFilters = new ppu.ExperiencesFilters
    ppu.experiencesFilters.render()
    ppu.experiences = new ppu.Experiences
    ppu.experiences.fetch reset: true
    ppu.experiencesView = new ppu.ExperiencesView collection: ppu.experiences

    ppu.filtersMobile = new ppu.FiltersMobile
}
