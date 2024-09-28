import React from 'react';
import Season from './season';
export default function Crops() {
  let datas = [{
    "coord": {
      "lon": 85.332,
      "lat": 27.697
    },
    "parentsoil": "Fluvial non calcareous",
    "ph": 6.32,
    "clay": "19.22 %",
    "organicMatter": "2.47 %",
    "totalNitrogen": "0.13 %",
    "boron": "1.07 ppm",
    "p2o5": "428.57 kg/ha",
    "sand": "49.69 %"
  }];

  return (
    <>
    <div className='flex '>
      <div className='border border-accent m-3 p-3'>
        <p className='font-bold'>Soil Details</p>
      {
        datas.map((data, index) => {
          return (
            <div key={index}>
              <p className='font-bold'>Latitude: <span className='font-medium'> {data.coord.lat}</span></p>
              <p className='font-bold'>  Parent Soil:<span className='font-medium'> {data.parentsoil} </span></p>
              <p className='font-bold'>  pH:<span className='font-medium'> {data.ph} </span></p>
              <p className='font-bold'>  Clay: <span className='font-medium'>{data.clay} </span></p>
              <p className='font-bold'>  Organic Matter:<span className='font-medium'> {data.organicMatter} </span></p>
              <p className='font-bold'>  Total Nitrogen:<span className='font-medium'> {data.totalNitrogen} </span></p>
              <p className='font-bold'>  Boron:<span className='font-medium'> {data.boron} </span></p>
              <p className='font-bold'>  P2O5: <span className='font-medium'>{data.p2o5} </span></p>
              <p className='font-bold'>  Sand: <span className='font-medium'>{data.sand} </span></p>
            </div>
          );
        })
      }
      </div>
    </div>
      <Season/>
        </>
  );
}
