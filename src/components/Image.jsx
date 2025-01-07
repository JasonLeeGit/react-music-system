const Image = ({label, handleImageChange, imagePreview}) => {
    return (
        <div>
            <label>{label}</label>
            <input
                type="file"
                name="imageAlbumCover"
                className="form-control-create"
                onChange={handleImageChange}
            />
            {imagePreview && (
                <img
                    src={imagePreview}
                    alt="Preview Album Cover"
                    style={{ maxWidth: "250px", maxHeight: "250px" }}
                />
            )}
        </div>
    )
}
export default Image;