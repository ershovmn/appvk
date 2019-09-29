class CreateCuisines < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :login
      t.integer :role
      t.string :password_digest

      t.timestamps
    end

    create_table :user_tokens do |t|
      t.string :token
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    add_column :users, :vk_id, :integer
    create_table :cuisines do |t|
      t.string :name
      t.boolean :is_junk

      t.timestamps
    end
  end
end
