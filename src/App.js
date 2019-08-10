import React, { Component } from 'react'
import { getPlaces } from './services/spots_service'
import PlaceCard from './components/PlaceCard'
import Menu from './components/Menu'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      apiResponse: '',
      places: []
    }
    this.askForPlaces = this.askForPlaces.bind(this)
  }

  callAPI () {
    window.fetch('http://localhost:9000/test/')
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err)
  }

  componentDidMount () {
    this.callAPI()
  }

  async askForPlaces () {
    try {
      const places = await getPlaces()
      this.setState({ places: places })
    } catch (err) {
      console.error(err)
    }
  }

  mapPlaces (places) {
    return places.slice().map((place) => {
      console.log(place.extended_data.description)
      return (
        <li key={place.id}>
          <PlaceCard name={place.name} imgPath={place.extended_data.imagePath} description={place.extended_data.description} />
        </li>
      )
    })
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <Menu />
          <button onClick={this.askForPlaces}>Get Places</button>
          <ul>
            {this.mapPlaces(this.state.places)}
          </ul>
          <pre>{JSON.stringify(this.state.places, null, 2)}</pre>
          <h2 className='App-intro'>{this.state.apiResponse}</h2>
        </header>
      </div>
    )
  }
}// end App Class

export default App
