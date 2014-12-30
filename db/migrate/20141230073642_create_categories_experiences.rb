class CreateCategoriesExperiences < ActiveRecord::Migration
  def change
    create_table :categories_experiences do |t|
      t.references :category, index: true
      t.references :experience, index: true
    end
  end
end
