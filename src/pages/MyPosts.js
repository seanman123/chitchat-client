import React, { useEffect, useState } from 'react';
import CardContent from '../components/CardContent';
import { Card, Container, Header, Message } from 'semantic-ui-react';

const MyPosts = (props) => {
  const { user } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchData(user);
    }
  }, [user]);

  const fetchData = (user) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/getUserPosts?id=${user.id}`)
      .then((result) => result.json())
      .then(posts => {
        const postArray = [];
        posts.forEach((post) => {
          postArray.push(post);
        });
        setData(postArray);
        setLoading(false);
      });
  }

  return (
    <Container>
      {data.length > 0 ? (
        <Container>
          <Message>
            <p>These are your posts. Posts are viewed by other users who are within 20 miles of the area that the post was posted.</p>
            <p>Posts are only shown to users if the date of the post matches the current day. If a post has more than 15 dislikes, the post is not shown to users</p>
          </Message>
          <Card.Group>
            {data.map((post) => (
              <CardContent key={post._id} post={post} user={user} />
            ))}
          </Card.Group>
        </Container>
      ) :
        <Header as='h1'>You have no posts! Go to the <a href="/dashboard">Dashboard</a> and create a post in your area!</Header>}
    </Container>
  )
}

export default MyPosts;