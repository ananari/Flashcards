class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.string :front
      t.string :back
      t.integer :deck_id

      t.timestamps
    end
  end
end
