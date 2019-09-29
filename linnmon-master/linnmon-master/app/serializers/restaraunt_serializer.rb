class RestarauntSerializer < ActiveModel::Serializer
  attributes :id, :address, :latitude, :longitude, :name, :description, :price_rating
  has_one :cuisine
end
