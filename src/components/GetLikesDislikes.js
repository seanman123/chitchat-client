import React, { useEffect, useState } from 'react';
import { Button, Card, Icon, Label } from 'semantic-ui-react';
import DeletePostModal from './DeletePostModal';
import EditPostModal from './EditPostModal';
import DeleteCommentModal from './DeleteCommentModal';
import EditCommentModal from './EditCommentModal';

const GetLikesDislikes = (props) => {
  const { comment, post, user, fetchData, data } = props;
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const likePost = async (id) => {
    await fetch(comment ? `${process.env.REACT_APP_SERVER_URL}/api/likeComment` : `${process.env.REACT_APP_SERVER_URL}/api/likePost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        user_id: user.id
      })
    });

    fetchData();
  }

  const dislikePost = async (id) => {
    await fetch(comment ? `${process.env.REACT_APP_SERVER_URL}/api/dislikeComment` : `${process.env.REACT_APP_SERVER_URL}/api/dislikePost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        user_id: user.id
      })
    });

    fetchData();
  }

  return data && user ? (
    <Card.Content extra>
      <Button.Group size='medium'>
        <Button
          basic={!data.liked_by.includes(user.id)}
          color='blue'
          onClick={() => likePost(data._id)}
        >
          <Icon name='thumbs up' />
        </Button>
        <Button.Or text={data.liked_by.length - data.disliked_by.length} />
        <Button
          basic={!data.disliked_by.includes(user.id)}
          color='green'
          onClick={() => dislikePost(data._id)}
        >
          <Icon name='thumbs down outline' />
        </Button>
      </Button.Group>
      {!comment && !window.location.href.includes('/post?') &&
        <Button
          basic
          icon
          color='blue'
          onClick={() => window.location.href = `/post?id=${data._id}`}
        >
          <Icon name='comment outline' />
        </Button>
      }
      {post.author_username === user.username &&
        <>
          <Button
            icon
            color='red'
            onClick={() => setOpenDeleteModal(true)}
          >
            <Icon name='trash alternate outline' />
          </Button>
          <Button
            icon
            color='grey'
            onClick={() => setOpenUpdateModal(true)}
          >
            <Icon name='edit outline' />
          </Button>
        </>
      }
      {!comment ?
        <>
          <DeletePostModal fetchData={fetchData} user={user} openModal={openDeleteModal} setOpenModal={setOpenDeleteModal} post={data} />
          <EditPostModal fetchData={fetchData} user={user} openModal={openUpdateModal} setOpenModal={setOpenUpdateModal} post={data} />
        </>
        :
        <>
          <DeleteCommentModal fetchData={fetchData} user={user} openModal={openDeleteModal} setOpenModal={setOpenDeleteModal} post={data} />
          <EditCommentModal fetchData={fetchData} user={user} openModal={openUpdateModal} setOpenModal={setOpenUpdateModal} post={data} />
        </>
      }

    </Card.Content>
  ) : <div></div>
}

export default GetLikesDislikes;