class UserToken < ApplicationRecord
  TTL = 24.hours

  belongs_to :user

  before_create :generate_token

  private

  def generate_token
    t = nil
    loop do
      t = SecureRandom.hex(20)
      break t unless UserToken.where(token: token).exists?
    end

    self.token = t
  end
end
