class AddRestToOrders < ActiveRecord::Migration[6.0]
  def change
    add_reference :orders, :restaraunt, null: false, foreign_key: true
  end
end
