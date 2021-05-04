class ShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :rock_id
  belongs_to :rock
end
