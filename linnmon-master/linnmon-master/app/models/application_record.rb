class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  def select_without *columns

  end
end
