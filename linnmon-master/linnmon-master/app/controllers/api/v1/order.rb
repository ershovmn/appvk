# frozen_string_literal: true

module Api
  module V1
    class Order < Grape::API
      include Api::V1::Defaults

      resources :order do

        desc 'details for order'
        params do
          requires :id, type: Integer
        end
        get 'detailed', serializer: OrderDetailedSerializer do
          require_auth!
          @current_user.orders.find(params[:id])
        end
      end
    end
  end
end

