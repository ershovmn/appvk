class MenuItem < ApplicationRecord
  include ActiveModel::Serialization
  belongs_to :menu_category
  belongs_to :restaraunt

  has_one_attached :photo
end
