import { useEffect, useState } from "react";
import CardContent from "../components/CardContent";
import { Button, Card, Container, Form, TextArea, Message, Header } from 'semantic-ui-react';

const Post = (props) => {
  const { user } = props;
  const [data, setData] = useState(false);
  const [commentCreated, setCommentCreated] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [postText, setPostText] = useState('');
  const [commentData, setCommentData] = useState(null);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = () => {
    let params = (new URL(document.location)).searchParams;
    let id = params.get("id");

    fetch(`${process.env.REACT_APP_SERVER_URL}/api/getPost?id=${id}`)
      .then((result) => result.json())
      .then(data => setData(data));

    fetch(`${process.env.REACT_APP_SERVER_URL}/api/getComments?original_id=${id}`)
      .then((result) => result.json())
      .then(data => setCommentData(data));
  }

  const createComment = async () => {
    setButtonLoading(true);
    if (postText !== '') {
      await fetch(`${process.env.REACT_APP_SERVER_URL}/api/createComment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          body: postText,
          author_id: user._id,
          author_username: user.username,
          original_post_id: data._id,
        })
      });
      setCommentCreated(true);
    }
    setPostText('');
    fetchData();
    setButtonLoading(false);
    setTimeout(() => setCommentCreated(false), 4000);
  }

  return (
    <Container>
      <Header as="h4"><a href="/dashboard">{"<"} Back to Dashboard</a></Header>
      <div className='post-form'>
        <Form onSubmit={() => createComment()} success={commentCreated}>
          <Form.Field>
            <label>Comment</label>
            <TextArea rows={1} value={postText} onChange={(e) => setPostText(e.target.value)} placeholder='Create a Comment' />
          </Form.Field>
          <Message
            success
            header='Comment Created!'
          />
          <Button disabled={postText === ''} loading={buttonLoading} color='blue' type='submit'>Create Comment</Button>
        </Form>
      </div>
      <Header>Post</Header>
      <Card.Group>
        {data &&
          <CardContent post={data} user={user} />
        }
      </Card.Group>
      <Header>Comments</Header>
      {commentData ? (
        <Card.Group>
          {commentData.map((post) => (
            <CardContent key={post.id} comment={true} post={post} user={user} />
          ))}
        </Card.Group>
      ) :
        <Header as='h3'>No Comments on this post! Be the first to comment!</Header>}
    </Container>
  )
}

export default Post;