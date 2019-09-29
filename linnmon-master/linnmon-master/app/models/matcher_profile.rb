class MatcherProfile < ApplicationRecord
  belongs_to :user

  def queue
    bad_ids = MatcherSelection.where(matcher_profile_id: id).pluck(:matchee_id).to_a
    MatcherProfile.where(looking_for: looking_for == 0 ? 1 : 0).where.not(id: [bad_ids, id].flatten).order('random()')
  end

  def likes(matcher_profile)
    MatcherSelection.create_or_find_by(matcher_profile_id: id, matchee_id: matcher_profile.id, is_liked: true)
    Rails.cache.delete("matcherqueuefor:#{id}")
    if MatcherSelection.where(matcher_profile_id: matcher_profile.id, matchee_id: id).blank?
      :it_sucks
    else
      :mutual
    end
  end

  def dislikes(matcher_profile)
    MatcherSelection.create_or_find_by(matcher_profile_id: id, matchee_id: matcher_profile.id, is_liked: false)
  end
end
