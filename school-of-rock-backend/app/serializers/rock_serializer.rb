class RockSerializer < ActiveModel::Serializer
  attributes :id, :name, :body, :eyes, :mouth
  has_many :shows

  # you can also include custom methods here that can be serialized into the json!

end
