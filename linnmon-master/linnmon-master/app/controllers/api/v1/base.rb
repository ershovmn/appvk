module Api
  module V1
    class Base < Grape::API
      include Grape::Extensions::Hashie::Mash::ParamBuilder

      mount Api::V1::Users
      mount Api::V1::Utilities
      mount Api::V1::Places
      mount Api::V1::Cart
      mount Api::V1::Matcher
      mount Api::V1::Order
    end
  end
end
