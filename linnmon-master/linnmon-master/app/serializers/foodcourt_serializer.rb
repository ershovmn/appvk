class FoodcourtSerializer < ActiveModel::Serializer
  attributes :id, :address, :latitude, :longitude,
             :name, :description, :price_rating
  has_many :restaraunts
end
