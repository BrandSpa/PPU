class Lawyer < ActiveRecord::Base
  has_and_belongs_to_many :categories
  has_many :educations
  has_many :jobs
  has_many :languages
  has_many :awards
  after_create :add_keywords
  scope :lang, -> (lang){ where(lang: lang) }
  scope :by_position, -> (position){ where(position: position) }
  scope :by_country, -> (country){ where(country: country) }
  scope :by_category, -> (category){ joins(:categories).where('categories.name' => category ) }
  scope :search, -> (keyword){ where("keywords LIKE ?", "%#{keyword}%") }

  private
    def add_keywords
      model = self
      model.keywords = [self.name, self.lastname, self.position, self.email, self.phone, self.description].join(" ")
      model.save
    end
end
