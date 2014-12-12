class LawyersController < ApplicationController
  def index
  end

  def show
    lang = params[:lang] || "es"
    name = I18n.transliterate(params[:name])
    firstname = name.split('-').first
    lastname = name.split('-').last
    lawyer = Lawyer.lang(lang).by_name(firstname, lastname).first

    vcard = VCardigan.create
    vcard.name lawyer.lastname, lawyer.name
    vcard.fullname lawyer.name
    vcard.org "Philipi Prietocarrizosa &Uria"
    vcard.tel lawyer.phone, :type => 'work'
    vcard.email lawyer.email, :type => ['work', 'internet'], :preferred => 1

    send_data vcard, :filename => "#{firstname}-#{lastname}.vcf", :type => 'text/x-vcard'
  end
end
