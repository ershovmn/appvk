# frozen_string_literal: true

module Api
  module V1
    class Utilities < Grape::API
      include Api::V1::Defaults

      resources :utilities do

        desc 'get city bounds for current user'
        params do
          requires :lat, type: Float
          requires :lon, type: Float
        end
        get 'bounds' do
          require_auth!
          {
            city: 'Санкт-Петербург',
            bounds: [59.838, 29.511, 60.056, 30.829]
          }
        end

        desc 'get filters'
        get 'filters' do
          require_auth!
          {
              cuisine: {
                  type: "select",
                  title: "Кухня",
                  items: Cuisine.all
              },
              price_tag: {
                  type: "slider",
                  title: "Ценовой диапазон",
                  items: [[50, 200], [200, 500], [500, 1000], [1000, 1000000]]
              }
          }
        end
      end
    end
  end
end
