class CreatePoststranslations < ActiveRecord::Migration
  def self.up
   Post.create_translation_table!({
    :title => :string,
    :content => :text,
    :keywords => :text
    })
  end
  
end
