import React from 'react'
import { useNavigate } from "react-router-dom"

const CancelButton = ({buttonClassName}) => {
    const navigate = useNavigate()
    const cancelForm = (e) => {
        navigate("/" )
    }
    return (
  
            <button type="button" onClick={cancelForm} className={buttonClassName}>Cancel</button>
  
    )
};
export default CancelButton;