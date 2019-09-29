class Foodcourt < ApplicationRecord
  belongs_to :user
  has_many :foodcourt_restaraunts
  has_many :restaraunts, through: :foodcourt_restaraunts

  reverse_geocoded_by :latitude, :longitude
end
