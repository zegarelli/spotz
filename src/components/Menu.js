import React, { Component } from 'react'
import { Menu, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Cookie from 'js-cookie'

export default class MenuInst extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleLogout = (e) => {
    Cookie.remove('session')
    window.location.href = window.location.origin.toString()
  }

  render() {
    const { activeItem } = this.state
    return (
      <Menu data-testid='menu'>
          <Menu.Item as={ Link } to='/' name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item as={ Link } to='/places' name='places' active={activeItem === 'places'} onClick={this.handleItemClick} />
          <Menu.Item as={ Link } to='/activities' name='activities' active={activeItem === 'activities'} onClick={this.handleItemClick}/>
          <Menu.Item as={ Link } to='/places' name='events' active={activeItem === 'events'} onClick={this.handleItemClick} />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          {
          !(this.props.session && this.props.session.username) ? 
          <Menu.Item
            as= 'a'
            href={`https://spotz.auth.us-east-2.amazoncognito.com/login?response_type=token&client_id=32hvc3lpimluo1ro0bc8p0pjm8&redirect_uri=${window.location.origin.toString()}`}
            name='login'
          /> 
          : 
          <>
            <Menu.Item as={ Link } to='/profile' name={this.props.session.username}/>
            <Menu.Item
            name='logout'
            onClick={this.handleLogout}
            />
        </>
        }
          
        </Menu.Menu>
      </Menu>
    )
  }
}