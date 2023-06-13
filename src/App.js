import './style.scss';
import MainScreen from './components/MainScreen';
import { useEffect, useState } from 'react';


function App() {

  
  // // current city Location 
  // const [current,setCurrent] = useState(null);

  // //current city weather
  // const [currweat,setCurrweat] = useState(null);

  // function handleLocationClick(){
  //   if(navigator.geolocation){
  //     navigator.geolocation.getCurrentPosition(success,error);
  //   }
  //   else{
  //     console.log("Geolocation not supported");
  //   }
  // }

  // function success(position){
  //   const latitude = position.coords.latitude;
  //   const longitude = position.coords.longitude;
  //   setCurrent({latitude,longitude});
  //   // console.log('Latitude : '+latitude);

  //   fetch(`${api.base}weather?lat=${latitude}&lon=${longitude}&appid=${api.key}&units=metric`)
  //     .then(res =>res.json())
  //     .then(result => {
  //       setCurrweat(result);
  //       console.log(result);
  //   })
  //     .catch(error => console.log(error));
  // }

  // function error() {
  //   console.log("Unable to retrieve your location");
  // }


  return (
    <div className="cover">
       {/* {!current ? <button onClick={handleLocationClick}>Get Location</button> : null} */}
      <div className='background'>
          <MainScreen />
      </div>
    </div>
  );
}

export default App;
