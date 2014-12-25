class Category < ActiveRecord::Base
  has_and_belongs_to_many :lawyers
  has_and_belongs_to_many :posts
  scope :lang, -> (lang){ where(lang: lang) }
end
