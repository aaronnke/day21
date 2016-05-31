class CreateFish < ActiveRecord::Migration
  def change
    create_table :fish do |t|
      t.integer :user_id 
      t.string :name
      t.string :goal
      t.string :state 
      t.integer :fed
      t.integer :growth 
      t.timestamps null: false 
    end 
  end 
end 
