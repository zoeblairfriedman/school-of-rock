class Rock < ApplicationRecord
  has_many :shows
  validates_presence_of :name
  validates_presence_of :body
  validates_presence_of :eyes
  validates_presence_of :mouth

end
