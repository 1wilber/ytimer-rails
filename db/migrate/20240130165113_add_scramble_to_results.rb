class AddScrambleToResults < ActiveRecord::Migration[7.1]
  def change
    add_column :results, :scramble, :string
  end
end
