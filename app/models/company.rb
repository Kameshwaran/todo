class Company < ActiveRecord::Base
	
	has_many :users
	has_many :categories

	validates :name,:address,:phoneno ,presence: true

	def self.add(hash)
		company = Company.new(hash)
		if company.save
			true
		else
			false
		end
	end

end
