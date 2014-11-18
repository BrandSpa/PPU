class CreateJobs < ActiveRecord::Migration
  def change
    create_table :jobs do |t|
      t.belongs_to :lawyer, index: true
      t.string :title
      t.string :from
      t.string :until

      t.timestamps
    end
  end
end
