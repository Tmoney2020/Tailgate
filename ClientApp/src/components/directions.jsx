import React, { Component } from 'react'
import ReactMapGL from 'react-map-gl'

class Map extends Component {
  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8,
    },
  }

  render() {
    const { viewport } = this.state

    return (
      <ReactMapGL
        width={viewport.width}
        height={viewport.height}
        latitude={viewport.latitude}
        longitude={viewport.longitude}
        zoom={viewport.zoom}
        onViewportChange={viewport => this.setState({ viewport })}
      />
    )
  }
}

export default Map
