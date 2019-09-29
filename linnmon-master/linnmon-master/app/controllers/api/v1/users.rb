# frozen_string_literal: true

module Api
  module V1
    class Users < Grape::API
      include Api::V1::Defaults

      resource :users do
        desc 'get token for vk user'
        params do
          requires :id, type: String
        end
        get 'from_vk_id', root: :users do
          token = params[:id]
          user = User.from_vk_token(token)

          unless [User::ROLES[:ordinary]].include? user.role
          raise Linnmon::Errors::AuthNotAllowedError
          end

          {
              token: user.user_tokens
                         .where('created_at < ?', Time.now.utc + UserToken::TTL)
                         .first_or_create.token,
              created_at: user.created_at
          }
        end

        desc 'all orders by user'
        get 'orders' do
          require_auth!
          ::Order.where(user_id: @current_user.id).order(updated_at: :desc)
        end
      end
    end
  end
end
