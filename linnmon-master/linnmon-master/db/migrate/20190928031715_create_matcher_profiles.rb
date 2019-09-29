class CreateMatcherProfiles < ActiveRecord::Migration[6.0]
  def change
    create_table :matcher_profiles do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :looking_for

      t.timestamps
    end
  end
end
