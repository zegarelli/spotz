import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
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
      </Menu>
    )
  }
}