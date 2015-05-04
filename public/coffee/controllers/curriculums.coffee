ppu.curriculumsController = {
  index: ->
    ppu.curriculum = new ppu.Curriculum
    ppu.curriculumCreate = new ppu.CurriculumCreate model: ppu.curriculum
}
