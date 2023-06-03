import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Zone = () => {
  const [zones, setZones] = useState([]);
  const [zoneNom, setZoneNom] = useState('');
  const [zoneVilleId, setZoneVilleId] = useState('');
  const [cities, setCities] = useState([]);
  const [zoneId, setZoneId] = useState('');

  // Function to fetch the list of zones from the backend
  const fetchZones = async () => {
    try {
      const response = await axios.get('/api/zones/all');
      setZones(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to fetch the list of cities from the backend
  const fetchCities = async () => {
    try {
      const response = await axios.get('/api/villes/all');
      setCities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to get a zone by ID
  const getZoneById = async (zoneId) => {
    try {
      const response = await axios.get(`/zone/${zoneId}`);
      const zone = zones.find((zone) => zone.id === zoneId);
      setZoneNom(response.data.nom);
      setZoneVilleId(response.data.ville_id);
      document.getElementById('zonename').value = response.data.nom;
      document.getElementById('cityselect').value = response.data.ville_id;
    } catch (error) {
      console.error(error);
    }
  };

  // Function to add a zone
  const addZone = async () => {
    try {
      const response = await axios.post('/api/zones/save', { nom: zoneNom, ville_id: zoneVilleId });
      setZones([...zones, response.data]);
      setZoneNom('');
      setZoneVilleId('');
    } catch (error) {
      console.error(error);
    }
    fetchZones();
  };

  // Function to delete a zone
  const deleteZone = async (id) => {
    try {
      await axios.delete(`/api/zones/delete/${id}`);
      const updatedZones = zones.filter((zone) => zone.id !== id);
      setZones(updatedZones);
    } catch (error) {
      console.error(error);
    }
    fetchZones();
  };

  // Function to update a zone
  const updateZone = async (zoneId) => {
    try {
      const response = await axios.put(`/zone/update/${zoneId}`, { nom: zoneNom, ville_id: zoneVilleId });
      const updatedZones = zones.map((zone) => {
        if (zone.id === response.data.id) {
          return response.data;
        }
        return zone;
      });
      setZoneNom('');
      setZoneVilleId('');
      setZones(updatedZones);
    } catch (error) {
      console.error(error);
    }
    fetchZones();
    document.getElementById('zonename').value = '';
    document.getElementById('cityselect').value = '';
  };

  // Handle city select event
  const handleCitySelect = (e) => {
    const selectedVilleId = e.target.value;
    setZoneVilleId(selectedVilleId);

    // You can add code here to update the `ville_id` in the database if needed
  };

  useEffect(() => {
    fetchZones();
    fetchCities();
  }, []);

  return (
    <div className="container mt-4 ">
      <h1 className="text-g font-big1 slide-in-top ">Zones</h1>
      <table className="table mt-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nom</th>
            <th scope="col">Ville</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {zones.map((zone, index) => (
            <tr key={zone.id}>
              <th scope="row">{index + 1}</th>
              <td>{zone.nom}</td>
              <td>{zone.ville ? zone.ville.nom : ''}</td>
              <td>
                <button className="btn btn-primary btn-sm mx-1" onClick={() => getZoneById(zone.id)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteZone(zone.id)}>
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
          id="zonename"
          className="form-control"
          placeholder="Zone Name"
          value={zoneNom}
          onChange={(e) => setZoneNom(e.target.value)}
        />
        <select
          id="cityselect"
          className="form-control mt-2"
          value={zoneVilleId}
          onChange={handleCitySelect} // Modify the onChange event handler
        >
          <option value="">Select a City</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.nom}
            </option>
          ))}
        </select>
        {zoneId ? (
          <button className="btn btn-primary mt-2" onClick={() => updateZone(zoneId)}>
            Update
          </button>
        ) : (
          <button className="btn btn-primary mt-2" onClick={addZone}>
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default Zone;
