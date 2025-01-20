import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FetchData = ({ shopName }) => {
    const [data, setData] = useState([]);
    const [editItem, setEditItem] = useState(null);

    // Function to fetch data from Firebase
    async function FetchData() {
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

    // Function to delete data from Firebase
    async function deleteItem(id) {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                await axios.delete(`https://user-e0bf5-default-rtdb.firebaseio.com/Unit/${id}.json`);
                setData(prevData => prevData.filter(item => item.id !== id));
            } catch (error) {
                console.log("Error deleting data:", error);
            }
        }
    }

    // Function to edit data
    function editItemClick(item) {
        setEditItem(item);
    }

    // Fetch data when the component is mounted or when the shop changes
    useEffect(() => {
        FetchData();
    }, [shopName]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">{shopName} Fetched Data</h2>
            {data.length > 0 ? (
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">New Unit</th>
                            <th className="border px-4 py-2">Old Unit</th>
                            <th className="border px-4 py-2">Unit Charge</th>
                            <th className="border px-4 py-2">Rent</th>
                            <th className="border px-4 py-2">Total</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td className="border px-4 py-2">{item.date}</td>
                                <td className="border px-4 py-2">{item.newUnit}</td>
                                <td className="border px-4 py-2">{item.oldUnit}</td>
                                <td className="border px-4 py-2">{item.unitCharge}</td>
                                <td className="border px-4 py-2">{item.rent}</td>
                                <td className="border px-4 py-2">{item.total}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="bg-yellow-500 text-white px-4 py-2 mr-2"
                                        onClick={() => editItemClick(item)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2"
                                        onClick={() => deleteItem(item.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
};

export default FetchData;
