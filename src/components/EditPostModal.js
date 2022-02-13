import React, { useState } from 'react';
import { Button, Form, TextArea, Message, Modal } from 'semantic-ui-react';


function EditPostModal(props) {
  const { fetchData, openModal, setOpenModal, post, user } = props;
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [postText, setPostText] = useState(post.body);
  const [buttonLoading, setButtonLoading] = useState(false);

  const updatePost = async () => {
    setButtonLoading(true);
    await fetch(`${process.env.REACT_APP_SERVER_URL}/api/updatePost`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: post._id,
        body: postText
      })
    });

    setSuccessUpdate(true);
    setButtonLoading(false);

    setTimeout(() => {
      fetchData();
      setOpenModal(false);
    }, 2000);
  }

  return (
    <Modal
      onClose={() => setOpenModal(false)}
      onOpen={() => setOpenModal(true)}
      open={openModal}
    >
      <Modal.Content>
        {successUpdate ?
          <Message>
            <Message.Header>Post Updated!</Message.Header>
          </Message> :
          <Modal.Description>
            <Form onSubmit={() => updatePost()} success={successUpdate}>
              <Form.Field>
                <label>Post</label>
                <TextArea value={postText} onChange={(e) => setPostText(e.target.value)} placeholder='Update a Post' />
              </Form.Field>
              <Message
                success
                header='Post Updated!'
              />
              <Button disabled={postText === ''} loading={buttonLoading} color='blue' type='submit'>Update Post</Button>
            </Form>
          </Modal.Description>
        }
      </Modal.Content>
    </Modal>
  )
}

export default EditPostModal;