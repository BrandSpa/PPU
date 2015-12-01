class LawyersController < ApplicationController

  def index
  end

  def show
    slug = params[:id]
    @lawyer = Lawyer.find_by(slug: slug)
  end

  # export vcard from lawyer
  def vcard
    id = params[:id]
    model = Lawyer.find(id)
    vcard = VCardigan.create

    vcard.name model.lastname, model.name
    vcard.fullname "#{model.name} #{model.lastname}"
    vcard.org "Philipi Prietocarrizosa &Uría"
    vcard.tel model.phone, :type => 'work'

    vcard.email model.email,
      :type => ['work', 'internet'],
      :preferred => 1

    send_data vcard.to_s.encode("iso-8859-1"),
      :filename => "#{model.name}-#{model.lastname}.vcf",
      :type => 'text/csv; charset=iso-8859-1'
  end

  def by_name
    lang = params[:lang] || "es"
    name = I18n.transliterate(params[:name])
    firstname = name.split('-').first
    lastname = name.split('-').last
    Lawyer.lang(lang).by_name(firstname, lastname).first
  end

  def by_id
    Lawyer.find(params[:id])
  end

end
