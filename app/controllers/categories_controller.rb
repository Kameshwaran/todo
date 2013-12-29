class CategoriesController < ApplicationController
	def create
		category = Category.add(category_params)
		if category
			response = {:category=>category,:status=>"Sucesss" }
		else
			response = {:category=>Category.find_by(name: category_params[:name]),:status=>"Already exists"}
		end
		render json: response
	end
	private

	def category_params
		params.permit(:name,:company_id)
	end
end
