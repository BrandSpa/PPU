ppu.ExperiencesController = {

  index: ->
      ppu.experience = new ppu.Experience id: slug
      ppu.experience.fetch()
      ppu.experienceDetailView = new ppu.ExperienceDetailView model: ppu.experience
      ppu.experiences = new ppu.Experiences
      ppu.experienecesRelated = new ppu.ExperienecesRelated collection: ppu.experiences

  show: (slug) ->
    ppu.experiencesFilters = new ppu.ExperiencesFilters
    ppu.experiencesFilters.render()
    ppu.experiences = new ppu.Experiences
    ppu.experiences.fetch reset: true
    ppu.experiencesView = new ppu.ExperiencesView collection: ppu.experiences

    ppu.filtersMobile = new ppu.FiltersMobile
}
