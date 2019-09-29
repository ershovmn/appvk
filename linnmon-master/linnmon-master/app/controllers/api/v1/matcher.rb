# frozen_string_literal: true

module Api
  module V1
    class Matcher < Grape::API
      include Api::V1::Defaults

      resource :matcher do
        desc 'set account preference'
        params do
          requires :looking_for, type: Integer
        end
        get 'set_preference' do
          # 0 is men
          # 1 is women
          require_auth!
          mp = MatcherProfile.find_or_create_by(user: @current_user)
          mp.update(looking_for: params[:looking_for])
          mp
        end

        desc 'get matcher profile for current user'
        get 'profile' do
          require_auth!
          @current_user.matcher_profile
        end

        desc 'matcher queue'
        get 'queue' do
          require_auth!
          @current_user.matcher_profile&.queue
        end

        desc 'commit action like or dislike'
        params do
          requires :action, type: String
          requires :matchee_id, type: Integer
        end
        get 'commit' do
          require_auth!
          if params[:action] == 'like'
            @current_user.matcher_profile.likes(MatcherProfile.find(params[:matchee_id]))
          else
            @current_user.matcher_profile.dislikes(MatcherProfile.find(params[:matchee_id]))
          end
        end

        desc 'get all matches'
        get 'mutual' do
          require_auth!
          unless @current_user.matcher_profile.nil?
            ids = []
            MatcherSelection.find_by_sql("SELECT A.* FROM matcher_selections AS A
JOIN matcher_selections AS B ON A.matchee_id = B.matcher_profile_id AND B.matchee_id = A.matcher_profile_id
WHERE A.is_liked IS TRUE AND (A.matchee_id = #{@current_user.matcher_profile.id} OR A.matcher_profile_id = #{@current_user.matcher_profile.id})").each do |i|
              if i.matchee_id != @current_user.matcher_profile.id
                ids << i.matchee_id
              elsif i.matcher_profile_id != @current_user.matcher_profile.id
                ids << i.matcher_profile_id
              end
            end
            MatcherProfile.find(ids)
          end
        end
      end
    end
  end
end

