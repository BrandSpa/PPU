class Language < ActiveRecord::Base
  include Lawyerable
  validates :name, presence: true
  validates :name, uniqueness: { :scope => :lawyer_id }
end
