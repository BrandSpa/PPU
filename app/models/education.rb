class Education < ActiveRecord::Base
  include Lawyerable
  validates :title, presence: true, unless: :institution?
end
