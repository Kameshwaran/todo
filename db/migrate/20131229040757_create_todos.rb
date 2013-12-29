class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string :name
      t.boolean :status
      t.references :category, index: true

      t.timestamps
    end
  end
end
