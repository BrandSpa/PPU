class Lawyer < ActiveRecord::Base
  has_and_belongs_to_many :categories
  has_and_belongs_to_many :trades
  has_many :educations
  has_many :jobs
  has_many :languages
  has_many :awards
  has_many :articles
  has_many :phrases
  has_many :institutions
  has_many :recognitions

  after_create :add_keywords

  scope :lang, -> (lang){ where(lang: lang) }
  scope :by_position, -> (position){ where(position: position) }
  scope :by_country, -> (country){ where(country: country) }
  scope :by_category, -> (category){ joins(:categories).where('categories.name' => category ) }
  scope :by_category_id, -> (category){ joins(:categories).where('categories.id' => category ) }
  scope :by_trade, -> (trade){ joins(:trades).where('trades.title' => trade ) }
  scope :by_trade_id, -> (trade){ joins(:trades).where('trades.id' => trade ) }
  scope :search, -> (keyword){ where("keywords LIKE ?", "%#{keyword}%") }

  private
    def add_keywords
      model = self
      model.keywords = [self.name, self.lastname, self.position, self.email, self.phone, self.description].join(" ")
      model.save
    end
end
