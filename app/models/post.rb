class Post < ActiveRecord::Base
  has_and_belongs_to_many :lawyers
  has_and_belongs_to_many :categories
  has_one :translations, class_name: "Post", foreign_key: "translation_id"
  belongs_to :translation, class_name: "Post"
  belongs_to :gallery
  
  mount_uploader :img_name, PostImageUploader

  scope :by_lang, -> (lang){ where(lang: lang) }
  scope :featured, ->{ where.not(featured: nil) }
  scope :not_featured, ->{ where(featured: nil) }
  scope :by_country, -> (country){ where(country: country) }
  scope :get_relationships, -> { includes(:translation, :categories, :lawyers, :gallery) }

  validates :title, presence: true
  validates :content, presence: true
  validates :title, uniqueness: true
  
  after_create :add_keywords
  after_create :add_slug

  def self.by_slug(slug)
    where(slug: slug) 
  end

  private
    def add_keywords
      model = self
      model.excerpt = self.content
      model.keywords = [self.title, self.content, self.author].join(" ")
      
      model.save
    end

    def add_slug
      model = self
      t = self.title.gsub(/[ ]/, '-')
      model.slug = t.downcase
      model.save
    end

end
