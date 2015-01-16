class CurriculumMailer < ActionMailer::Base
  default from: "from@example.com"

  def notification(curriculum, to)
    @curriculum = curriculum
    mail(to: to, subject: 'ppulegal Curriculum')
  end
  
end
