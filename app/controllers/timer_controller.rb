class TimerController < ApplicationController
  layout "timer"
  before_action :authenticate_user!

  def index
  end
end
