class AddLocaleToArticle < ActiveRecord::Migration
  def change
    add_column :articles, :locale, :string
  end
end
