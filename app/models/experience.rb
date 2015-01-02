class Experience < ActiveRecord::Base
	has_one :translations, class_name: "Experience", foreign_key: "translation_id"
  belongs_to :translation, class_name: "Experience"
  has_and_belongs_to_many :categories
  has_and_belongs_to_many :lawyers
  belongs_to :gallery

	mount_uploader :img_name, ExperienceImgUploader

  scope :by_lang, -> (lang){ where(lang: lang) }
  scope :by_slug, -> (slug){ where(slug: slug) }
  scope :by_country, -> (country){ where(country: country) }
  scope :search, -> (keyword){ where("keywords LIKE ?", "%#{keyword}%") }
  scope :by_category, -> (category){ includes(:categories).where(categories: {name: category}) }
  scope :with_relationships, ->{ includes(:gallery, :translations, :categories, :lawyers) }

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
      self.slug = self.title.downcase.gsub(/[ ]/, '-')
    end

    def add_date
      self.date = Time.now if self.date.blank?
    end

    def add_keywords
      self.keywords = [self.title, self.content, self.company_name].join(" ")
    end
end
