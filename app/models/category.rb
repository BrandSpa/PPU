class Category < ActiveRecord::Base

	#Relationships
	has_one :translations, class_name: "Category", foreign_key: "translation_id"

  belongs_to :translation, class_name: "Category"

  has_and_belongs_to_many :lawyers, -> { order "lastname ASC" }

  has_and_belongs_to_many :posts

  has_and_belongs_to_many :experiences, -> { order "date DESC" }

  belongs_to :gallery

	# Scopes
  scope :lang, -> (lang){ where(lang: lang) }

end
