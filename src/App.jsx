import { useState } from 'react';
import UnitForm from './Components/Pages/UnitForm';
import Fetchdata from './Components/Pages/Fetchdata';

const App = () => {
    const [selectedShop, setSelectedShop] = useState('Restaurant');

    const handleShopChange = (shop) => {
        setSelectedShop(shop);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 sm:p-4">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                Multi-Shop Management
            </h1>
            <div className="flex flex-wrap justify-center space-x-4 mb-8">
                <button
                    onClick={() => handleShopChange('Restaurant')}
                    className={`px-6 py-2 font-medium rounded-lg shadow-md ${
                        selectedShop === 'Restaurant'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-800 hover:bg-blue-300'
                    }`}
                >
                    Restaurant
                </button>
                <button
                    onClick={() => handleShopChange('Sardar Ji shop')}
                    className={`px-6 py-2 font-medium rounded-lg shadow-md ${
                        selectedShop === 'Sardar Ji shop'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-800 hover:bg-blue-300'
                    }`}
                >
                    Sardar Ji Shop
                </button>
                <button
                    onClick={() => handleShopChange('Checking Purpose')}
                    className={`px-6 py-2 font-medium rounded-lg shadow-md ${
                        selectedShop === 'Checking Purpose'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-800 hover:bg-blue-300'
                    }`}
                >
                    Only for Checking Puprpose
                </button>
            </div>

            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <UnitForm shopName={selectedShop} />
            </div>
            <div className="max-w-4xl mx-auto bg-white p-6 mt-6 rounded-lg shadow-lg">
                <Fetchdata shopName={selectedShop} />
            </div>
        </div>
    );
};

export default App;
