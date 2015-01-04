class Lawyer < ActiveRecord::Base
  has_one :translations, class_name: "Lawyer", foreign_key: "translation_id"
  belongs_to :translation, class_name: "Lawyer"
  has_and_belongs_to_many :categories
  has_and_belongs_to_many :trades
  has_and_belongs_to_many :posts
  has_many :awards
  has_many :academics
  has_many :educations
  has_many :jobs
  has_many :languages
  has_many :articles
  has_many :phrases
  has_many :institutions
  has_many :recognitions


  validates :name, presence: true
  validates :lastname, presence: true
  validates :position, presence: true
  validates :email, presence: true

  mount_uploader :img_name, LawyerImgUploader

  after_create :add_keywords
  after_create :add_slug
  
  scope :relationships, -> { includes( :academics, :articles, :awards, :educations, :institutions, :jobs, :languages, :phrases, :recognitions, :categories) }
  scope :relationships_for_list, -> { includes(:categories, :translations) }
  scope :order_list, -> { order({lastname: :asc, position: :asc}) }
  scope :lang, -> (lang){ where(lang: lang) }
  scope :by_position, -> (position){ where(position: position) }
  scope :by_slug, -> (slug){ where(slug: slug) }
  scope :by_country, -> (country){ where(country: country) }
  scope :by_category, -> (category){ includes(:categories).where(categories: {name: category}) }
  scope :by_trade, -> (trade){ joins(:trades).where('trades.title' => trade ) }
  scope :by_trade_id, -> (trade){ joins(:trades).where('trades.id' => trade ) }
  scope :search, -> (keyword){ where("keywords LIKE ?", "%#{keyword}%") }
  scope :by_name, -> (firstname, lastname){  where("name LIKE ? AND lastname LIKE ?", "%#{firstname}%", "%#{lastname}%") }
  scope :has_translation, -> (slug) { where(slug: slug).count }
  scope 'paginate', -> (offset) { limit(20).offset(offset).order('position DESC') }

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

  def self.translate_position(position)
    if position == "Abogado"
      "Lawyer" 
    elsif position == "Socio" 
      "Partner"
    elsif position == "Especialista"
      "Specialist"
    else
      "Senior Counsel"
    end
  end

  def self.duplicate(model)
    model_new = model.dup
    model_new.position = translate_position(model.position)
    model_new.lang = "en"
    model_new.translation_id = model.id
    model_new.remote_img_name_url = model.img_name.url if model.img_name.present?
    model_new.save
    id = model_new.id
    duplicate_relationship(model.educations, id)
    duplicate_relationship(model.jobs, id)
    duplicate_relationship(model.recognitions, id)
    duplicate_relationship(model.academics, id)
    duplicate_relationship(model.institutions, id)
    duplicate_relationship(model.phrases, id)
    duplicate_with_image(model.awards, id)
    duplicate_with_file(model.articles, id)
    model_new
  end

   def self.duplicate_relationship(collection, id)
    collection.each do |model|
      model_new = model.dup
      model_new.lawyer_id = id
      model_new.save
    end
  end

  def self.duplicate_with_image(collection, id)
    collection.each do |model|
      model_new = model.dup
      model_new.lawyer_id = id
      model_new.remote_img_name_url = model.img_name.url
      model_new.save
    end
  end

  def self.duplicate_with_file(collection, id)
    collection.each do |model|
      model_new = model.dup
      model_new.lawyer_id = id
      model_new.remote_file_name_url = model.file_name.url if model.file_name.url
      model_new.save
    end
  end

  private
    def add_keywords()
      model = self
      model.keywords = [self.name, self.lastname, self.position, self.email, self.phone, self.description].join(" ")
      model.save
    end

    def add_slug
      model = self
      if self.email
        model.slug = self.email.split('@')[0]
        model.save
      end
    end
end