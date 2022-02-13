import React, { useState } from 'react';
import { Button, Header, Message, Modal } from 'semantic-ui-react';


function DeleteCommentModal(props) {
  const { fetchData, openModal, setOpenModal, post, user } = props;
  const [successDelete, setSuccessDelete] = useState(false);

  const deleteComment = async (id) => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/api/deleteComment`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        username: user.username
      })
    });

    setSuccessDelete(true);

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
        {successDelete ?
          <Message>
            <Message.Header>Comment Deleted!</Message.Header>
          </Message> :
          <Modal.Description>
            <Header>Warning! You are about to delete this comment!</Header>
            <p>
              This comment will be deleted forever and cannot be brought back.
            </p>
            <p>Are you okay with this?</p>
          </Modal.Description>
        }
      </Modal.Content>
      {!successDelete &&
        <Modal.Actions>
          <Button color='blue' onClick={() => deleteComment(post._id)}>
            Yes, delete forever
          </Button>
          <Button
            content="Nope, don't delete"
            color='red'
            onClick={() => setOpenModal(false)}
          />
        </Modal.Actions>
      }
    </Modal>
  )
}

export default DeleteCommentModal;