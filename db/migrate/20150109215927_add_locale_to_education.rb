class AddLocaleToEducation < ActiveRecord::Migration
  def change
    add_column :educations, :locale, :string
  end
end
