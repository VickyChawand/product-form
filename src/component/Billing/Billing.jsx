import React, { useState, useEffect } from "react";
import './billing.css';
import AddressForm from "../Form/Form";

const Billing = () => {
    const [billingAddress, setBillingAddress] = useState({
        Address1: '',
        Address2: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
    });
    
    const [sameAsBilling, setSameAsBilling] = useState(true);
    
    const [shippingAddress, setShippingAddress] = useState({
        Address1: '',
        Address2: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
    });

    useEffect(() => {
        if (sameAsBilling) {
            setShippingAddress(billingAddress);
        }
    }, [billingAddress, sameAsBilling]);

    const handleBillingChange = (field, value) => {
        setBillingAddress(prevState => ({ ...prevState, [field]: value }));
    };

    const handleShippingChange = (field, value) => {
        setShippingAddress(prevState => ({ ...prevState, [field]: value }));
    };

    const handleCheckboxChange = (e) => {
        setSameAsBilling(e.target.checked);
    };

    return (
        <>
        <div className="outter-main">
            <AddressForm
                title="Billing Address"
                address={billingAddress}
                handleChange={handleBillingChange}
            />
            <div className="checkmark">
                <input type="checkbox" checked={sameAsBilling} onChange={handleCheckboxChange} />
                <span className="checkmark">Shipping address same as billing address</span>
            </div>
        </div>
        {!sameAsBilling && (
            <div className="outter-main">
            <AddressForm
                title="Shipping Address"
                address={shippingAddress}
                handleChange={handleShippingChange}
            />
            </div>
        )}
        </>
    );
};

export default Billing;
