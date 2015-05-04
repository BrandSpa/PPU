class ContactMailer < ActionMailer::Base
  default from: "no-replay@ppulegal.com"

  def notification(contact, to)
    @contact = contact
    mail(to: to, subject: 'ppulegal Contacto')
  end
  
end
