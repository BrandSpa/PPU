class Institution < ActiveRecord::Base
  include Lawyerable
  validates :title, presence: true
end
