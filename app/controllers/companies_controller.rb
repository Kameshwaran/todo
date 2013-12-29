class CompaniesController < ApplicationController
	def new
		@company = Company.new
	end

	def create
		if Company.add(company_params)
			render text: "<p>Company added Successfully. Go the SignUp page Reload it once.</p>"
		else
			render 'new'
		end
	end

	def show

		@company = current_user.company;
		
		@categories = Category.all

	end

	private
		def company_params
			params.require(:company).permit(:name,:address,:phoneno)
		end
end
