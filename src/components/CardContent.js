import React, { useEffect, useState } from 'react';
import GetLikesDislikes from '../components/GetLikesDislikes';
import { Card } from 'semantic-ui-react';

const CardContent = (props) => {
  const { post, user, comment } = props;
  const [data, setData] = useState(null);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    if (comment) {
      fetch(`${process.env.REACT_APP_SERVER_URL}/api/getComment?id=${post._id}`)
      .then((result) => result.json())
      .then(data => setData(data));
      return;
    }

    fetch(`${process.env.REACT_APP_SERVER_URL}/api/getPost?id=${post._id}`)
      .then((result) => result.json())
      .then(data => setData(data));
  }

  return data && user ? (
    <Card key={data._id} fluid>
      <Card.Content>
        <Card.Header >{data.author_username}</Card.Header>
        <Card.Meta>Created at: {data.date && new Date(data.date).toLocaleString()}</Card.Meta>
        <Card.Description>
          {data.body}
        </Card.Description>
      </Card.Content>
      <GetLikesDislikes comment={comment} post={data} user={user} data={data} fetchData={fetchData} />
    </Card>
  ) : <></>
}

export default CardContent;