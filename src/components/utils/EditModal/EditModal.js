import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { useAlert } from 'react-alert'
import { editCollection } from 'actions'
import useLockBodyScroll from 'hooks/useLockBodyScroll'
import deleteIcon from 'assets/svg/delete-icon.svg'
import { StyledEditModal } from './StyledEditModal'

const EditModal = props => {
  const alert = useAlert()
  const [description, setDescription] = useState(props.post.description)
  const [postUrl, setPostUrl] = useState(props.post.post_url)
  const [title, setTitle] = useState(props.post.title)

  useLockBodyScroll()

  const onSubmit = async e => {
    e.preventDefault()

    const { id } = props.post

    const collection = {
      id: id,
      post_url: postUrl,
      description,
      title,
    }
    // action creator
    props.editCollection(collection).then(() => {
      props.handleModalOpen()
      alert.success('Bookmark Updated')
    })
  }

  return (
    <Wrapper
      style={{
        display: props.open ? 'block' : 'none',
      }}
      onClick={props.handleModalOpen}
    >
      <form
        className='edit-form'
        onSubmit={onSubmit}
        onClick={e => e.stopPropagation()}
      >
        <span onClick={props.handleModalOpen} className='close-modal-x'>
          <img src={deleteIcon} alt='' />
        </span>
        <div className='form-title'>
          <h3>Edit Bookmark</h3>
        </div>
        <label htmlFor='Post Url'>Title</label>
        <input
          type='text'
          value={title}
          name='title'
          onChange={e => setTitle(e.target.value)}
        />
        <label htmlFor='Post Url'>Url</label>
        <input
          type='text'
          value={postUrl}
          name='post_url'
          onChange={e => setPostUrl(e.target.value)}
        />
        <label htmlFor='Post Description'>Description</label>
        <textarea
          name='description'
          id='post-description'
          cols='30'
          rows='10'
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input type='submit' id='edit-submit' value='Update Bookmark' />
      </form>
    </Wrapper>
  )
}

export default connect(
  null,
  { editCollection }
)(EditModal)

const Wrapper = styled.div`
  ${StyledEditModal}
`
