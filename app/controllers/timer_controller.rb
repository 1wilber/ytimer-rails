class TimerController < ApplicationController
  layout "timer"
  before_action :authenticate_user!

  def index
    @result = Result.new
  end
end
