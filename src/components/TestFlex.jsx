import { useState, Input } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "../css/TestFlex.css"

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const schema = z.object({
    artistName: z.string().min(1, { message: " * Artist Name is required!" }),
    albumName: z.string().min(1, { message: " * Album Name is required!" }),
    yearReleased: z.string().min(1, { message: " * Year Released is required!" }),
    albumPrice: z.string().min(1, { message: " * Album Price is required!" }),
    imageAlbumCover: z.any()
        .refine((imageAlbumCover) => imageAlbumCover?.length >= 1, { message: ' * Image Album Cover is required!' })  //this message remains once shown until resubmit?
        .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), "Only .jpg, .jpeg, .png and .webp formats are supported."
        )
})
function TestFlex() {
    const [imagePreview, setImagePreview] = useState("");
    const navigate = useNavigate();
    const {     
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schema)
    });
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setFormData({ ...formData, imageAlbumCover: selectedImage });
        setImagePreview(URL.createObjectURL(selectedImage));
    };
    const [formData, setFormData] = useState({
        artistName: '',
        albumName: '',
        yearReleased: '',
        albumPrice: '',
        imageAlbumCover: ''
    });
    const onSubmit = async (data) => {
        //adding param names to they match Spring @RequestParams
        const albumData = new FormData();
        albumData.append('file', formData.imageAlbumCover);
        albumData.append('artistName', data.artistName);
        albumData.append('albumName', data.albumName);
        albumData.append('yearReleased', data.yearReleased);
        albumData.append('albumPrice', data.albumPrice);

        if (albumData) {
            fetch("http://localhost:8080/v1/music/service/insert/album/", {
                method: "POST",
                body: albumData
            })
            navigate('/');
        } else {
            //add message
        }
    };
    const cancelForm = (e) => {
        navigate("/")
    };
    return (
        <div className="content-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="create-album-title">Create New Album</h2>
                <div className="create-album-table" role="table">
                    <div className="row heading">
                        <div className="cell"></div>
                        <div className="cell"></div>
                    </div>
                    <div className="row">
                        <div className="cell">
                            <label className="input-field-artistName">Artist Name:</label>
                            <input {...register("artistName")} autoFocus type="text" size="120" maxLength="150" placeholder="Oasis" />
                        </div>
                        <div className="cell">
                            <div className="cell-error">
                                {errors.artistName && (
                                    <div className="error">{errors.artistName.message}</div>
                                )}
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="cell">
                            <label className="input-field-albumName">Album Name:</label>
                            <input {...register("albumName")} type="text" size="120" maxLength="150" placeholder="Be Here Now" />
                        </div>
                        <div className="cell">
                            <div className="cell-error">
                                {errors.albumName && (
                                    <div className="error">{errors.albumName.message}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="cell">
                            <label className="input-field-yearReleased">Year Released:</label>
                            <input {...register("yearReleased")} type="text" size="120" maxLength="150" placeholder="1994" />
                        </div>
                        <div className="cell">
                            <div className="cell-error">
                                {errors.yearReleased && (
                                    <div className="error">{errors.yearReleased.message}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="cell">
                            <label type="text" className="input-field-albumPrice">Image Path:</label>
                            <input {...register("albumPrice")} type="text" size="120" maxLength="150" placeholder="9.99" />
                        </div>

                        <div className="cell">
                            <div className="cell-error">
                                {errors.albumPrice && (
                                    <div className="error">{errors.albumPrice.message}</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="cell">
                            <label className="input-field-imageAlbumCover">Image Album Cover:</label>
                            <input
                                {...register("imageAlbumCover")}
                                type="file"
                                id="imageAlbumCover"
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
                        <div className="cell">
                            <div className="cell-error">
                                {errors.imageAlbumCover && (
                                    <div className="error">{errors.imageAlbumCover.message}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='create-album-submit-container'>
                    <button className='create-album-submit-button' onClick={handleSubmit} type="submit">Submit Album</button>
                    <button className='cancel-create-album-submit-button' onClick={cancelForm} type="button">Cancel</button>
                </div>
            </form>
        </div>
    )
};
export default TestFlex;