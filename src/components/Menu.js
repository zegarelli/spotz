import React, { Component } from 'react'
import { Menu, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class MenuInst extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

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
          !this.props.token ? 
          <Menu.Item
            as= 'a'
            href='https://spotz.auth.us-east-2.amazoncognito.com/login?response_type=token&client_id=32hvc3lpimluo1ro0bc8p0pjm8&redirect_uri=http://localhost:3000'
            name='login'
          /> : 
          <Menu.Item
          as= 'a'
          href='https://spotz.auth.us-east-2.amazoncognito.com/login?response_type=token&client_id=32hvc3lpimluo1ro0bc8p0pjm8&redirect_uri=http://localhost:3000'
          name='logout'
        />
        }
          
        </Menu.Menu>
      </Menu>
    )
  }
}