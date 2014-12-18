class Language < ActiveRecord::Base
  include Lawyerable
  validates :name, presence: true
end
