class OrderSerializer < ActiveModel::Serializer
  attributes :id, :restaraunt_id, :status, :tracking, :created_at
end
