class CreateRocks < ActiveRecord::Migration[6.1]
  def change
    create_table :rocks do |t|
      t.string :name
      t.string :body
      t.string :eyes
      t.string :mouth

      t.timestamps
    end
  end
end
