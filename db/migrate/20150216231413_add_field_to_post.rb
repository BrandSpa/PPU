class AddFieldToPost < ActiveRecord::Migration
  def change
    add_column :posts, :social_published, :boolean
  end
end
