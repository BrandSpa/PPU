class Post < ActiveRecord::Base

  #Relations
  has_and_belongs_to_many :lawyers
  has_and_belongs_to_many :categories
  has_one :translations, class_name: "Post", foreign_key: "translation_id"
  belongs_to :translation, class_name: "Post"
  belongs_to :gallery

  #Validations

  # validate title exists
  validates :title, presence: true

  # validate content exists
  validates :content, presence: true

  # validate title to be unique
  validates :title, uniqueness: true

  # Scopes

  # get model by lang
  scope :lang, -> (lang){ where(lang: lang) }

  # get model by slug
  scope :slug, -> (slug){ where(slug: slug) }

  # paginate models
  scope :paginate, -> (paginate) { limit(21).offset(paginate) }

  # get model by featured
  scope :featured, -> { where.not(featured: nil) }

  # get model by not featured
  scope :not_featured, -> { where(featured: nil) }

  # order models by featured asc
  scope :with_featured, -> { order(featured: :asc) }

  # get model by featured index
  scope :is_featured, -> (val) { where(featured: val) }

  # order by featured asc
  scope :order_featured, -> { order(featured: :asc) }

  # get model by published
  scope :published, -> { where("posts.published = true") }

  # get model by the actual Chile
  scope :the_actual, -> { where(the_actual: true) }

  # get models without the actual Chile
  scope :without_the_actual, ->{ where("posts.the_actual = 0 OR posts.the_actual IS NULL") }

  # get model by the actual Colombia
  scope :the_actual, -> { where(the_actual: true) }

  # get models without the actual Colombia
  scope :without_the_actual, ->{ where("posts.the_actual = 0 OR posts.the_actual IS NULL") }

  # get model by country
  scope :country, -> (country){ where("posts.country = ? OR posts.country = 'Global'", country) }

  # get model by category
  scope :category, -> (category){ includes(:categories).where(categories: {name: category}) }

  # get model by keyword
  scope :keyword, -> (keyword){ where("posts.keywords LIKE ?", "%#{keyword}%") }

  # get model relationships
  scope :get_relationships, -> { includes(:translation,:translations, :categories, :lawyers, :gallery) }

  # order model by data desc
  scope :order_date, -> { order(date: :desc) }

  # get models without models ids
  scope :without, -> (id) {where.not(id: id) }

  # carrierwave
  mount_uploader :img_name, PostImageUploader

  # Duplicate model
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

  # Duplicate model lawyers
  def self.duplicate_lawyers(model, collection)
    collection.each do |mdl|
      model.lawyers << mdl
    end
  end

  # Events
  before_save :add_date
  before_save :add_excerpt
  before_save :add_slug
  before_save :add_keywords

  private

    # remove from content html tags
    def add_excerpt
      self.excerpt = Sanitize.fragment(self.content)
    end

    # convert spaces for dashes in title and passes to slug field
    def add_slug
      self.slug = I18n.transliterate(self.title.downcase.gsub(/[ ]/, '-').gsub(".", '-')).parameterize
    end

    # if not exist date add current date
    def add_date
      self.date = Time.now if self.date.blank?
    end

    # join title, content and author and passses to keywords field
    def add_keywords
      self.keywords = [self.title, self.content, self.author].join(" ")
    end

end
