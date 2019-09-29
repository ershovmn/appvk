class MatcherProfileSerializer < ActiveModel::Serializer
  attributes :id, :looking_for
  has_one :user
end
