class AddImgNameToExperience < ActiveRecord::Migration
  def change
    add_column :experiences, :img_name, :string
  end
end
