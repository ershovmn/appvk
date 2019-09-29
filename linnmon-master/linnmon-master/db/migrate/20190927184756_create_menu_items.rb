class CreateMenuItems < ActiveRecord::Migration[6.0]
  def change
    create_table :menu_items do |t|
      t.string :name
      t.text :description
      t.references :menu_item, null: false, foreign_key: true
      t.references :restaraunt, null: false, foreign_key: true

      t.timestamps
    end
  end
end
