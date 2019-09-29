class Restaraunt < ApplicationRecord
  has_one :cuisine
  belongs_to :user

  has_many :menu_categories
  has_many :menu_items

  reverse_geocoded_by :latitude, :longitude

  def cuisine
    Cuisine.find(id)
  end

  def foodcourt

  end
end
