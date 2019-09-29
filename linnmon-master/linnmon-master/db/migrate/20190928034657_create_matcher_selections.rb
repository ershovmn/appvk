class CreateMatcherSelections < ActiveRecord::Migration[6.0]
  def change
    create_table :matcher_selections do |t|
      t.references :matcher_profile, null: false, foreign_key: true
      t.references :matchee, foreign_key: {to_table: :matcher_profiles}

      t.timestamps
    end
  end
end
