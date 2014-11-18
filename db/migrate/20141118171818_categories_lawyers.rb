class CategoriesLawyers < ActiveRecord::Migration
  def change
    create_table :categories_lawyers, id: false do |t|
      t.belongs_to :category
      t.belongs_to :lawyer
    end
  end
end
