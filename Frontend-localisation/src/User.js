import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const User = () => {
  const [Users, setUsers] = useState([]);
  const [UserEmail, setUserEmail] = useState('');
  const [UserNom, setUserNom] = useState('');
  const [UserPassword, setUserPassword] = useState('');
  const [UserPrenom, setUserPrenom] = useState('');
  const [UserTelephone, setUserTelephone] = useState('');
  const [pharmacieId, setpharmacieId] = useState('');
  const [pharmacies, setpharmacies] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  // Function to fetch the list of Users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/Users/all');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to fetch the list of pharmacies from the backend
  const fetchpharmacies = async () => {
    try {
      const response = await axios.get('/api/pharmacies/all');
      setpharmacies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to add or update a pharmacy
  const saveUser = async () => {
    if (editingUserId) {
      // Update existing pharmacy
      try {
        await axios.post(`/api/Users/save/`, {
          nom: UserNom,
          email: UserEmail,
          prenom: UserPrenom,
          password: UserPassword,
          telephone:UserTelephone,
          pharmacie_id: pharmacieId
        });
        setEditingUserId(null);
      } catch (error) {
        console.error(error);
      }
    } else {
      // Add new pharmacy
      try {
        const response = await axios.post('/api/Users/save', {
          nom: UserNom,
          email: UserEmail,
          prenom: UserPrenom,
          password: UserPassword,
          telephone:UserTelephone,
          pharmacie_id: pharmacieId
        });
        setUsers([...Users, response.data]);
      } catch (error) {
        console.error(error);
      }
    }

    // Reset form fields
    setUserNom('');
    setUserEmail('');
    setUserPrenom('');
    setUserPassword('');
    setUserTelephone('');
    setpharmacieId('');

    fetchUsers();
  };

  // Function to delete a pharmacy
  const deletePharmacy = async (id) => {
    try {
      await axios.delete(`/api/Users/delete/${id}`);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  // Function to edit a pharmacy
  const editPharmacy = (User) => {
    setUserNom(User.nom);
    setUserAdresse(User.adresse);
    setUserLatitude(User.latitude);
    setUserLongitude(User.longitude);
    setpharmacieId(User.pharmacie ? User.pharmacie.id : '');
    setEditingUserId(User.id);
  };

  useEffect(() => {
    fetchUsers();
    fetchpharmacies();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mt-4">Gestion des Users</h1>
      <div className="mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nom"
          value={UserNom}
          onChange={(e) => setUserNom(e.target.value)}
        />
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Adresse"
          value={UserAdresse}
          onChange={(e) => setUserAdresse(e.target.value)}
        />
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Latitude"
          value={UserLatitude}
          onChange={(e) => setUserLatitude(e.target.value)}
        />
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Longitude"
          value={UserLongitude}
          onChange={(e) => setUserLongitude(e.target.value)}
        />
        <select
          id="cityselect"
          className="form-control mt-2"
          value={pharmacieId}
          onChange={(e) => setpharmacieId(e.target.value)}
        >
          <option value="">Select pharmacie</option>
          {pharmacies.map((pharmacie) => (
            <option key={pharmacie.nom} value={pharmacie.id}>
              {pharmacie.nom}
            </option>
          ))}
        </select>

        <button className="btn btn-primary mt-2" onClick={savePharmacy}>
          {editingUserId ? 'Save Changes' : 'Add Pharmacy'}
        </button>
      </div>

      <table className="table mt-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Email</th>
            <th scope="col">Nom</th>
            <th scope="col">Password</th>
            <th scope="col">Prenom</th>
            <th scope="col">Telephone</th>
            <th scope="col">pharmacie ID</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Users.map((User, index) => (
            <tr key={User.id}>
              <th scope="row">{index + 1}</th>
              
              <td>{User.email}</td>
              <td>{User.nom}</td>
              <td>{User.password}</td>
              <td>{User.prenom}</td>
              <td>{User.telephone}</td>
              <td>{User.pharmacie ? User.pharmacie.nom : ''}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary mr-2"
                  onClick={() => editPharmacy(User)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deletePharmacy(User.id)}
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

export default User;