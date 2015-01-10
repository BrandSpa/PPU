class AddLocaleToPhrase < ActiveRecord::Migration
  def change
    add_column :phrases, :locale, :string
  end
end
