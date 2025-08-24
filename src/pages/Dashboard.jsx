import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '', image: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [alert, setAlert] = useState(null); // { message: '', type: 'success' | 'error' }

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 3000); // Clear alert after 3 seconds
  };

  const fetchMenuItems = () => {
    fetch('http://localhost:3000/menuItems')
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => {
        console.error('Error fetching menu items:', error);
        showAlert('បរាជ័យក្នុងការទាញយកមុខម្ហូប.', 'error');
      });
  };

  const handleAddChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/menuItems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
      .then(response => response.json())
      .then(addedItem => {
        setMenuItems([...menuItems, addedItem]);
        setNewItem({ name: '', description: '', price: '', image: '' });
        setShowAddForm(false);
        showAlert('មុខម្ហូបត្រូវបានបន្ថែមដោយជោគជ័យ!', 'success');
      })
      .catch(error => {
        console.error('Error adding menu item:', error);
        showAlert('បរាជ័យក្នុងការបន្ថែមមុខម្ហូប.', 'error');
      });
  };

  const handleEditChange = (e) => {
    setEditingItem({ ...editingItem, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/menuItems/${editingItem.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingItem),
    })
      .then(response => response.json())
      .then(updatedItem => {
        setMenuItems(menuItems.map(item => (item.id === updatedItem.id ? updatedItem : item)));
        setEditingItem(null);
        showAlert('មុខម្ហូបត្រូវបានកែសម្រួលដោយជោគជ័យ!', 'success');
      })
      .catch(error => {
        console.error('Error updating menu item:', error);
        showAlert('បរាជ័យក្នុងការកែសម្រួលមុខម្ហូប.', 'error');
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/menuItems/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setMenuItems(menuItems.filter(item => item.id !== id));
        showAlert('មុខម្ហូបត្រូវបានលុបដោយជោគជ័យ!', 'success');
      })
      .catch(error => {
        console.error('Error deleting menu item:', error);
        showAlert('បរាជ័យក្នុងការលុបមុខម្ហូប.', 'error');
      });
  };

  return (
    <div className="mt-16 p-8 bg-gray-50 min-h-screen font-['Noto_Sans_Khmer']">
      <div className="max-w-7xl mx-auto bg-white p-10 rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center border-b-2 pb-4 border-gray-200 font-['Noto_Sans_Khmer']">គ្រប់គ្រងមុខម្ហូប</h1>

        {alert && (
          <div className={`mb-4 p-3 rounded-md text-white ${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'} font-['Noto_Sans_Khmer']`}>
            {alert.message}
          </div>
        )}

        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => { setShowAddForm(!showAddForm); setEditingItem(null); }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-colors duration-200 shadow-md font-['Noto_Sans_Khmer']"
          >
            {showAddForm ? 'បិទ Form បន្ថែម' : 'បន្ថែមមុខម្ហូបថ្មី'}
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
          <form onSubmit={handleAddSubmit} className="bg-gray-50 p-6 rounded-lg shadow-inner mb-8 max-w-2xl mx-auto space-y-6 border border-gray-200 font-['Noto_Sans_Khmer']">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center font-['Noto_Sans_Khmer']">បន្ថែមមុខម្ហូបថ្មី</h3>
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1 font-['Noto_Sans_Khmer']">ឈ្មោះ</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newItem.name}
                onChange={handleAddChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-base font-['Noto_Sans_Khmer']"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1 font-['Noto_Sans_Khmer']">ការពិពណ៌នា</label>
              <textarea
                id="description"
                name="description"
                value={newItem.description}
                onChange={handleAddChange}
                rows="3"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-base font-['Noto_Sans_Khmer']"
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-1 font-['Noto_Sans_Khmer']">តម្លៃ</label>
              <input
                type="text"
                id="price"
                name="price"
                value={newItem.price}
                onChange={handleAddChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-base font-['Noto_Sans_Khmer']"
                required
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-1 font-['Noto_Sans_Khmer']">URL រូបភាព</label>
              <input
                type="text"
                id="image"
                name="image"
                value={newItem.image}
                onChange={handleAddChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-base font-['Noto_Sans_Khmer']"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-4 rounded-full transition-colors duration-200 shadow-md font-['Noto_Sans_Khmer']"
            >
              បន្ថែមមុខម្ហូប
            </button>
          </form>
        )}

        {editingItem && (
          <form onSubmit={handleUpdateSubmit} className="bg-gray-50 p-6 rounded-lg shadow-inner mb-8 max-w-2xl mx-auto space-y-6 border border-gray-200 font-['Noto_Sans_Khmer']">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center font-['Noto_Sans_Khmer']">កែសម្រួលមុខម្ហូប</h3>
            <div>
              <label htmlFor="edit-name" className="block text-sm font-semibold text-gray-700 mb-1 font-['Noto_Sans_Khmer']">ឈ្មោះ</label>
              <input
                type="text"
                id="edit-name"
                name="name"
                value={editingItem.name}
                onChange={handleEditChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-base font-['Noto_Sans_Khmer']"
                required
              />
            </div>
            <div>
              <label htmlFor="edit-description" className="block text-sm font-semibold text-gray-700 mb-1 font-['Noto_Sans_Khmer']">ការពិពណ៌នា</label>
              <textarea
                id="edit-description"
                name="description"
                value={editingItem.description}
                onChange={handleEditChange}
                rows="3"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-base font-['Noto_Sans_Khmer']"
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="edit-price" className="block text-sm font-semibold text-gray-700 mb-1 font-['Noto_Sans_Khmer']">តម្លៃ</label>
              <input
                type="text"
                id="edit-price"
                name="price"
                value={editingItem.price}
                onChange={handleEditChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-base font-['Noto_Sans_Khmer']"
                required
              />
            </div>
            <div>
              <label htmlFor="edit-image" className="block text-sm font-semibold text-gray-700 mb-1 font-['Noto_Sans_Khmer']">URL រូបភាព</label>
              <input
                type="text"
                id="edit-image"
                name="image"
                value={editingItem.image}
                onChange={handleEditChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-base font-['Noto_Sans_Khmer']"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-4 rounded-full transition-colors duration-200 shadow-md font-['Noto_Sans_Khmer']"
            >
              រក្សាទុកការកែប្រែ
            </button>
          </form>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
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
                        onClick={() => handleDelete(item.id)}
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
      </div>
    </div>
  );
};

export default Dashboard;
