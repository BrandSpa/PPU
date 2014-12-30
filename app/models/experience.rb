class Experience < ActiveRecord::Base
	has_one :translations, class_name: "Experience", foreign_key: "translation_id"
  belongs_to :translation, class_name: "Experience"
  has_and_belongs_to_many :categories
  has_and_belongs_to_many :lawyers
  belongs_to :gallery

	mount_uploader :img_name, ExperienceImgUploader

  scope :by_lang, -> (lang){ where(lang: lang) }
  scope :by_slug, -> (slug){ where(slug: slug) }
  scope :with_relationships, ->{ includes(:gallery, :translations, :categories, :lawyers) }

	def self.duplicate(model)
    model_new = model.dup
    model_new.lang = "en"
    model_new.translation_id = model.id
    model_new.remote_img_name_url = model.img_name.url if model.img_name.present?
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
      model.keywords = [self.title, self.content, self.company_name].join(" ")
      model.slug = self.title.gsub(/[ ]/, '-').downcase
      model.save
    end

    def add_date
      self.date = Time.now if self.date.blank?
    end
end
