class Post < ActiveRecord::Base

  has_and_belongs_to_many :lawyers
  has_and_belongs_to_many :categories
  has_one :translations, class_name: "Post", foreign_key: "translation_id"
  belongs_to :translation, class_name: "Post"
  belongs_to :gallery

  validates :title, presence: true
  validates :content, presence: true
  validates :title, uniqueness: true
  
  scope :lang, -> (lang){ where(lang: lang) }
  scope :slug, -> (slug){ where(slug: slug) }
  scope :featured, -> { where.not(featured: nil) }
  scope :is_featured, -> (val) { where(featured: val) }
  scope :published, -> { where(published: true) }
  scope :not_featured, -> { where(featured: nil) }
  scope :country, -> (country){ where("posts.country = ? OR posts.country = 'Global'", country) }
  scope :category, -> (category){ includes(:categories).where(categories: {name: category}) }
  scope :keyword, -> (keyword){ where("posts.keywords LIKE ?", "%#{keyword}%") }
  scope :get_relationships, -> { includes(:translation,:translations, :categories, :lawyers, :gallery) }
  scope :order_featured, -> { order(featured: :asc) }
  scope :order_date, -> { order(date: :desc) }


  mount_uploader :img_name, PostImageUploader

  def self.duplicate(model)
    model_new = model.dup
    model_new.lang = "en"
    model_new.translation_id = model.id
    model_new.remote_img_name_url = model.img_name.url if model.img_name.present?
    model_new.title = "#{model.title} to translate"
    model_new.save
    duplicate_lawyers(model_new, model.lawyers) unless model.lawyers.blank?
    model_new
  end

  def self.duplicate_lawyers(model, collection)
    collection.each do |mdl|
      model.lawyers << mdl
    end
  end
  
  before_save :add_date
  before_save :add_excerpt
  before_save :add_slug
  before_save :add_keywords

  private
    def add_excerpt
      self.excerpt = Sanitize.fragment(self.content)
    end

    def add_slug
      self.slug = I18n.transliterate(self.title.downcase.gsub(/[ ]/, '-').gsub(".", '-')).parameterize
    end

    def add_date
      self.date = Time.now if self.date.blank?
    end

    def add_keywords
      self.keywords = [self.title, self.content, self.author].join(" ")
    end

end
