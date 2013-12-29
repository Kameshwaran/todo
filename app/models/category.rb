class Category < ActiveRecord::Base
  belongs_to :company
  has_many :todos

  def self.add(hash)
  	category = Category.new(hash)
  	if !Category.all.pluck("name").include? hash[:name]
	  	if category.save
	  		category
	  	else
	  		false
	  	end
  	else
  		false
  	end
  end
end
