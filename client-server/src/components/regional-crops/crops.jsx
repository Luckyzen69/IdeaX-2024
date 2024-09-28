import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function Crops({ latitude, longitude }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch the token each time before making a request
      const tokenResponse = await axios.post('https://soil.narc.gov.np/api/token', {
        email: "thakurizen2@gmail.com",
        password: "Luckyzen@11223344",
      });

      const token = tokenResponse.data.token;


      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://soil.narc.gov.np/soil/soildata/?lon=${longitude}&lat=${latitude}`,
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      };

      // Use await to capture the response of the request
      const dataResponse = await axios.request(config);
      setData(dataResponse.data);
 

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      fetchData();
    }
  }, [latitude, longitude]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Fetched Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
