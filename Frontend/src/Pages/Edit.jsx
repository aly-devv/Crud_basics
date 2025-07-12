import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditUser = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/users');
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      toast.success("✅ User deleted successfully!", { theme: "dark" });
    } catch (err) {
      console.log("Error deleting user", err);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser({ ...user }); // clone to avoid direct state mutation
    setShowModal(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/users/${selectedUser._id}`, selectedUser);
      setUsers(users.map(user => user._id === selectedUser._id ? selectedUser : user));
      toast.success("✅ User updated successfully!", { theme: "dark" });
      setShowModal(false);
    } catch (err) {
      console.log("Error updating user", err);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-blue-100 py-6 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-blue-700">👥 User List</h2>
          <input
            type="search"
            placeholder="Search by username"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-blue-100 text-blue-800 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-100">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded-md mr-2 hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <p className="text-gray-600 text-center mt-4">No users found.</p>
        )}
      </div>

      {/* Modal for editing user */}
      {showModal && selectedUser && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/40  flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Edit User</h3>
            <form onSubmit={handleUpdateUser} className="space-y-4">
              <input
                type="text"
                value={selectedUser.name}
                onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Name"
              />
              <input
                type="email"
                value={selectedUser.email}
                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Email"
              />
              <input
                type="text"
                value={selectedUser.phone}
                onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Phone"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUser;
