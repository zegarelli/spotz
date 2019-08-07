import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class MenuInst extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        >
          Home
        </Menu.Item>

        <Menu.Item name='places' active={activeItem === 'places'} onClick={this.handleItemClick}>
          Places
        </Menu.Item>

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