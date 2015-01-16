class CurriculumMailer < ActionMailer::Base
  default from: "no-replay@ppulegal.com"

  def notification(curriculum, to)
    @curriculum = curriculum
    mail(to: to, subject: 'ppulegal Curriculum')
  end
  
end
