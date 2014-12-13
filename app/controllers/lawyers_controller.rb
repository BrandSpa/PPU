class LawyersController < ApplicationController
  def index
  end

  def show

  end

  def vcard
    model = by_id
    vcard = VCardigan.create
    vcard.name model.lastname, model.name
    vcard.fullname "#{model.name} #{model.lastname}"
    vcard.org "Philipi Prietocarrizosa &Uria"
    vcard.tel model.phone, :type => 'work'
    vcard.email model.email, :type => ['work', 'internet'], :preferred => 1
    #render plain: vcard
    send_data vcard, :filename => "#{model.name} #{model.lastname}.vcf", :type => 'text/x-vcard'
  end

  def by_name
    lang = params[:lang] || "es"
    name = I18n.transliterate(params[:name])
    firstname = name.split('-').first
    lastname = name.split('-').last
    Lawyer.lang(lang).by_name(firstname, lastname).first
  end

  def by_id
    lang = params[:lang] || "es"
    Lawyer.lang(lang).find(params[:id])
  end
end
