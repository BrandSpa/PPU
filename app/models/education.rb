class Education < ActiveRecord::Base
  include Lawyerable
  validates :title, length: { minimum: 3 }
end
