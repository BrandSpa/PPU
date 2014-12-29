class Phrase < ActiveRecord::Base
  include Lawyerable
  validates :author, presence: true, unless: :content?
  validates :content, uniqueness: { :scope => :lawyer_id }
end
