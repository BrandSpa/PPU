class PostsCategories < ActiveRecord::Migration
  def change
    create_table :posts_categories, id: false do |t|
      t.belongs_to :post
      t.belongs_to :category
    end
  end
end
