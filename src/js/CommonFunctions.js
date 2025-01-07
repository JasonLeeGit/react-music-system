const validateFormData = (validationErrors, formData) => {

    if (!formData.artistName.trim()) {
        const error = document.querySelector('input.input-field-artistName')
        error.classList.add('highlight')
        validationErrors.artistName = "* Artist Name is required!"
    } else {
        const error = document.querySelector('input.input-field-artistName')
        error.classList.remove('highlight')
    }
    if (!formData.albumName.trim()) {
        const error = document.querySelector('input.input-field-albumName')
        error.classList.add('highlight')
        validationErrors.albumName = "* Album Name is required!"
    } else {
        const error = document.querySelector('input.input-field-albumName')
        error.classList.remove('highlight')
    }
    if (!formData.yearReleased.trim()) {
        const error = document.querySelector('input.input-field-yearReleased')
        error.classList.add('highlight')
        validationErrors.yearReleased = "* Released Year is required!"
    } else {
        const error = document.querySelector('input.input-field-yearReleased')
        error.classList.remove('highlight')
    }
    if (!formData.imagePath.trim()) {
        const error = document.querySelector('input.input-field-imagePath')
        error.classList.add('highlight')
        validationErrors.imagePath = "* Image Path is required!"
    } else {
        const error = document.querySelector('input.input-field-imagePath')
        error.classList.remove('highlight')
    }
}

module.exports = {
    validateFormData
}