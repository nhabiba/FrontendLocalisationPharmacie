import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Pharmacie = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [pharmacieNom, setPharmacieNom] = useState('');
  const [pharmacieAdresse, setPharmacieAdresse] = useState('');
  const [pharmacieLatitude, setPharmacieLatitude] = useState('');
  const [pharmacieLongitude, setPharmacieLongitude] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [zones, setZones] = useState([]);
  const [editingPharmacieId, setEditingPharmacieId] = useState(null);

  // Function to fetch the list of pharmacies from the backend
  const fetchPharmacies = async () => {
    try {
      const response = await axios.get('/api/pharmacies/all');
      setPharmacies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to fetch the list of zones from the backend
  const fetchZones = async () => {
    try {
      const response = await axios.get('/api/zones/all');
      setZones(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to add or update a pharmacy
  const savePharmacy = async () => {
    if (editingPharmacieId) {
      // Update existing pharmacy
      try {
        await axios.post(`/api/pharmacies/save/`, {
          nom: pharmacieNom,
          adresse: pharmacieAdresse,
          latitude: pharmacieLatitude,
          longitude: pharmacieLongitude,
          zone_id: zoneId
        });
        setEditingPharmacieId(null);
      } catch (error) {
        console.error(error);
      }
    } else {
      // Add new pharmacy
      try {
        const response = await axios.post('/api/pharmacies/save', {
          nom: pharmacieNom,
          adresse: pharmacieAdresse,
          latitude: pharmacieLatitude,
          longitude: pharmacieLongitude,
          zone_id: zoneId
        });
        setPharmacies([...pharmacies, response.data]);
      } catch (error) {
        console.error(error);
      }
    }

    // Reset form fields
    setPharmacieNom('');
    setPharmacieAdresse('');
    setPharmacieLatitude('');
    setPharmacieLongitude('');
    setZoneId('');

    fetchPharmacies();
  };

  // Function to delete a pharmacy
  const deletePharmacy = async (id) => {
    try {
      await axios.delete(`/api/pharmacies/delete/${id}`);
      fetchPharmacies();
    } catch (error) {
      console.error(error);
    }
  };

  // Function to edit a pharmacy
  const editPharmacy = (pharmacie) => {
    setPharmacieNom(pharmacie.nom);
    setPharmacieAdresse(pharmacie.adresse);
    setPharmacieLatitude(pharmacie.latitude);
    setPharmacieLongitude(pharmacie.longitude);
    setZoneId(pharmacie.zone ? pharmacie.zone.id : '');
    setEditingPharmacieId(pharmacie.id);
  };

  useEffect(() => {
    fetchPharmacies();
    fetchZones();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mt-4">Gestion des pharmacies</h1>
      <div className="mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nom"
          value={pharmacieNom}
          onChange={(e) => setPharmacieNom(e.target.value)}
        />
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Adresse"
          value={pharmacieAdresse}
          onChange={(e) => setPharmacieAdresse(e.target.value)}
        />
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Latitude"
          value={pharmacieLatitude}
          onChange={(e) => setPharmacieLatitude(e.target.value)}
        />
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Longitude"
          value={pharmacieLongitude}
          onChange={(e) => setPharmacieLongitude(e.target.value)}
        />
        <select
          id="cityselect"
          className="form-control mt-2"
          value={zoneId}
          onChange={(e) => setZoneId(e.target.value)}
        >
          <option value="">Select Zone</option>
          {zones.map((zone) => (
            <option key={zone.nom} value={zone.id}>
              {zone.nom}
            </option>
          ))}
        </select>

        <button className="btn btn-primary mt-2" onClick={savePharmacy}>
          {editingPharmacieId ? 'Save Changes' : 'Add Pharmacy'}
        </button>
      </div>

      <table className="table mt-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nom</th>
            <th scope="col">Adresse</th>
            <th scope="col">Latitude</th>
            <th scope="col">Longitude</th>
            <th scope="col">Zone ID</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pharmacies.map((pharmacie, index) => (
            <tr key={pharmacie.id}>
              <th scope="row">{index + 1}</th>
              
              <td>{pharmacie.nom}</td>
              <td>{pharmacie.adresse}</td>
              <td>{pharmacie.latitude}</td>
              <td>{pharmacie.longitude}</td>
              <td>{pharmacie.zone ? pharmacie.zone.nom : ''}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary mr-2"
                  onClick={() => editPharmacy(pharmacie)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deletePharmacy(pharmacie.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pharmacie;