import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 

import 'bootstrap/dist/css/bootstrap.min.css';

const Ville= () => {
    const [cities, setCities] = useState([]);
    const [cityNom, setCityNom] = useState('');
    const [cityId, setCityId] = useState('');
  
    // Function to fetch the list of cities from the backend
    const fetchCities = async () => {
      try {
        const response = await axios.get('/api/villes/all');
        setCities(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    // Function to get a city by ID
    const getCityById = async (cityId) => {
      try {
        const response = await axios.get(`/ville/${cityId}`);
        const cit = cities.find((city) => city.id === cityId);
        setCityNom(response.data.nom);
        setCityId(response.data.id);
        document.getElementById('cityname').value = response.data.nom;
      } catch (error) {
        console.error(error);
      }
    };
  
    // Function to add a city
    const addCity = async () => {
      try {
        const response = await axios.post('/api/villes/save', { nom: cityNom });
        setCities([...cities, response.data]);
        setCityNom('');
      } catch (error) {
        console.error(error);
      }
      fetchCities();
    };
  
    // Function to delete a city
    const deleteCity = async (id) => {
      try {
        await axios.delete(`/api/villes/delete/${id}`);
        const updatedCities = cities.filter((city) => city.id !== id);
        setCities(updatedCities);
      } catch (error) {
        console.error(error);
      }
      fetchCities();
    };
  
    // Function to update a city
    const updateCity = async (cityId) => {
      try {
        const response = await axios.put(`/ville/update/${cityId}`, { nom: cityNom });
        const updatedCities = cities.map((city) => {
          if (city.id === response.data.id) {
            return response.data;
          }
          return city;
        });
        setCityId('');
        setCityNom('');
        setCities(updatedCities);
      } catch (error) {
        console.error(error);
      }
      fetchCities();
      document.getElementById('cityname').value = '';
    };
  
    useEffect(() => {
      fetchCities();
    }, []);
  
    return (
      <div className="container mt-4">
        <h1>Gestion des Villes</h1>
        <table className="table mt-3">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nom</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city, index) => (
              <tr key={city.id}>
                <th scope="row">{index + 1}</th>
                <td>{city.nom}</td>
                <td>
                  <button className="btn btn-primary btn-sm mx-1 zoom-on-hover" onClick={() => getCityById(city.id)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm zoom-on-hover" onClick={() => deleteCity(city.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3">
          <input
            type="text"
            id="cityname"
            className="form-control"
            placeholder="City Name"
            value={cityNom}
            onChange={(e) => setCityNom(e.target.value)}
          />
          {cityId ? (
            <button className="btn btn-primary mt-2" onClick={() => updateCity(cityId)}>
              Update
            </button>
          ) : (
            <button className="btn btn-primary mt-2" onClick={addCity}>
              Add
            </button>
          )}
        </div>
      </div>
    );
  };
 
export default Ville;