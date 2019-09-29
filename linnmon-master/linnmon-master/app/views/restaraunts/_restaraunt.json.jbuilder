json.extract! restaraunt, :id, :address, :latitude, :longitude, :cuisine_id, :name, :description, :price_rating, :user_id, :created_at, :updated_at
json.url restaraunt_url(restaraunt, format: :json)
