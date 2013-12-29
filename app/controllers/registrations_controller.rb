class RegistrationsController < Devise::RegistrationsController

  def new
    @companies = Company.all
    super
  end

end 