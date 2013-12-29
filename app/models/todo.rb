class Todo < ActiveRecord::Base
  belongs_to :category
  def self.add(hash)
  	todo = Todo.new(hash)
  	if todo.save
  		todo
  	else
  		false
  	end
  end

  def delete
  	todo = Todo.find(self.id)
  	if todo.destroy
  		todo
  	else
  		false
  	end
  end

  def change!
  	todo = Todo.find(self.id)
  	todo.status = todo.status ? false : true;
  	todo.save
  	todo
  end

end
