class AddSlugToExperience < ActiveRecord::Migration
  def change
    add_column :experiences, :slug, :string
  end
end
