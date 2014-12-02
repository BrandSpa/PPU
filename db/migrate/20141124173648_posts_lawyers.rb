class PostsLawyers < ActiveRecord::Migration
  def change
    create_table :posts_lawyers, id: false do |t|
      t.belongs_to :post
      t.belongs_to :lawyer
    end
  end
end
