class CartItem < ApplicationRecord
  include ActiveModel::Serialization
  belongs_to :cart
  belongs_to :menu_item
end
