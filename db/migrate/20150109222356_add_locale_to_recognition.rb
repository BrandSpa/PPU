class AddLocaleToRecognition < ActiveRecord::Migration
  def change
    add_column :recognitions, :locale, :string
  end
end
