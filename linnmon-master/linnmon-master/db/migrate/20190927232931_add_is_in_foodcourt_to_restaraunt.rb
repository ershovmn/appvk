class AddIsInFoodcourtToRestaraunt < ActiveRecord::Migration[6.0]
  def change
    add_column :restaraunts, :is_in_foodcourt, :boolean
  end
end
