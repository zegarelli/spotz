import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class AdminMenu extends Component {
  state = { activeItem: 'inbox' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu vertical>
        <Menu.Item
          as={ Link }
          to='/admin'
          name='admin'
          active={activeItem === 'admin'}
          onClick={this.handleItemClick}
        >
          Admin
          </Menu.Item>

        <Menu.Item
          as={ Link }
          to='/admin/users'
          name='users'
          active={activeItem === 'users'}
          onClick={this.handleItemClick}
        />

        <Menu.Item
          as={ Link }
          to='/admin/scopes'
          name='scopes'
          active={activeItem === 'scopes'}
          onClick={this.handleItemClick}
        />
        <Menu.Item 
          as={ Link }
          to='/'
          >
          <Icon name='home' />
          Home
        </Menu.Item>
        </Menu>
    )
  }
}
