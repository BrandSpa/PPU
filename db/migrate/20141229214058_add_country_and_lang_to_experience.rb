class AddCountryAndLangToExperience < ActiveRecord::Migration
  def change
    add_column :experiences, :lang, :string, default: "es"
    add_column :experiences, :country, :string
  end
end
