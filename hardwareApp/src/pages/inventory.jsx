import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Swal from 'sweetalert2';
import { Search } from 'lucide-react';
import { CirclePlus, Pencil, Trash2 } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';

function Inventory() {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    addStock 
  } = useInventory();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Add product
  const handleAddProduct = (e) => {
    e.preventDefault();
    const form = e.target;
    const newProduct = {
      name: form.name.value,
      qty: parseInt(form.qty.value),
      unit: form.unit.value,
      date: form.date.value,
      category: form.category.value,
    };

    addProduct(newProduct);
    setShowAddModal(false);
    form.reset();

    Swal.fire({
      icon: 'success',
      title: 'Product Added',
      text: `${newProduct.name} has been added successfully.`,
      timer: 2000,
      showConfirmButton: false
    });
  };

  // Edit product
  const handleEditProduct = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedProduct = {
      name: form.name.value,
      qty: parseInt(form.qty.value),
      unit: form.unit.value,
      date: form.date.value,
      category: form.category.value,
    };

    updateProduct(currentProduct.name, updatedProduct);
    setShowEditModal(false);

    Swal.fire({
      icon: 'success',
      title: 'Product Updated',
      text: `${updatedProduct.name} was updated successfully.`,
      timer: 2000,
      showConfirmButton: false
    });
  };

  // Add stock
  const handleAddStock = (e) => {
    e.preventDefault();
    const addedQty = parseInt(e.target.qty.value);
    
    addStock(currentProduct.name, addedQty);
    setShowStockModal(false);

    Swal.fire({
      icon: 'success',
      title: 'Stock Added',
      text: `Stock was added to ${currentProduct.name}.`,
      timer: 2000,
      showConfirmButton: false
    });
  };

  const handleDelete = (name) => {
    Swal.fire({
      title: `Delete ${name}?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(name);
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${name} has been deleted.`,
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  const uniqueCategoriesCount = new Set(products.map(p => p.category)).size;

  return (
    <Navbar>
      <main className="flex-1 p-8">
        {/* 🟩 Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <span className="text-yellow-500 font-medium mb-2">Categories</span>
          <span className="text-2xl font-bold mb-3">
        {[...new Set(products.map(p => p.category))].length}</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <span className="text-red-500 font-medium mb-2">Total Product</span>
            <span className="text-2xl font-bold mb-3">{products.length}</span>
          </div>
         
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <span className="text-purple-600 font-semibold text-sm mb-4"> Stock Monitoring</span>
            <div className="flex justify-between items-center mb-1">
              <span className="text-2xl font-bold">
                {products.filter(p => p.status === "Low stock").length}
              </span>
              <span className="text-2xl font-bold">
                {products.filter(p => p.qty === 0).length}
              </span>
            </div>
            <div className="flex justify-between text-sm text-red-400">
              <span className="text-yellow-600 px-2 py-0.5 rounded"> Low Stock Items</span>
              <span>Out of Stock</span>
            </div>
          </div>
        </div>

        {/* 📦 Products Section */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Products</h2>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-auto">
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  placeholder="Search by name"
                  className="w-full sm:w-auto pl-8 pr-3 py-2 border rounded text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
             <button
                className="btn btn-sm btn-primary text-white"
                onClick={() => setShowAddModal(true)}>Add Product</button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-2 whitespace-nowrap">Name</th>
                  <th className="px-4 py-2 whitespace-nowrap">Quantity</th>
                  <th className="px-4 py-2 whitespace-nowrap">Units</th>
                  <th className="px-4 py-2 whitespace-nowrap">Date</th>
                  <th className="px-4 py-2 whitespace-nowrap">Status</th>
                  <th className="px-4 py-2 whitespace-nowrap">Category</th>
                  <th className="px-4 py-2 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products
                  .filter((p) =>
                    p.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((p, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2">{p.name}</td>
                      <td className="px-4 py-2">{p.qty}</td>
                      <td className="px-4 py-2">{p.unit}</td>
                      <td className="px-4 py-2">{p.date}</td>
                      <td className="px-4 py-2">
                        <span
                          className={
                            p.status === "In-stock"
                              ? "text-green-600"
                              : p.status === "Low stock"
                              ? "text-yellow-600"
                              : "text-red-600"
                          }
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">{p.category}</td>
                      <td className="px-4 py-2 flex flex-wrap gap-2">
                        <button
                          onClick={() => {
                            setCurrentProduct(p);
                            setShowStockModal(true);
                          }}
                          className="text-purple-600"
                        >
                          <CirclePlus size={15} />
                        </button>
                        <button
                          onClick={() => {
                            setCurrentProduct(p);
                            setShowEditModal(true);
                          }}
                          className="text-black"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.name)}
                          className="text-red-600"
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

        {/* Add Product Modal */}
        {showAddModal && (
          <Modal title="Add Product" onClose={() => setShowAddModal(false)}>
            <form onSubmit={handleAddProduct}>
              <input name="name" required placeholder="Name" className="w-full border px-3 py-2 rounded mb-4"/>
              <input name="qty" type="number" required placeholder="Quantity" className="w-full border px-3 py-2 rounded mb-4"/>
              <input name="unit" required placeholder="Unit" className="w-full border px-3 py-2 rounded mb-4"/>
              <input name="date" type="date" required className="w-full border px-3 py-2 rounded mb-4"/>
              <input name="category" required placeholder="Category" className="w-full border px-3 py-2 rounded mb-4"/>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn bg-gray-300">Cancel</button>
                <button type="submit" className="btn bg-blue-600 text-black">Save</button>
              </div>
            </form>
          </Modal>
        )}

        {/* Edit Product Modal */}
        {showEditModal && currentProduct && (
          <Modal title={`Edit ${currentProduct.name}`} onClose={() => setShowEditModal(false)}>
            <form onSubmit={handleEditProduct} className="space-y-4">
              <input name="name" defaultValue={currentProduct.name} required className="w-full border px-3 py-2 rounded mb-4" />
              <input name="qty" type="number" defaultValue={currentProduct.qty} required className="w-full border px-3 py-2 rounded mb-4" />
              <input name="unit" defaultValue={currentProduct.unit} required className="w-full border px-3 py-2 rounded mb-4" />
              <input name="date" type="date" defaultValue={currentProduct.date} required className="w-full border px-3 py-2 rounded mb-4" />
              <input name="category" defaultValue={currentProduct.category} required placeholder="Category" className="w-full border px-3 py-2 rounded mb-4" />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowEditModal(false)} className="btn bg-gray-300">Cancel</button>
                <button type="submit" className="btn bg-green-600 text-black">Update</button>
              </div>
            </form>
          </Modal>
        )}

        {/* Add Stock Modal */}
        {showStockModal && currentProduct && (
          <Modal title={`Add Stock to ${currentProduct.name}`} onClose={() => setShowStockModal(false)}>
            <form onSubmit={handleAddStock} className="space-y-4">
              <input name="qty" type="number" placeholder="Additional Quantity" required className="w-full border px-3 py-2 rounded" />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowStockModal(false)} className="btn bg-gray-300">Cancel</button>
                <button type="submit" className="btn bg-purple-600 text-black">Add</button>
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

export default Inventory;



