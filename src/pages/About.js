import React from 'react';
import { Container, Header } from 'semantic-ui-react';

const About = (props) => {
  return (
    <Container>
      <Header as='h1'>About Chitchat.</Header>
      <p>Chitchat is an anonymous social media platform that lets you connect with others within a 20 miles radius of your current location. Users simply create a username that displays with their posts. No other information is known about the user (name, email, phone number, etc.). Users can anonymously post and other users within the 20 miles radius of where the post was posted can like, dislike, and comment on the post.</p>
      <p>Posts are shown on the dashboard for a period of 24 hours. Posts with more likes are shown at the top of the page while posts with less likes and more dislikes are shown near the bottom. If a post has 15 or more dislikes, the post is removed from being shown on the dashboard. The comment system works in a similar way, where comments with more likes are shown at the top of the list and comments with more dislikes are shown near the bottom.</p>
      <p>Even though the user’s post disappears on the dashboard after 24 hours, a user can view all of their posts, regardless of when the post was posted, within the “My Posts” page. Users also have the ability to update or delete their own posts and comments.</p>
    </Container>
  );
}

export default About;