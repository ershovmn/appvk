class CreateRestaraunts < ActiveRecord::Migration[6.0]
  def change
    create_table :restaraunts do |t|
      t.string :address
      t.float :latitude
      t.float :longitude
      t.references :cuisine, null: false, foreign_key: true
      t.string :name
      t.text :description
      t.integer :price_rating
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
