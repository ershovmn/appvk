json.extract! foodcourt, :id, :address, :latitude, :longitude, :name, :description, :price_rating, :user_id, :created_at, :updated_at
json.url foodcourt_url(foodcourt, format: :json)
