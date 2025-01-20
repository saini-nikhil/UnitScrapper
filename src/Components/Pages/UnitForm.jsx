import React, { useState } from 'react';
import axios from 'axios';

const UnitForm = ({ shopName }) => {
    const [newUnit, setNewUnit] = useState('');
    const [oldUnit, setOldUnit] = useState('');
    const [unitCharge, setUnitCharge] = useState(10);
    const [rent, setRent] = useState('');
    const [total, setTotal] = useState(null);
    const [result, setResult] = useState('');
    const [date, setDate] = useState(new Date().toLocaleDateString());

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUnitNum = parseFloat(newUnit);
        const oldUnitNum = parseFloat(oldUnit);
        const rentNum = parseFloat(rent);
        const unitChargeNum = parseFloat(unitCharge);

        if (
            isNaN(newUnitNum) ||
            isNaN(oldUnitNum) ||
            isNaN(rentNum) ||
            isNaN(unitChargeNum) ||
            unitChargeNum < 0
        ) {
            alert('Please enter valid numbers for all fields!');
            return;
        }

        if (newUnitNum < oldUnitNum) {
            alert('New unit should be greater than old unit');
            return;
        }

        const calculatedUnit = newUnitNum - oldUnitNum;
        const multiplyUnit = calculatedUnit * unitChargeNum;
        const calculatedTotal = multiplyUnit + rentNum;

        try {
            const response = await axios.post(
                'https://user-e0bf5-default-rtdb.firebaseio.com/Unit.json',
                {
                    newUnit,
                    oldUnit,
                    unitCharge: unitChargeNum,
                    rent,
                    total: calculatedTotal,
                    date,
                    shop: shopName,
                    multiplyUnit,
                    calculatedUnit
                }
            );
            // console.log('Form submitted successfully:', response.data);
            setTotal(calculatedTotal);
            setResult(
                `(${newUnitNum} - ${oldUnitNum}) = ${calculatedUnit} * ${unitChargeNum} = ${multiplyUnit} + ${rentNum} = ${calculatedTotal}`
            );
            setNewUnit('');
            setOldUnit('');
            setRent('');
            useState(new Date().toLocaleDateString());

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-4">{shopName} Unit Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">New Unit:</label>
                    <input
                        type="number"
                        value={newUnit}
                        onChange={(e) => setNewUnit(e.target.value)}
                        className="mt-2 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Old Unit:</label>
                    <input
                        type="number"
                        value={oldUnit}
                        onChange={(e) => setOldUnit(e.target.value)}
                        className="mt-2 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Unit Charge:</label>
                    <input
                        type="number"
                        value={unitCharge}
                        onChange={(e) => setUnitCharge(e.target.value)}
                        className="mt-2 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Rent:</label>
                    <input
                        type="number"
                        value={rent}
                        onChange={(e) => setRent(e.target.value)}
                        className="mt-2 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="mt-2 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Submit
                </button>
            </form>

            {total !== null && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                    <h3 className="font-semibold text-lg">Result:</h3>
                    <p>{result}</p>
                    <p className="mt-2 font-medium">Date Submitted: {date}</p>
                </div>
            )}
        </div>
    );
};

export default UnitForm;
