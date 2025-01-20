import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UnitForm = ({ shopName, onFormSubmit }) => {
    const [newUnit, setNewUnit] = useState('');
    const [oldUnit, setOldUnit] = useState('');
    const [unitCharge, setUnitCharge] = useState(10); // Default unit charge is 10
    const [rent, setRent] = useState('');
    const [total, setTotal] = useState(null); // Added state for total
    const [calculatedUnit, setCalculatedUnit] = useState(null); // State for unit difference
    const [multipliedUnit, setMultipliedUnit] = useState(null); // State for multiplied unit
    const [date, setDate] = useState(new Date().toLocaleDateString()); // Default to today's date
    const [editItem, setEditItem] = useState(null); // State for editing item

    useEffect(() => {
        if (editItem) {
            setNewUnit(editItem.newUnit);
            setOldUnit(editItem.oldUnit);
            setUnitCharge(editItem.unitCharge);
            setRent(editItem.rent);
            setDate(editItem.date);
        }
    }, [editItem]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate that all inputs are numbers
        const newUnitNum = parseFloat(newUnit);
        const oldUnitNum = parseFloat(oldUnit);
        const rentNum = parseFloat(rent);
        const unitChargeNum = parseFloat(unitCharge);

        if (isNaN(newUnitNum) || isNaN(oldUnitNum) || isNaN(rentNum) || isNaN(unitChargeNum) || unitChargeNum < 0) {
            alert('Please enter valid numbers for all fields!');
            return;
        }
        if (newUnitNum < oldUnitNum) {
            alert('New unit should be greater than old unit');
            return;
        }

        // Calculate the unit difference
        const calculatedUnitValue = newUnitNum - oldUnitNum;
        setCalculatedUnit(calculatedUnitValue); // Update calculatedUnit state

        // Multiply the unit difference by unitCharge
        const multipliedUnitValue = calculatedUnitValue * unitChargeNum;
        setMultipliedUnit(multipliedUnitValue); // Update multipliedUnit state

        // Add rent to the result of multiplyUnit to get the final total
        const calculatedTotal = multipliedUnitValue + rentNum;
        setTotal(calculatedTotal); // Update total state

        try {
            if (editItem) {
                // Update existing item
                await axios.put(`https://user-e0bf5-default-rtdb.firebaseio.com/Unit/${editItem.id}.json`, {
                    newUnit,
                    oldUnit,
                    unitCharge: unitChargeNum,
                    rent,
                    total: calculatedTotal,
                    date,
                    shop: shopName,
                });
            } else {
                // Add new item
                await axios.post('https://user-e0bf5-default-rtdb.firebaseio.com/Unit.json', {
                    newUnit,
                    oldUnit,
                    unitCharge: unitChargeNum,
                    rent,
                    total: calculatedTotal,
                    date,
                    shop: shopName,
                });
            }

            // Reset form
            setNewUnit('');
            setOldUnit('');
            setUnitCharge(10);
            setRent('');
            setTotal(null);
            setCalculatedUnit(null);
            setMultipliedUnit(null);
            setDate(new Date().toLocaleDateString());
            setEditItem(null);
            onFormSubmit();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="w-full max-w-xs mx-auto p-4 border rounded">
            <h2 className="text-xl font-bold mb-4">{shopName} Unit Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label>New Unit:</label>
                    <input
                        type="number"
                        value={newUnit}
                        onChange={(e) => setNewUnit(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label>Old Unit:</label>
                    <input
                        type="number"
                        value={oldUnit}
                        onChange={(e) => setOldUnit(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label>Unit Charge:</label>
                    <input
                        type="number"
                        value={unitCharge}
                        onChange={(e) => setUnitCharge(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label>Rent:</label>
                    <input
                        type="number"
                        value={rent}
                        onChange={(e) => setRent(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {editItem ? 'Update' : 'Submit'}
                </button>
            </form>

            {/* Display intermediate calculations and total */}
            {calculatedUnit !== null && multipliedUnit !== null && total !== null && (
                <div className="mt-4 p-4 bg-gray-100 border rounded">
                    <p>
                        <strong>New Unit - Old Unit:</strong> {calculatedUnit}
                    </p>
                    <p>
                        <strong>Calculated Unit * Unit Charge:</strong> {multipliedUnit}
                    </p>
                    <p>
                        <strong>Total (Including Rent):</strong> {total}
                    </p>
                </div>
            )}
        </div>
    );
};

export default UnitForm;
