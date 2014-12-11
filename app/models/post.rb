class Post < ActiveRecord::Base
  scope :by_lang, -> (lang){ where(lang: lang) }
  scope :by_country, -> (country){ where(country: country) }
end
