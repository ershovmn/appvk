class CreateMenuCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :menu_categories do |t|
      t.string :name
      t.references :restaraunt, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
