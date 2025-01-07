import React,{useState, useEffect} from 'react';
import GoogleMapReact from 'google-map-react';
import './footer.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import locationMarker from '../../assets/location1.png'; 

const Marker = () => (
  <div>
    <img src={locationMarker} alt="Marker" style={{ height: '30px', width: '30px' }} />
  </div>
);

const SimpleMap = () => {
  const [isLoading, setIsLoading] = useState(true);
  const defaultProps = {
    center: {
      lat: 11.7480,
      lng: 79.7714
    },
    zoom: 11
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
            <div className='footer-skeleton'>
              <Skeleton height={350} width={620} style={{ marginLeft: 10 }} />
              <Skeleton height={350} width={620} style={{ marginLeft: 10 }} />
            </div>
          ) : (
    <div className='footer'>
      <div className='content'>
        <ul>
          <li>Terms</li>
          <li>Policy</li>
          <li>Privacy</li>
          <li>About</li>
        </ul>
        <hr></hr>
        <p>181 Ranch Dr, Milpitas 95035</p>
        <p>Email us on: reachusnamma@gmail.com</p>
        <p>Call: 408-649-3417 and 408-649-3418</p>
        <hr></hr>
        <p>Copyright © 2023 All rights are reserved</p>
      </div>
      
    <div className='map' style={{ height: '300px', width: '100%' }}>
      <GoogleMapReact
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker
            lat={11.7480}
            lng={79.7714}
          />
      </GoogleMapReact>
    </div>
    </div>
  )}
  </>
  );
};

export default SimpleMap;
