class Result < ApplicationRecord
  default_scope { order(created_at: :desc) }
  belongs_to :event
  belongs_to :user

  with_options presence: true do
    validates :time
    validates :scramble
    validates :event
  end
end
