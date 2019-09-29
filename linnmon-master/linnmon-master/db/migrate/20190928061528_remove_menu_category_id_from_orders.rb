class RemoveMenuCategoryIdFromOrders < ActiveRecord::Migration[6.0]
  def change
    remove_reference :orders, :menu_category, index:true, foreign_key: true
  end
end
