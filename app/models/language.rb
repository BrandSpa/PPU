class Language < ActiveRecord::Base
  include Lawyerable
  validates :name, length: { minimum: 3 }
end
