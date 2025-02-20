import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { StyledFollow } from '../social/StyledFollow'
import ScrollToTopOnMount from 'components/utils/ScrollToTopOnMount'

const OtherFollowers = props => {
  const {
    userId,
    following,
    followers,
    followAUser,
    unfollowAUser,
    fetchFollowing,
  } = props

  const [isLoading, setIsLoading] = useState(false)
  const [loadingIndex, setLoadingIndex] = useState(null)
  const followingIds = following.map(ele => ele.id)

  const handleFollow = async (friend_id, index) => {
    setIsLoading(true)
    setLoadingIndex(index)
    await followAUser({ user_id: userId, friend_id: friend_id })
    await fetchFollowing(userId)
    setIsLoading(false)
  }

  const handleUnfollow = async (friend_id, index) => {
    setIsLoading(true)
    setLoadingIndex(index)
    await unfollowAUser({ user_id: userId, friend_id: friend_id })
    await fetchFollowing(userId)
    setIsLoading(false)
  }

  const handleClick = (id, index) => {
    return followingIds.includes(id)
      ? handleUnfollow(id, index)
      : handleFollow(id, index)
  }

  const renderSuggestion = (id, index) => {
    if (isLoading && loadingIndex === index) {
      return <button style={{ width: '8.5rem' }}>...</button>
    }
    if (userId === id) {
      return (
        <button style={{ cursor: 'not-allowed', width: '8.5rem' }}>
          It's you!
        </button>
      )
    } else {
      const text = followingIds.includes(id) ? 'Unfollow' : 'Follow'
      return (
        <button
          style={{ width: '8.5rem' }}
          onClick={() => handleClick(id, index)}
        >
          {text}
        </button>
      )
    }
  }

  return (
    <StyledFollow>
      <ScrollToTopOnMount />
      {followers.map((ele, index) => (
        <div key={index}>
          <Link to={`/profile/${ele.id}`}>
            <h2>{ele.username}</h2>
            <img src={ele.profile_picture} alt='fan' />
          </Link>
          {renderSuggestion(ele.id, index)}
          {ele.bio ? <p>{ele.bio}</p> : <p>User has no bio.</p>}
        </div>
      ))}
    </StyledFollow>
  )
}

export default OtherFollowers
