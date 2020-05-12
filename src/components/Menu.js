import React, { Component } from 'react'
import { Menu, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Cookie from 'js-cookie'
import getSessionCookie from '../common/session'

export default class MenuInst extends Component {
  state = {}
  session = getSessionCookie()

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleLogout = (e) => {
    Cookie.remove('session')
    Cookie.remove('id_token')
    window.location.href = window.location.origin.toString()
  }

  render() {
    const { activeItem } = this.state    
    const cognitoUrl = window.location.origin.toString() === 'http://localhost:3000' ?
    'https://spotsauth.auth.us-east-2.amazoncognito.com/login?response_type=token&client_id=2uev36h1mbrgu1gtsfk57ai09m&redirect_uri=http://localhost:3000/auth' 
    : 'https://spotz.auth.us-east-2.amazoncognito.com/login?response_type=token&client_id=32hvc3lpimluo1ro0bc8p0pjm8&redirect_uri=https://spotz.world/auth'

    return (
      <Menu data-testid='menu'>
          <Menu.Item as={ Link } to='/' name='home' id='menu-home' active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item as={ Link } to='/places' name='places' id='menu-places' active={activeItem === 'places'} onClick={this.handleItemClick} />
          <Menu.Item as={ Link } to='/activities' name='activities' id='menu-activities' active={activeItem === 'activities'} onClick={this.handleItemClick}/>
          <Menu.Item as={ Link } to='/places' name='events' id='menu-events' active={activeItem === 'events'} onClick={this.handleItemClick} />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          {
          !(this.session && this.session.username) ? 
          <Menu.Item
            as= 'a'
            href={cognitoUrl}
            name='login'
            id='menu-login'
          /> 
          : 
          <>
            <Menu.Item as={ Link } to='/profile' id='menu-profile' name={this.session.username}/>
            <Menu.Item
            name='logout'
            onClick={this.handleLogout}
            id='menu-logout'
            />
        </>
        }
          
        </Menu.Menu>
      </Menu>
    )
  }
}