class CreateFoodcourtRestaraunts < ActiveRecord::Migration[6.0]
  def change
    create_table :foodcourt_restaraunts do |t|
      t.references :foodcourt, null: false, foreign_key: true
      t.references :restaraunt, null: false, foreign_key: true

      t.timestamps
    end
  end
end
