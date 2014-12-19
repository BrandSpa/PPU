class Post < ActiveRecord::Base

  belongs_to :gallery

  mount_uploader :img_name, PostImageUploader

  scope :by_lang, -> (lang){ where(lang: lang) }
  scope :by_country, -> (country){ where(country: country) }
  scope :by_slug, -> (slug){ where(slug: slug) }

  after_create :add_keywords
  after_create :add_slug

  private
    def add_keywords
      model = self
      model.keywords = [self.title, self.content, self.author].join(" ")
      model.save
    end

    def add_slug
      slug = self.title.replace(/\s+/g, '-').toLowerCase()
      self.by_slug(slug).count

      if slug > 0
        model = self
        model.slug = slug
        model.save
      end
    end
  
end
