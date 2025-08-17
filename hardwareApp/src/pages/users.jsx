import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Swal from 'sweetalert2';
import { Search, CirclePlus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';

function Users() {
  const [users, setUsers] = useState([
    { 
      id: 1,
      name: "John Doe", 
      role: "Admin", 
      email: "john.doe@hardware.com", 
      password: "admin123" 
    },
    { 
      id: 2,
      name: "Jane Smith", 
      role: "Cashier", 
      email: "jane.smith@hardware.com", 
      password: "cashier123" 
    },
    { 
      id: 3,
      name: "Mike Johnson", 
      role: "Manager", 
      email: "mike.johnson@hardware.com", 
      password: "manager123" 
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPasswords, setShowPasswords] = useState({});

  // Toggle password visibility
  const togglePasswordVisibility = (userId) => {
    setShowPasswords(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  // Add user
  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const newUser = {
      id: Date.now(),
      name: form.name.value,
      role: form.role.value,
      email: form.email.value,
      password: form.password.value,
    };

    setUsers([...users, newUser]);
    setShowAddModal(false);
    form.reset();

    Swal.fire({
      icon: 'success',
      title: 'User Added',
      text: `${newUser.name} has been added successfully.`,
      timer: 2000,
      showConfirmButton: false
    });
  };

  // Edit user
  const handleEditUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedUser = {
      id: currentUser.id,
      name: form.name.value,
      role: form.role.value,
      email: form.email.value,
      password: form.password.value,
    };

    setUsers(users.map(u => (u.id === currentUser.id ? updatedUser : u)));
    setShowEditModal(false);

    Swal.fire({
      icon: 'success',
      title: 'User Updated',
      text: `${updatedUser.name} was updated successfully.`,
      timer: 2000,
      showConfirmButton: false
    });
  };

  // Delete user
  const handleDelete = (userId, userName) => {
    Swal.fire({
      title: `Delete ${userName}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(users.filter(u => u.id !== userId));
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${userName} has been deleted.`,
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Navbar>
      <main className="flex-1 p-8">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <span className="text-blue-500 font-medium mb-2">Total Users</span>
            <span className="text-2xl font-bold mb-3">{users.length}</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <span className="text-green-500 font-medium mb-2">Admins</span>
            <span className="text-2xl font-bold mb-3">
              {users.filter(u => u.role === "Admin").length}
            </span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <span className="text-purple-500 font-medium mb-2">Cashiers</span>
            <span className="text-2xl font-bold mb-3">
              {users.filter(u => u.role === "Cashier").length}
            </span>
          </div>
        </div>

        {/* Users Section */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Users</h2>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-auto">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full sm:w-auto pl-8 pr-3 py-2 border rounded text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                className="btn btn-sm btn-primary text-white"
                onClick={() => setShowAddModal(true)}>
                Add User
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-2 whitespace-nowrap">Name</th>
                  <th className="px-4 py-2 whitespace-nowrap">Role</th>
                  <th className="px-4 py-2 whitespace-nowrap">Email</th>
                  <th className="px-4 py-2 whitespace-nowrap">Password</th>
                  <th className="px-4 py-2 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="px-4 py-2 font-medium">{user.name}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === "Admin" ? "bg-red-100 text-red-800" :
                        user.role === "Manager" ? "bg-blue-100 text-blue-800" :
                        "bg-green-100 text-green-800"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono">
                          {showPasswords[user.id] ? user.password : '••••••••'}
                        </span>
                        <button
                          onClick={() => togglePasswordVisibility(user.id)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          {showPasswords[user.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-2 flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          setCurrentUser(user);
                          setShowEditModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id, user.name)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add User Modal */}
        {showAddModal && (
          <Modal title="Add User" onClose={() => setShowAddModal(false)}>
            <form onSubmit={handleAddUser} className="space-y-4">
              <input 
                name="name" 
                required 
                placeholder="Full Name" 
                className="w-full border px-3 py-2 rounded"
              />
              <select 
                name="role" 
                required 
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Cashier">Cashier</option>
              </select>
              <input 
                name="email" 
                type="email" 
                required 
                placeholder="Email Address" 
                className="w-full border px-3 py-2 rounded"
              />
              <input 
                name="password" 
                type="password" 
                required 
                placeholder="Password" 
                className="w-full border px-3 py-2 rounded"
              />
              <div className="flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)} 
                  className="btn bg-gray-300"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn bg-blue-600 text-gray"
                >
                  Save
                </button>
              </div>
            </form>
          </Modal>
        )}

        {/* Edit User Modal */}
        {showEditModal && currentUser && (
          <Modal title={`Edit ${currentUser.name}`} onClose={() => setShowEditModal(false)}>
            <form onSubmit={handleEditUser} className="space-y-4">
              <input 
                name="name" 
                defaultValue={currentUser.name} 
                required 
                className="w-full border px-3 py-2 rounded" 
              />
              <select 
                name="role" 
                defaultValue={currentUser.role} 
                required 
                className="w-full border px-3 py-2 rounded"
              >
                <option value="Admin">Admin</option>
                <option value="Cashier">Cashier</option>
              </select>
              <input 
                name="email" 
                type="email" 
                defaultValue={currentUser.email} 
                required 
                className="w-full border px-3 py-2 rounded" 
              />
              <input 
                name="password" 
                type="password" 
                defaultValue={currentUser.password} 
                required 
                className="w-full border px-3 py-2 rounded" 
              />
              <div className="flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowEditModal(false)} 
                  className="btn bg-gray-300"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn bg-green-600 text-gray"
                >
                  Update
                </button>
              </div>
            </form>
          </Modal>
        )}
      </main>
    </Navbar>
  );
}

// Reusable Modal Component
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
}

export default Users;
