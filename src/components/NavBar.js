import React, { useState, useEffect } from 'react'
import { Header, Menu } from 'semantic-ui-react'

const NavBar = () => {
  const [activeItem, setActiveItem] = useState(window.location.pathname);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setHasToken(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  return (
    <div>
      {hasToken &&
        <Menu pointing secondary>
          <Menu.Item>
            <Header as="h3" color='blue'>Chitchat</Header>
          </Menu.Item>
          <Menu.Item
            active={activeItem === '/dashboard'}
            name='dashboard'
            onClick={() => window.location.href = "/dashboard"}
          />
          <Menu.Item
            active={activeItem === '/my-posts'}
            name='My Posts'
            onClick={() => window.location.href = "/my-posts"}
          />
          <Menu.Item
            active={activeItem === '/about'}
            name='About'
            onClick={() => window.location.href = "/about"}
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              onClick={() => handleLogout()}
            />
          </Menu.Menu>
        </Menu>}
    </div>
  )
}

export default NavBar;