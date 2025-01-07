import React from 'react'

const SubmitButton = ({buttonDisabled, handleSubmit, buttonClassName}) => {
    return (
            <button type="submit" disabled={buttonDisabled} onClick={handleSubmit} className={buttonClassName}>Submit Album</button>
    )
};
export default SubmitButton;