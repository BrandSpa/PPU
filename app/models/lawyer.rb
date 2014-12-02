class Lawyer < ActiveRecord::Base
  has_and_belongs_to_many :categories
  has_and_belongs_to_many :trades
  has_and_belongs_to_many :awards
  has_many :educations
  has_many :jobs
  has_many :languages
  has_many :articles
  has_many :phrases
  has_many :institutions
  has_many :recognitions

  validates :name, presence: true
  validates :lastname, presence: true
  validates :lang, presence: true
  validates :position, presence: true

  mount_uploader :img_name, LawyerImgUploader

  after_create :add_keywords

  scope :lang, -> (lang){ where(lang: lang) }
  scope :by_position, -> (position){ where(position: position) }
  scope :by_country, -> (country){ where(country: country) }
  scope :by_category, -> (category){ joins(:categories).where('categories.name' => category ) }
  scope :by_category_id, -> (category){ joins(:categories).where('categories.id' => category ) }
  scope :by_trade, -> (trade){ joins(:trades).where('trades.title' => trade ) }
  scope :by_trade_id, -> (trade){ joins(:trades).where('trades.id' => trade ) }
  scope :search, -> (keyword){ where("keywords LIKE ?", "%#{keyword}%") }


  def self.attach_categories(model, collection)
    if collection.present?
      collection.each do |id|
        category = Category.find(id)
        model.categories << category
        model.save
      end
    end
  end

  def self.attach_trades(model, collection)
    unless collection[0].blank?
      collection.each do |id|
        trade = Trade.find(id)
        model.trades << trade
        model.save
      end
    end
  end

  def self.attach_collection(model, collection)
    collection.each do |model_content|
      new_hash = {}
      new_hash.merge!(model_content)
      model.create(new_hash)
    end
  end

  private
    def add_keywords
      model = self
      model.keywords = [self.name, self.lastname, self.position, self.email, self.phone, self.description].join(" ")
      model.save
    end
end