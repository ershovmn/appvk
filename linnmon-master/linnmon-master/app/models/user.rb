# frozen_string_literal: true

class User < ApplicationRecord
  ROLES = { superadmin: 0, chainadmin: 1, personeel: 2, ordinary: 3 }.freeze
  has_secure_password

  has_many :user_tokens
  has_many :orders

  has_one :matcher_profile

  def cart_items
    CartItem.where(cart_id: Cart.find_by_user_id(id))
  end

  def self.from_vk_token(token)
    vk = VkontakteApi::Client.new('e53196dbe53196dbe53196db0de55c8d9dee531e53196dbb8bfb196631813a421195732')
    info = vk.users.get(user_id: token, fields: %i[id first_name last_name photo_max_orig])[0]

    user = User.where(vk_id: info.id).first_or_create
    user.password = "#{info.first_name} #{info.last_name}#{info.last_name}#{info.last_name}"
    user.name = "#{info.first_name} #{info.last_name}"
    user.login = "vkuser#{info.id}"
    user.vk_id = info.id
    user.photo_url = info.photo_max_orig
    user.role = User::ROLES[:ordinary]
    Cart.find_or_create_by(user_id: user.id)
    user.save!

    user
  end

  def self.with_token(token)
    UserToken.find_by_token!(token).user
  end
end
