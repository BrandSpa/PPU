class LawyersTransactions < ActiveRecord::Migration
  def change
    create_table :lawyers_transactions, id: false do |t|
      t.belongs_to :lawyer
      t.belongs_to :transaction
    end
  end
end
