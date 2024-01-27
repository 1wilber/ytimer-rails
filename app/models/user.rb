class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable

  has_many :results
  has_one :selected_event
  before_create :create_selected_event

  with_options presence: true do
    validates :name
    validates :username
  end

  private

  def create_selected_event
    self.selected_event = SelectedEvent.create(event: Event.first)
  end
end
