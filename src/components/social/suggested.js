import React from 'react';
import { connect } from 'react-redux';
import {
  followAUser,
  unfollowAUser,
  getUserFollowing,
  getUserProfileDetails,
  recommendedFollow,
} from '../../actions';

const Suggested = props => {
  const {
    userId,
    suggested,
    followAUser,
    unfollowAUser,
    getUserFollowing,
    getUserProfileDetails,
    recommendedFollow,
  } = props;

  const handleFollow = async friend_id => {
    await followAUser({ user_id: userId, friend_id: friend_id });
    recommendedFollow(userId);
    getUserFollowing(userId);
    getUserProfileDetails(userId);
  };

  return (
    <ul>
      {suggested.map((ele, index) => (
        <div style={{ outline: '1px solid salmon' }} key={index}>
          <li>{ele.username}</li>
          <img src={ele.image} />
          <p>{ele.user}</p>
          <p>Followed by {ele.followed_by_username}</p>
          <p>From {ele.location}</p>
          <button onClick={() => handleFollow(ele.recommended_follow_id)}>
            Follow
          </button>
        </div>
      ))}
    </ul>
  );
};

export default connect(
  null,
  {
    followAUser,
    unfollowAUser,
    getUserFollowing,
    getUserProfileDetails,
    recommendedFollow,
  }
)(Suggested);
