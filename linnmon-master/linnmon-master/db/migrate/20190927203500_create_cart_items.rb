class CreateCartItems < ActiveRecord::Migration[6.0]
  def change
    create_table :cart_items do |t|
      t.references :cart, null: false, foreign_key: true
      t.references :menu_item, null: false, foreign_key: true
      t.integer :amount

      t.timestamps
    end
  end
end
