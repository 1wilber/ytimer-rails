class CreateSelectedEvents < ActiveRecord::Migration[7.1]
  def change
    create_table :selected_events do |t|
      t.references :event, null: false, foreign_key: true
      t.references :user, index: { unique: true }, null: false, foreign_key: true

      t.timestamps
    end
  end
end
