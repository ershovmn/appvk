class AddIsLikedToMatcherSelections < ActiveRecord::Migration[6.0]
  def change
    add_column :matcher_selections, :is_liked, :boolean
  end
end
