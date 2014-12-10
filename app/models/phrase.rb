class Phrase < ActiveRecord::Base
  include Lawyerable
  validates :content, length: { minimum: 3 }
end
