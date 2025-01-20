import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FetchData = ({ shopName }) => {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null); // For editing the data

  // Function to fetch data from Firebase
  async function fetchData() {
    try {
      const res = await axios.get('https://user-e0bf5-default-rtdb.firebaseio.com/Unit.json');
      const fetchedData = [];
      for (const key in res.data) {
        fetchedData.push({ id: key, ...res.data[key] });
      }

      // Filter data for the specific shop
      const filteredData = fetchedData.filter(item => item.shop === shopName);
      setData(filteredData.reverse()); // Reverse to show most recent first
    } catch (error) {
      console.log("Error in fetching data:", error);
    }
  }

  // Function to handle delete action
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      try {
        await axios.delete(`https://user-e0bf5-default-rtdb.firebaseio.com/Unit/${id}.json`);
        fetchData(); // Refresh the data after deletion
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  // Function to handle edit action
  const handleEdit = (item) => {
    setEditData(item); // Set the data to be edited in the form
  };

  useEffect(() => {
    fetchData();
  }, [shopName]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">{shopName} Fetched Data</h2>
      {data.length > 0 ? (
        <div className="overflow-x-auto"> {/* Allow horizontal scrolling on smaller screens */}
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">New Unit</th>
                <th className="px-4 py-2 border">Old Unit</th>
                <th className="px-4 py-2 border">Unit Charge</th>
                <th className="px-4 py-2 border">Rent</th>
                <th className="px-4 py-2 border">Total</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2 border">{item.date}</td>
                  <td className="px-4 py-2 border">{item.newUnit}</td>
                  <td className="px-4 py-2 border">{item.oldUnit}</td>
                  <td className="px-4 py-2 border">{item.unitCharge}</td>
                  <td className="px-4 py-2 border">{item.rent}</td>
                  <td className="px-4 py-2 border">{item.total}</td>
                  <td className="px-4 py-2 border">
                    <button 
                      onClick={() => handleEdit(item)} 
                      className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)} 
                      className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
      {editData && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Edit Data</h3>
          {/* Edit Form or Component can be added here */}
          <div>
            <label className="block mb-2">New Unit:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              defaultValue={editData.newUnit}
            />
          </div>
          {/* Additional form fields for editing */}
          <div className="mt-4">
            <button 
              onClick={() => setEditData(null)} 
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button 
              onClick={() => {/* Submit edit logic */}} 
              className="px-4 py-2 bg-blue-500 text-white rounded ml-2"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FetchData;
