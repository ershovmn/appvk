# frozen_string_literal: true

module Api
  module V1
    class Places < Grape::API
      include Api::V1::Defaults

      resources :places do

        desc 'places around geopoint for radius'
        params do
          requires :lat, type: Float
          requires :lon, type: Float
          requires :radius, type: Integer
        end
        get 'around' do
          require_auth!
          Restaraunt
            .near([params[:lat], params[:lon]], params[:radius], :order => :distance, units: :km)
            .where(is_in_foodcourt: false)
        end

        desc 'foodcourts around geopoint for radius'
        params do
          requires :lat, type: Float
          requires :lon, type: Float
          requires :radius, type: Integer
        end
        get 'footcourts_around' do
          require_auth!
          Foodcourt
            .near([params[:lat], params[:lon]], params[:radius], :order => :distance, units: :km)
        end

        desc 'foodcourt rests'
        params do
          requires :foodcourt_id, type: Integer
        end
        get 'foodcourt_rests' do
          Foodcourt.find(params[:foodcourt_id]).restaraunts
        end

        desc 'get food for restaurant'
        params do
          requires :restaurant_id, type: String
        end

        get 'food' do
          p = params[:restaurant_id].to_s
          if p.include? ','
            p = p.split(/\s*,\s*/)
          else
            p = p.to_i
          end
          MenuItem.where(restaraunt_id: p)
        end




        desc 'rests around geopoint for radius'
        params do
          requires :lat, type: Float
          requires :lon, type: Float
          requires :radius, type: Integer
        end
        get 'raw_around' do
          require_auth!
          {
              kek: Restaraunt
                       .near([params[:lat], params[:lon]], params[:radius], :order => :distance, units: :km)
                       .where(is_in_foodcourt: false)
          }
        end

        desc 'foodcourts around geopoint for radius'
        params do
          requires :lat, type: Float
          requires :lon, type: Float
          requires :radius, type: Integer
        end
        get 'raw_footcourts_around' do
          require_auth!
          {
              kek: Foodcourt
                       .near([params[:lat], params[:lon]], params[:radius], :order => :distance, units: :km)
          }
        end
      end
    end
  end
end

