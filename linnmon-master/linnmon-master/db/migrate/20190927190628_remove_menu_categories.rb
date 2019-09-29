class RemoveMenuCategories < ActiveRecord::Migration[6.0]
  def change
    remove_column :menu_items, :menu_item_id
    add_reference :menu_items, :menu_category, index: true, foreign_key: true
  end
end
