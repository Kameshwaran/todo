class TodosController < ApplicationController
	def create
		todo = Todo.add(todo_params)
		if todo
			response = {:todo=>todo,:status=>"success"}
		else
			response = {:todo=>todo,:status=>"Error"}
		end
		render json: response
	end

	def remove

		todo = Todo.find(params[:id])
		if todo.delete
			response = {:todo=>todo,:status=> "success"}
		else
			response = {:status=> "Error"}
		end
		render json: response
	end

	def change_status

		todo = Todo.find(params[:id])
		todo = todo.change!
		response = {:todo=>todo,:status=> "success"}
		render json: response
		
	end

	private

	def todo_params
		params.permit(:name,:category_id,:status)
	end
end
