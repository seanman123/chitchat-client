import React, { useEffect, useState } from 'react';
import CardContent from '../components/CardContent';
import { Button, Card, Container, Dimmer, Form, Header, Loader, Message, TextArea } from 'semantic-ui-react';

const Dashboard = (props) => {
  const { user } = props;
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [postCreated, setPostCreated] = useState(false);
  const [data, setData] = useState([]);
  const [postText, setPostText] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = () => {
    const fetchFromGeo = (pos) => {
      setLatitude(pos.coords.latitude);
      setLongitude(pos.coords.longitude);
      fetch(`${process.env.REACT_APP_SERVER_URL}/api/getPosts`)
        .then((result) => result.json())
        .then(posts => {
          const postArray = [];
          posts.forEach((post) => {
            const milesAway = calcCrow(pos.coords.latitude, pos.coords.longitude, post.latitude, post.longitude);
            const postDate = post.date && new Date(post.date);
            const timeStamp = Math.round(new Date().getTime() / 1000);
            const timeStampYesterday = timeStamp - (24 * 3600);
            const isWithTwentyFourHours = postDate >= new Date(timeStampYesterday * 1000).getTime();
            if (milesAway < 20 && post.disliked_by.length < 15 && isWithTwentyFourHours) {
              postArray.push(post);
            }
          });
          setData(postArray);
          setLoading(false);
        });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        fetchFromGeo(pos);
      }, error => {
        setLoading(false);
        setHasError(true);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  const calcCrow = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const lat1Rad = toRad(lat1);
    const lat2Rad = toRad(lat2);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d * 0.621371;
  }

  // Converts numeric degrees to radians
  const toRad = (Value) => {
    return Value * Math.PI / 180;
  }

  const createPost = async () => {
    setButtonLoading(true);
    if (postText !== '') {
      await fetch(`${process.env.REACT_APP_SERVER_URL}/api/createPost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          body: postText,
          username: user.username,
          id: user.id,
          latitude: latitude,
          longitude: longitude
        })
      });
      setPostCreated(true);
    }
    setPostText('');
    fetchData();
    setButtonLoading(false);
    setTimeout(() => setPostCreated(false), 4000);
  }

  if (loading) {
    return (
      <Dimmer active>
        <Loader size='huge'>Loading</Loader>
      </Dimmer>
    );
  }

  if (hasError) {
    return (
      <Container>
        <Header as='h1'>Cannot get posts in your location</Header>
        <Header as='h3'>Please ensure your location settings are turned on and refresh the page.</Header>

      </Container>
    );
  }

  return (
    <Container>
      <div className='post-form'>
        <Form onSubmit={() => createPost()} success={postCreated}>
          <Form.Field>
            <label>Post</label>
            <TextArea rows={1} value={postText} onChange={(e) => setPostText(e.target.value)} placeholder='Create a Post' />
          </Form.Field>
          <Message
            success
            header='Post Created!'
          />
          <Button disabled={postText === ''} loading={buttonLoading} color='blue' type='submit'>Create Post</Button>
        </Form>
      </div>
      {data.length > 0 && latitude && longitude ? (
        <Card.Group>
          {data.map((post) => (
            <CardContent key={post._id} post={post} user={user} />
          ))}
        </Card.Group>
      ) :
        <Header as='h1'>No Posts in your area! Be the first to post today!</Header>}
    </Container>
  );
}

export default Dashboard;