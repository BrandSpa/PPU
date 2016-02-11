class Post < ActiveRecord::Base

  #Relations
  has_and_belongs_to_many :lawyers

  has_and_belongs_to_many :categories

  has_one :translations, class_name: "Post", foreign_key: "translation_id"

  belongs_to :translation, class_name: "Post"

  belongs_to :gallery

  #Validations

  # validate title exists
  validates :title, :presence => {message: "Título no puede estar en blanco"}

  # validate title to be unique
  validates :title, :uniqueness  => {message: "Título ya en uso"}

  # validate content exists
  validates :content, :presence => {message: "Contenido no puede estar en blanco"}

  # Scopes
  #
  # get model by lang
  scope :lang, -> (lang){ where(lang: lang) }

  # paginate models
  scope :paginate, -> (paginate) { limit(21).offset(paginate) }

  # get model by slug
  scope :slug, -> (slug){ where(slug: slug) }

  # order models by data desc
  scope :order_date, -> { order(date: :desc) }

  # get model relationships
  scope :get_relationships, -> { includes(:translation, :translations, :categories, :lawyers, :gallery) }

  #Filters

  # get model by not featured
  scope :not_featured, -> { where(featured: nil) }

  # order by featured asc
  scope :featured_order, -> (val) { order(featured: :asc) }

  # get model by published
  scope :published, -> (val) { where("posts.published = ?", val) }

  # get model by the actual Chile
  scope :the_actual_ch, -> (val) { where("posts.the_actual_ch = ?", val) }

  # get model by the actual Colombia
  scope :the_actual_co, -> (val) { where("posts.the_actual_co = ?", val) }

  # get model by country
  scope :country, -> (country) { where("posts.country = ? OR posts.country = 'Global'", country) }

  # get model by category
  scope :category, -> (category) { includes(:categories).where(categories: {name: category}) }

  # get model by keyword
  scope :keyword, -> (keyword) { where("posts.keywords LIKE ?", "%#{keyword}%") }

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
  before_save :remove_gallery

  private
    def remove_gallery
      if self.img_name
        self.gallery = nil
      end
    end

    # remove html tags from content and passes to excerpt field
    def add_excerpt
      self.excerpt = Sanitize.fragment(self.content).gsub('&amp;','&')
    end

    # convert spaces for dashes in title and passes to slug field
    def add_slug
      self.slug = I18n.transliterate(self.title.downcase.gsub(/[ ]/, '-').gsub(".", '-')).parameterize
    end

    # if not exist date, add current date
    def add_date
      self.date = Time.now if self.date.blank?
    end

    # join title, content and author and passses to keywords field
    def add_keywords
      self.keywords = [self.title, self.content, self.author].join(" ")
    end

end
