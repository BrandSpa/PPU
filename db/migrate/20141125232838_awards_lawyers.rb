class AwardsLawyers < ActiveRecord::Migration
  def change
    create_table :awards_lawyers, id: false do |t|
      t.belongs_to :award
      t.belongs_to :lawyer
      t.string :subtitle
    end
  end
end
