class Trade < ActiveRecord::Base
  has_and_belongs_to_many :lawyers
  scope :lang, -> (lang){ where(lang: lang) }
  scope :search, -> (keyword){ where("keywords LIKE ?", "%#{keyword}%") }

  private
    def add_keywords
      model = self
      model.keywords = [self.name, self.lastname, self.position, self.email, self.phone, self.description].join(" ")
      model.save
    end
end
