class OrderItemSerializer < ActiveModel::Serializer
  attributes :id
  has_one :menu_item
end
