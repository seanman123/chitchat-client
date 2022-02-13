import React, { useState } from 'react';
import { Button, Form, TextArea, Message, Modal } from 'semantic-ui-react';


function EditCommentModal(props) {
  const { fetchData, openModal, setOpenModal, post, user } = props;
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [postText, setPostText] = useState(post.body);
  const [buttonLoading, setButtonLoading] = useState(false);

  const updateComment = async () => {
    setButtonLoading(true);
    await fetch(`${process.env.REACT_APP_SERVER_URL}/api/updateComment`, {
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
            <Message.Header>Comment Updated!</Message.Header>
          </Message> :
          <Modal.Description>
            <Form onSubmit={() => updateComment()} success={successUpdate}>
              <Form.Field>
                <label>Comment</label>
                <TextArea value={postText} onChange={(e) => setPostText(e.target.value)} placeholder='Update a Comment' />
              </Form.Field>
              <Message
                success
                header='Post Updated!'
              />
              <Button disabled={postText === ''} loading={buttonLoading} color='blue' type='submit'>Update Comment</Button>
            </Form>
          </Modal.Description>
        }
      </Modal.Content>
    </Modal>
  )
}

export default EditCommentModal;