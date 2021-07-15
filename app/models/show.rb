class Show < ApplicationRecord
  belongs_to :rock
  validates_presence_of :name
end
