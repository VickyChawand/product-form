import React from "react";
import './submit.css'

const Submit = ({handleSubmit}) =>{
    return(
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Delivery on the way</h2>
                <p>Shop with us again. Happy Shopping!!</p>
            </div>
            <button onClick={handleSubmit} id="submit-btn">Got it</button>
        </div>
    )
}

export default Submit