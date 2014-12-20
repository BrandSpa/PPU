class Post < ActiveRecord::Base

  belongs_to :gallery

  mount_uploader :img_name, PostImageUploader

  scope :by_lang, -> (lang){ where(lang: lang) }
  scope :by_country, -> (country){ where(country: country) }

  validates :date , presence: true
  validates :title, presence: true
  validates :content, presence: true
  validates :title, uniqueness: true
  
  after_create :add_keywords
  before_create :check_slug

  def self.by_slug(slug)
    where(slug: slug) 
  end

  private

     def check_slug
      
    end

    def add_keywords
      model = self
      model.keywords = [self.title, self.content, self.author].join(" ")
      model.save
    end

   
    def add_slug
      title = self.title
      slug = title.gsub(/[ ]/, '-')
      model = self
      model.slug = slug.toLowerCase()
      model.save
    end
  
end
