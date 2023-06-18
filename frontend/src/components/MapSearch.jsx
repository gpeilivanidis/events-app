import { useEffect } from 'react'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import { useMap } from 'react-leaflet'

const MapSearch = ({icon, onSearch}) => {

    const provider = new OpenStreetMapProvider()
  
    const searchControl = new GeoSearchControl({
      provider: provider,
      autoComplete: true,
      marker: {
        icon: icon,
        draggable: false,
      },
      maxMarkers: 1,
      autoClose: true,
      keepResult: true
    })
  
    const map = useMap()

    useEffect(() => {
      map.addControl(searchControl)
      map.on('geosearch/showlocation', (result) => {

        onSearch({
            address: result.location.label,
            coordinates: [result.location.y, result.location.x]
        })

      });
      
      return () => map.removeControl(searchControl)
    }, [])
  
    return null
}  

export default MapSearch