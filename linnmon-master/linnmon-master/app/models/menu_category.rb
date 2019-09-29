class MenuCategory < ApplicationRecord
  belongs_to :restaraunt
  belongs_to :user

  has_many :menu_items
end
