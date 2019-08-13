import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class MenuInst extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Link to='/' >
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
        </Link>

        <Link to='/places' >
          <Menu.Item name='places' active={activeItem === 'places'} onClick={this.handleItemClick} />
        </Link>

        <Menu.Item name='activities' active={activeItem === 'activities'} onClick={this.handleItemClick}>
          Activities
        </Menu.Item>

        <Menu.Item
          name='upcomingEvents'
          active={activeItem === 'upcomingEvents'}
          onClick={this.handleItemClick}
        >
          Events
        </Menu.Item>
      </Menu>
    )
  }
}