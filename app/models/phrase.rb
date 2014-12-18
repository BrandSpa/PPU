class Phrase < ActiveRecord::Base
  include Lawyerable
  validates :author, presence: true, unless: :content?
end
