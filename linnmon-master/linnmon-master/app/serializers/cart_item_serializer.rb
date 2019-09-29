class CartItemSerializer < ActiveModel::Serializer
  attributes :id, :amount
  has_one :cart
  has_one :menu_item
end
