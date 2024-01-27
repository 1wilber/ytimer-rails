class CreateEvents < ActiveRecord::Migration[7.1]
  def change
    create_table :events do |t|
      t.string :name

      t.timestamps
    end

    add_index :events, :name, unique: true
  end
end
