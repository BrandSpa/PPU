class Post < ActiveRecord::Base

  has_and_belongs_to_many :lawyers
  has_and_belongs_to_many :categories
  has_one :translations, class_name: "Post", foreign_key: "translation_id"
  belongs_to :translation, class_name: "Post"
  belongs_to :gallery

  validates :title, presence: true
  validates :content, presence: true
  validates :title, uniqueness: true
  
  scope :by_lang, -> (lang){ where(lang: lang) }
  scope :by_slug, -> (slug){ where(slug: slug) }
  scope :featured, ->{ where.not(featured: nil) }
  scope :published, ->{ where(published: true) }
  scope :not_featured, ->{ where(featured: nil) }
  scope :by_country, -> (country){ where(country: country) }
  scope :get_relationships, -> { includes(:translation, :categories, :lawyers, :gallery) }
  scope :order_featured, -> { order(featured: :asc) }
  scope :order_by_date, -> { order(date: :desc) }

  mount_uploader :img_name, PostImageUploader

  def self.duplicate(model)
    model_new = model.dup
    model_new.lang = "en"
    model_new.translation_id = model.id
    model_new.title = "#{model.title} to translate"
    model_new.save
    model_new
  end
  
  after_create :add_keywords
  before_create :add_date

  private
    def add_keywords
      model = self
      model.excerpt = Sanitize.fragment(self.content)
      model.keywords = [self.title, self.content, self.author].join(" ")
      model.slug = self.title.gsub(/[ ]/, '-').downcase
      model.save
    end

    def add_date
      self.date = Time.now if self.date.blank?
    end

end
