class Category < ActiveRecord::Base
  has_and_belongs_to_many :lawyers
  scope :lang, -> (lang){ where(lang: lang) }
end
