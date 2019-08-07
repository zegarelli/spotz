import React, { Component } from 'react'
import { getPlaces } from './services/spots_service'
import PlaceCard from './components/PlaceCard'
import Menu from './components/Menu'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      apiResponse: '',
      places: ''
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
      console.log(places.body)
      this.setState({ places: places })
    } catch (err) {
      console.error(err)
    }
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <Menu />
          <PlaceCard imgPath='https://data.whicdn.com/images/322549050/large.jpg?t=1542581846'/>
          <button onClick={this.askForPlaces}>Get Places</button>
          <pre>{JSON.stringify(this.state.places, null, 2)}</pre>
          <h2 className='App-intro'>{this.state.apiResponse}</h2>
        </header>
      </div>
    )
  }
}// end App Class

export default App
