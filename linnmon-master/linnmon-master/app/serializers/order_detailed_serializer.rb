class OrderDetailedSerializer < ActiveModel::Serializer
  attributes :id, :restaraunt_id, :status, :tracking, :created_at, :menu_item

  def menu_item
    object.order_items.map do |i|
      OrderItemSerializer.new(i, scope: scope, root: false, event: object)
    end
  end
end
