class AddPhotoUrlToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :photo_url, :text
  end
end
