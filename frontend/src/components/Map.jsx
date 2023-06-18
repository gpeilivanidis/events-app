import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import {Icon} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import MapSearch from './MapSearch'
import { useState } from 'react'

function Map({
    mapLocation,
    search = true,
    onForm,
}) {
    // initial marker
    const [marker, setMarker] = useState(true)
    
    if(!mapLocation){
        mapLocation = {
            address: "Paris",
            coordinates: [48.85,2.35]
        }
    }

    const customIcon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/128/2776/2776067.png",
        iconSize: [38,38]
    })  

    // get location from geosearch
    const onSearch = (searchLocation) => {
        // turn initial marker off
        setMarker(false)
        // inside map
        mapLocation = searchLocation
        // inside event form
        onForm(searchLocation)
    }

  return (
    <div className='map-container'>
        <MapContainer center={[mapLocation.coordinates[0], mapLocation.coordinates[1]]} zoom={13} scrollWheelZoom={false}>
            {search && <MapSearch icon={customIcon} onSearch={onSearch} />}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* initial marker */}
            {marker && (
                <Marker position={[mapLocation.coordinates[0], mapLocation.coordinates[1]]} icon={customIcon}>
                    <Popup>
                        {mapLocation.address}
                    </Popup>
                </Marker>
            )}

        </MapContainer>
    </div>
  )
}

export default Map