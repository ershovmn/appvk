class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.references :user, null: false, foreign_key: true
      t.references :menu_category, null: false, foreign_key: true
      t.boolean :is_paid
      t.integer :status

      t.timestamps
    end
  end
end
