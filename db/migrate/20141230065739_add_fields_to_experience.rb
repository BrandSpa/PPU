class AddFieldsToExperience < ActiveRecord::Migration
  def change
    add_column :experiences, :excerpt, :text
    add_column :experiences, :keywords, :text
    add_column :experiences, :published, :boolean
  end
end
