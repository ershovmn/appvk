class MenuItemSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :description, :price, :restaraunt_id
  has_one :menu_category

  attribute :photo_url
  def photo_url
    variant = object.photo
    unless variant.attached?
      return nil
    end
    rails_representation_url(variant.variant(combine_options: {  gravity: "center", resize: "100x100^", crop: "100x100+0+0" }), only_path: true)
  end
end
