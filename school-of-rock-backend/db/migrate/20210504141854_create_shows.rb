class CreateShows < ActiveRecord::Migration[6.1]
  def change
    create_table :shows do |t|
      t.string :name
      t.belongs_to :rock, null: false, foreign_key: true

      t.timestamps
    end
  end
end
