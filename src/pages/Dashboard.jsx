import React, { useState, useEffect } from 'react';
import { endpoints } from '../api/apiConfig';
import DashboardNavbar from '../components/DashboardNavbar';

const Dashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '', image: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [orders, setOrders] = useState([]); // New state for orders
  const [showOrders, setShowOrders] = useState(false); // New state to toggle orders view
  const [discounts, setDiscounts] = useState([]); // State to hold discount events
  const [showDiscountForm, setShowDiscountForm] = useState(false); // State to toggle discount form visibility
  const [newDiscount, setNewDiscount] = useState({
    name: '',
    type: 'percentage', // 'percentage' or 'fixed'
    value: '',
    startDate: '',
    endDate: '',
    active: true,
  });
  const [editingDiscount, setEditingDiscount] = useState(null); // State to hold discount being edited
  const [orderToDelete, setOrderToDelete] = useState(null); // New state for order to be deleted
  const [showOrderDeleteConfirm, setShowOrderDeleteConfirm] = useState(false); // New state to toggle order delete confirmation
  // const [alert, setAlert] = useState(null); // { message: '', type: 'success' | 'error' } (No longer needed)

  useEffect(() => {
    fetchMenuItems();
    fetchOrders(); // Fetch orders on component mount
    fetchDiscounts(); // Fetch discounts on component mount
    // Request notification permission when component mounts
    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notification');
    } else if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const showAlert = (message, type) => {
    // setAlert({ message, type }); // No longer needed for in-component alert
    // setTimeout(() => {
    //   setAlert(null);
    // }, 3000); // Clear alert after 3 seconds (no longer needed)
    if (Notification.permission === 'granted') {
      new Notification('Dashboard Alert', {
        body: message,
        icon: '/cafe_sakal_logo.png', // Replace with your logo path
      });
    }
  };

  const fetchMenuItems = () => {
    // For demo purposes we load the initial items from the endpoint.
    fetch(endpoints.menuItems)
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => {
        console.error('Error fetching menu items:', error);
        showAlert('បរាជ័យក្នុងការទាញយកមុខម្ហូប.', 'error');
      });
  };

  const fetchOrders = () => {
    fetch(endpoints.orders)
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => {
        console.error('Error fetching orders:', error);
        showAlert('បរាជ័យក្នុងការទាញយកការកម្ម៉ង់.', 'error');
      });
  };

  const fetchDiscounts = () => {
    fetch(endpoints.discounts)
      .then(response => response.json())
      .then(data => setDiscounts(data))
      .catch(error => {
        console.error('Error fetching discounts:', error);
        showAlert('បរាជ័យក្នុងការទាញយកការបញ្ចុះតម្លៃ.', 'error');
      });
  };

  const handleAddChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(endpoints.menuItems, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error('Failed to add item');
      }

      const addedItem = await response.json();
      setMenuItems([...menuItems, addedItem]);
      setNewItem({ name: '', description: '', price: '', image: '' });
      setShowAddForm(false);
      showAlert('មុខម្ហូបត្រូវបានបន្ថែមដោយជោគជ័យ!', 'success');
    } catch (error) {
      console.error('Error adding menu item:', error);
      showAlert('បរាជ័យក្នុងការបន្ថែមមុខម្ហូប.', 'error');
    }
  };

  const handleEditChange = (e) => {
    setEditingItem({ ...editingItem, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${endpoints.menuItems}/${editingItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingItem),
      });

      if (!response.ok) {
        throw new Error('Failed to update item');
      }

      const updatedItem = await response.json();
      setMenuItems(
        menuItems.map(item => (item.id === updatedItem.id ? updatedItem : item))
      );
      setEditingItem(null);
      showAlert('មុខម្ហូបត្រូវបានកែសម្រួលដោយជោគជ័យ!', 'success');
    } catch (error) {
      console.error('Error updating menu item:', error);
      showAlert('បរាជ័យក្នុងការកែសម្រួលមុខម្ហូប.', 'error');
    }
  };

  const handleAddDiscountChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewDiscount(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddDiscountSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(endpoints.discounts, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDiscount),
      });

      if (!response.ok) {
        throw new Error('Failed to add discount');
      }

      fetchDiscounts();
      setNewDiscount({
        name: '',
        type: 'percentage',
        value: '',
        startDate: '',
        endDate: '',
        active: true,
      });
      setShowDiscountForm(false);
      showAlert('ការបញ្ចុះតម្លៃត្រូវបានបន្ថែមដោយជោគជ័យ!', 'success');
    } catch (error) {
      console.error('Error adding discount:', error);
      showAlert('បរាជ័យក្នុងការបន្ថែមការបញ្ចុះតម្លៃ.', 'error');
    }
  };

  const handleEditDiscountChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingDiscount(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleUpdateDiscountSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${endpoints.discounts}/${editingDiscount.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingDiscount),
      });

      if (!response.ok) {
        throw new Error('Failed to update discount');
      }

      fetchDiscounts();
      setEditingDiscount(null);
      showAlert('ការបញ្ចុះតម្លៃត្រូវបានកែសម្រួលដោយជោគជ័យ!', 'success');
    } catch (error) {
      console.error('Error updating discount:', error);
      showAlert('បរាជ័យក្នុងការកែសម្រួលការបញ្ចុះតម្លៃ.', 'error');
    }
  };

  const handleDelete = (item) => {
    setItemToDelete(item);
    setShowDeleteConfirm(true);
  };

  const handleDeleteDiscount = async (id) => {
    try {
      const response = await fetch(`${endpoints.discounts}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete discount');
      }

      fetchDiscounts();
      showAlert('ការបញ្ចុះតម្លៃត្រូវបានលុបដោយជោគជ័យ!', 'success');
    } catch (error) {
      console.error('Error deleting discount:', error);
      showAlert('បរាជ័យក្នុងការលុបការបញ្ចុះតម្លៃ.', 'error');
    }
  };

  const handleDeleteOrder = (order) => {
    setOrderToDelete(order);
    setShowOrderDeleteConfirm(true);
  };

  const confirmDeleteOrder = async () => {
    if (orderToDelete) {
      try {
        const response = await fetch(`${endpoints.orders}/${orderToDelete.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete order');
        }

        setOrders(orders.filter(order => order.id !== orderToDelete.id));
        showAlert('ការកម្ម៉ង់ត្រូវបានលុបដោយជោគជ័យ!', 'success');
      } catch (error) {
        console.error('Error deleting order:', error);
        showAlert('បរាជ័យក្នុងការលុបការកម្ម៉ង់.', 'error');
      } finally {
        setShowOrderDeleteConfirm(false);
        setOrderToDelete(null);
      }
    }
  };

  const cancelDeleteOrder = () => {
    setShowOrderDeleteConfirm(false);
    setOrderToDelete(null);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        const response = await fetch(`${endpoints.menuItems}/${itemToDelete.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete item');
        }

        setMenuItems(menuItems.filter(item => item.id !== itemToDelete.id));
        showAlert('មុខម្ហូបត្រូវបានលុបដោយជោគជ័យ!', 'success');
      } catch (error) {
        console.error('Error deleting menu item:', error);
        showAlert('បរាជ័យក្នុងការលុបមុខម្ហូប.', 'error');
      } finally {
        setShowDeleteConfirm(false);
        setItemToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-['Noto_Sans_Khmer']">
      <DashboardNavbar />
      <div className="pt-20 p-8">
        <div className="max-w-7xl mx-auto bg-white p-10 rounded-xl shadow-lg">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center border-b-2 pb-4 border-gray-200 font-['Noto_Sans_Khmer']">គ្រប់គ្រងមុខម្ហូប</h1>

        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => { setShowAddForm(!showAddForm); setEditingItem(null); }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors duration-200 shadow-md font-['Noto_Sans_Khmer']"
          >
            {showAddForm ? 'បិទ Form បន្ថែម' : 'បន្ថែមមុខម្ហូបថ្មី'}
          </button>
          <button
            onClick={() => setShowOrders(!showOrders)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition-colors duration-200 shadow-md font-['Noto_Sans_Khmer']"
          >
            {showOrders ? 'បិទការកម្ម៉ង់' : 'មើលការកម្ម៉ង់'}
          </button>
          <button
            onClick={() => { setShowDiscountForm(!showDiscountForm); setEditingDiscount(null); }}
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded-full transition-colors duration-200 shadow-md font-['Noto_Sans_Khmer']"
          >
            {showDiscountForm ? 'បិទ Form បញ្ចុះតម្លៃ' : 'បង្កើតការបញ្ចុះតម្លៃ'}
          </button>
          {editingItem && (
            <button
              onClick={() => setEditingItem(null)}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-full transition-colors duration-200 shadow-md font-['Noto_Sans_Khmer']"
            >
              បោះបង់ការកែសម្រួល
            </button>
          )}
        </div>

        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate__animated animate__fadeIn">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl animate__animated animate__zoomIn">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center font-['Noto_Sans_Khmer']">បន្ថែមមុខម្ហូបថ្មី</h3>
              <form onSubmit={handleAddSubmit} className="space-y-6">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 font-['Noto_Sans_Khmer']">ឈ្មោះ</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newItem.name}
                    onChange={handleAddChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-['Noto_Sans_Khmer']"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2 font-['Noto_Sans_Khmer']">ការពិពណ៌នា</label>
                  <textarea
                    id="description"
                    name="description"
                    value={newItem.description}
                    onChange={handleAddChange}
                    rows="3"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-['Noto_Sans_Khmer']"
                    required
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2 font-['Noto_Sans_Khmer']">តម្លៃ</label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={newItem.price}
                    onChange={handleAddChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-['Noto_Sans_Khmer']"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2 font-['Noto_Sans_Khmer']">URL រូបភាព</label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={newItem.image}
                    onChange={handleAddChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-['Noto_Sans_Khmer']"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 font-['Noto_Sans_Khmer']"
                  >
                    បន្ថែមមុខម្ហូប
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 font-['Noto_Sans_Khmer']"
                  >
                    បោះបង់
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {editingItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate__animated animate__fadeIn">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl animate__animated animate__zoomIn">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center font-['Noto_Sans_Khmer']">កែសម្រួលមុខម្ហូប</h3>
              <form onSubmit={handleUpdateSubmit} className="space-y-6">
                <div className="mb-4">
                  <label htmlFor="edit-name" className="block text-gray-700 text-sm font-bold mb-2 font-['Noto_Sans_Khmer']">ឈ្មោះ</label>
                  <input
                    type="text"
                    id="edit-name"
                    name="name"
                    value={editingItem.name}
                    onChange={handleEditChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-['Noto_Sans_Khmer']"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="edit-description" className="block text-gray-700 text-sm font-bold mb-2 font-['Noto_Sans_Khmer']">ការពិពណ៌នា</label>
                  <textarea
                    id="edit-description"
                    name="description"
                    value={editingItem.description}
                    onChange={handleEditChange}
                    rows="3"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-['Noto_Sans_Khmer']"
                    required
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label htmlFor="edit-price" className="block text-gray-700 text-sm font-bold mb-2 font-['Noto_Sans_Khmer']">តម្លៃ</label>
                  <input
                    type="text"
                    id="edit-price"
                    name="price"
                    value={editingItem.price}
                    onChange={handleEditChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-['Noto_Sans_Khmer']"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="edit-image" className="block text-gray-700 text-sm font-bold mb-2 font-['Noto_Sans_Khmer']">URL រូបភាព</label>
                  <input
                    type="text"
                    id="edit-image"
                    name="image"
                    value={editingItem.image}
                    onChange={handleEditChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-['Noto_Sans_Khmer']"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 font-['Noto_Sans_Khmer']"
                  >
                    រក្សាទុកការកែប្រែ
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 font-['Noto_Sans_Khmer']"
                  >
                    បោះបង់
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showDiscountForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate__animated animate__fadeIn">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl animate__animated animate__zoomIn">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center font-['Noto_Sans_Khmer']">បង្កើតការបញ្ចុះតម្លៃថ្មី</h3>
              <form onSubmit={handleAddDiscountSubmit} className="space-y-6">
                <div className="mb-4">
                  <label htmlFor="discount-name" className="block text-gray-700 text-sm font-bold mb-2 font-['Noto_Sans_Khmer']">ឈ្មោះការបញ្ចុះតម្លៃ</label>
                  <input
                    type="text"
                    id="discount-name"
                    name="name"
                    value={newDiscount.name}
                    onChange={handleAddDiscountChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-['Noto_Sans_Khmer']"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="discount-type" className="block text-gray-700 text-sm font-bold mb-2 font-['Noto_Sans_Khmer']">ប្រភេទការបញ្ចុះតម្លៃ</label>
                  <select
                    id="discount-type"
                    name="type"
                    value={newDiscount.type}
                    onChange={handleAddDiscountChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-['Noto_Sans_Khmer']"
                  >
                    <option value="percentage">ភាគរយ (%)</option>
                    <option value="fixed">ចំនួនថេរ ($)</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="discount-value" className="block text-gray-700 text-sm font-bold mb-2 font-['Noto_Sans_Khmer']">តម្លៃ</label>
                  <input
                    type="number"
                    id="discount-value"
                    name="value"
                    value={newDiscount.value}
                    onChange={handleAddDiscountChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-['Noto_Sans_Khmer']"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="discount-start-date" className="block text-gray-700 text-sm font-bold mb-2 font-['Noto_Sans_Khmer']">ថ្ងៃចាប់ផ្តើម</label>
                  <input
                    type="datetime-local"
                    id="discount-start-date"
                    name="startDate"
                    value={newDiscount.startDate}
                    onChange={handleAddDiscountChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-['Noto_Sans_Khmer']"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="discount-end-date" className="block text-gray-700 text-sm font-bold mb-2 font-['Noto_Sans_Khmer']">ថ្ងៃបញ្ចប់</label>
                  <input
                    type="datetime-local"
                    id="discount-end-date"
                    name="endDate"
                    value={newDiscount.endDate}
                    onChange={handleAddDiscountChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-['Noto_Sans_Khmer']"
                    required
                  />
                </div>
                <div className="mb-6 flex items-center">
                  <input
                    type="checkbox"
                    id="discount-active"
                    name="active"
                    checked={newDiscount.active}
                    onChange={handleAddDiscountChange}
                    className="mr-2 leading-tight"
                  />
                  <label htmlFor="discount-active" className="text-sm font-bold text-gray-700 font-['Noto_Sans_Khmer']">ធ្វើឱ្យសកម្ម</label>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 font-['Noto_Sans_Khmer']"
                  >
                    បង្កើតការបញ្ចុះតម្លៃ
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDiscountForm(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 font-['Noto_Sans_Khmer']"
                  >
                    បោះបង់
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {editingDiscount && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate__animated animate__fadeIn">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl animate__animated animate__zoomIn">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center font-['Noto_Sans_Khmer']">កែសម្រួលការបញ្ចុះតម្លៃ</h3>
              <form onSubmit={handleUpdateDiscountSubmit} className="space-y-6">
                <div className="mb-4">
                  <label htmlFor="edit-discount-name" className="block text-gray-700 text-sm font-bold mb-2 font-['Noto_Sans_Khmer']">ឈ្មោះការបញ្ចុះតម្លៃ</label>
                  <input
                    type="text"
                    id="edit-discount-name"
                    name="name"
                    value={editingDiscount.name}
                    onChange={handleEditDiscountChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-['Noto_Sans_Khmer']"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="edit-discount-type" className="block text-gray-700 text-sm font-bold mb-2 font-['Noto_Sans_Khmer']">ប្រភេទការបញ្ចុះតម្លៃ</label>
                  <select
                    id="edit-discount-type"
                    name="type"
                    value={editingDiscount.type}
                    onChange={handleEditDiscountChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-['Noto_Sans_Khmer']"
                  >
                    <option value="percentage">ភាគរយ (%)</option>
                    <option value="fixed">ចំនួនថេរ ($)</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="edit-discount-value" className="block text-gray-700 text-sm font-bold mb-2 font-['Noto_Sans_Khmer']">តម្លៃ</label>
                  <input
                    type="number"
                    id="edit-discount-value"
                    name="value"
                    value={editingDiscount.value}
                    onChange={handleEditDiscountChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-['Noto_Sans_Khmer']"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="edit-discount-start-date" className="block text-gray-700 text-sm font-bold mb-2 font-['Noto_Sans_Khmer']">ថ្ងៃចាប់ផ្តើម</label>
                  <input
                    type="datetime-local"
                    id="edit-discount-start-date"
                    name="startDate"
                    value={editingDiscount.startDate}
                    onChange={handleEditDiscountChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-['Noto_Sans_Khmer']"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="edit-discount-end-date" className="block text-gray-700 text-sm font-bold mb-2 font-['Noto_Sans_Khmer']">ថ្ងៃបញ្ចប់</label>
                  <input
                    type="datetime-local"
                    id="edit-discount-end-date"
                    name="endDate"
                    value={editingDiscount.endDate}
                    onChange={handleEditDiscountChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-['Noto_Sans_Khmer']"
                    required
                  />
                </div>
                <div className="mb-6 flex items-center">
                  <input
                    type="checkbox"
                    id="edit-discount-active"
                    name="active"
                    checked={editingDiscount.active}
                    onChange={handleEditDiscountChange}
                    className="mr-2 leading-tight"
                  />
                  <label htmlFor="edit-discount-active" className="text-sm font-bold text-gray-700 font-['Noto_Sans_Khmer']">ធ្វើឱ្យសកម្ម</label>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 font-['Noto_Sans_Khmer']"
                  >
                    រក្សាទុកការកែប្រែ
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingDiscount(null)}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 font-['Noto_Sans_Khmer']"
                  >
                    បោះបង់
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div id="discounts-section" className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 font-['Noto_Sans_Khmer']">បញ្ជីការបញ្ចុះតម្លៃ</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Noto_Sans_Khmer']">ឈ្មោះ</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Noto_Sans_Khmer']">ប្រភេទ</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Noto_Sans_Khmer']">តម្លៃ</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Noto_Sans_Khmer']">ថ្ងៃចាប់ផ្តើម</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Noto_Sans_Khmer']">ថ្ងៃបញ្ចប់</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Noto_Sans_Khmer']">សកម្ម</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-['Noto_Sans_Khmer']">សកម្មភាព</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 font-['Noto_Sans_Khmer']">
                {discounts.map((discount) => (
                  <tr key={discount.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{discount.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{discount.type === 'percentage' ? 'ភាគរយ' : 'ចំនួនថេរ'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{discount.type === 'percentage' ? `${discount.value}%` : `$${discount.value.toFixed(2)}`}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(discount.startDate).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(discount.endDate).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{discount.active ? 'បាទ/ចាស' : 'ទេ'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setEditingDiscount(discount)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4 font-medium font-['Noto_Sans_Khmer']"
                      >
                        កែសម្រួល
                      </button>
                      <button
                        onClick={() => handleDeleteDiscount(discount.id)}
                        className="text-red-600 hover:text-red-900 font-medium font-['Noto_Sans_Khmer']"
                      >
                        លុប
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div id="menu-section" className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 font-['Noto_Sans_Khmer']">បញ្ជីមុខម្ហូប</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Noto_Sans_Khmer']">ឈ្មោះ</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Noto_Sans_Khmer']">ការពិពណ៌នា</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Noto_Sans_Khmer']">តម្លៃ</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Noto_Sans_Khmer']">រូបភាព</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-['Noto_Sans_Khmer']">សកម្មភាព</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 font-['Noto_Sans_Khmer']">
                {menuItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-['Noto_Sans_Khmer']">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-['Noto_Sans_Khmer']">{item.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-['Noto_Sans_Khmer']">{item.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <img src={item.image} alt={item.name} className="h-10 w-10 rounded-full object-cover" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => { setEditingItem(item); setShowAddForm(false); }}
                        className="text-indigo-600 hover:text-indigo-900 mr-4 font-medium font-['Noto_Sans_Khmer']"
                      >
                        កែសម្រួល
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="text-red-600 hover:text-red-900 font-medium font-['Noto_Sans_Khmer']"
                      >
                        លុប
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showOrders && (
          <div id="orders-section" className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 font-['Noto_Sans_Khmer']">បញ្ជីការកម្ម៉ង់</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Noto_Sans_Khmer']">លេខសម្គាល់ការកម្ម៉ង់</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Noto_Sans_Khmer']">មុខម្ហូប</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Noto_Sans_Khmer']">ឈ្មោះអតិថិជន</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Noto_Sans_Khmer']">លេខទូរស័ព្ទ</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Noto_Sans_Khmer']">ទីតាំង</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Noto_Sans_Khmer']">ចំនួន</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Noto_Sans_Khmer']">កំណត់ចំណាំ</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Noto_Sans_Khmer']">ថ្ងៃកម្ម៉ង់</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Noto_Sans_Khmer']">បញ្ចុះតម្លៃ?</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Noto_Sans_Khmer']">ចំនួនបញ្ចុះតម្លៃ</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-['Noto_Sans_Khmer']">តម្លៃចុងក្រោយ</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-['Noto_Sans_Khmer']">សកម្មភាព</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 font-['Noto_Sans_Khmer']">
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.menuItemName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerPhone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.notes || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.orderDate).toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.discountApplied ? 'បាទ/ចាស' : 'ទេ'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.discountAmount ? order.discountAmount.toFixed(2) : '0.00'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">${order.finalPrice ? order.finalPrice.toFixed(2) : (order.menuItemPrice * order.quantity).toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDeleteOrder(order)}
                          className="text-red-600 hover:text-red-900 font-medium font-['Noto_Sans_Khmer']"
                        >
                          លុប
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {showDeleteConfirm && (itemToDelete) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate__animated animate__fadeIn">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm animate__animated animate__zoomIn">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center font-['Noto_Sans_Khmer']">បញ្ជាក់ការលុប</h2>
              <p className="text-gray-700 mb-6 text-center font-['Noto_Sans_Khmer']">តើអ្នកពិតជាចង់លុបមុខម្ហូប <span className="font-semibold">{itemToDelete.name}</span> នេះមែនទេ?</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={confirmDelete}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 font-['Noto_Sans_Khmer']"
                >
                  បាទ/ចាស
                </button>
                <button
                  onClick={cancelDelete}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 font-['Noto_Sans_Khmer']"
                >
                  ទេ
                </button>
              </div>
            </div>
          </div>
        )}

        {showOrderDeleteConfirm && (orderToDelete) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate__animated animate__fadeIn">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm animate__animated animate__zoomIn">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center font-['Noto_Sans_Khmer']">បញ្ជាក់ការលុប</h2>
              <p className="text-gray-700 mb-6 text-center font-['Noto_Sans_Khmer']">តើអ្នកពិតជាចង់លុបការកម្ម៉ង់ <span className="font-semibold">{orderToDelete.id}</span> នេះមែនទេ?</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={confirmDeleteOrder}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 font-['Noto_Sans_Khmer']"
                >
                  បាទ/ចាស
                </button>
                <button
                  onClick={cancelDeleteOrder}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 font-['Noto_Sans_Khmer']"
                >
                  ទេ
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
