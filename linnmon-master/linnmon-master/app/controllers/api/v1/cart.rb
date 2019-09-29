# frozen_string_literal: true

require "#{Rails.root}/app/serializers/cart_item_serializer"

module Api
  module V1
    class Cart < Grape::API
      include Api::V1::Defaults

      resources :cart do

        desc 'add item to a cart'
        params do
          requires :menu_item_id, type: Integer
        end
        get 'push' do
          require_auth!
          {
              is_saved: CartItem.create(cart: ::Cart.find_or_create_by(user_id: @current_user.id), menu_item_id: params[:menu_item_id]).save!
          }
        end

        desc 'all items in cart'
        get 'view' do
          require_auth!
          @current_user.cart_items.joins(:menu_item)
        end

        desc 'remove item from cart or clean cart'
        params do
          optional :menu_item_id, type: Integer
        end
        get 'clean' do
          require_auth!
          if params[:menu_item_id].nil?
            @current_user.cart_items.destroy_all
          else
            @current_user.cart_items.where(menu_item_id: params[:menu_item_id])
          end
          @current_user.cart_items.joins(:menu_item)
        end

        desc 'complete order in cart'
        get 'complete' do
          # 0 created
          # 1 paid
          # 2 noticed
          # 3 started
          # 4 ready
          require_auth!
          ca2 = {}
          ca = @current_user.cart_items.joins(:menu_item)
          ca.each do |t|
            ca2[t.menu_item.restaraunt_id] = []
          end
          ca.each do |t|
            ca2[t.menu_item.restaraunt_id].push(t)
          end

          if ca.empty?
            render(error: 'empty cart')
          else
            track = rand(1000..9999)
            orders = []
            ca2.each do |k,v|
              order = ::Order.create(user_id: @current_user.id, status: 0, tracking: track, restaraunt_id: k)
              order.save
              v.each do |item|
                ::OrderItem.create(order_id: order.id, menu_item: item.menu_item)
              end
              orders << order
            end

            ca.destroy_all
            orders
          end
        end
      end
    end
  end
end

