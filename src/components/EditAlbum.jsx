import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { confirmAlert } from 'react-confirm-alert';
import CancelButton from './CancelButton'
import SubmitButton from './SubmitButton'
import DeleteButton from './DeleteButton'
import 'react-confirm-alert/src/react-confirm-alert.css';
import "../css/CreateAlbum.css"
import "../css/EditAlbum.css"
import "../css/Error.css"
import "../css/DeleteAlbum.css"

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const schema = z.object({
    artistName: z.string().min(1, { message: "* Artist Name is required!" }),
    albumName: z.string().min(1, { message: "* Album Name is required!" }),
    yearReleased: z.string().min(1, { message: "* Year Released is required!" }),
    albumPrice: z.string().min(1, { message: "* Album Image is required!" }),
    imageAlbumCover: z.any()
        .refine((imageAlbumCover) => imageAlbumCover?.length >= 1, { message: '* Image Album Cover is required.' })  //TODO this message remains once shown?
        .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), "Only .jpg, .jpeg, .png and .webp formats are supported."
        )
});
const EditAlbum = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schema)
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();
    const { artistName } = useParams();
    const { albumName } = useParams();
    const { yearReleased } = useParams();
    const { albumPrice } = useParams();
    const [imagePreview, setImagePreview] = useState("");
    const [formData, setFormData] = useState({
        artistName: artistName,
        albumName: albumName,
        yearReleased: yearReleased,
        albumPrice: albumPrice,
        imageAlbumCover: '',
        newImageAlbumCover: ''
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value

        });
        setButtonDisabled(false);
    };
    const handleImageChange = (e) => {
        let selectedImage = "";
        setImagePreview(""); //clear previous image?
        selectedImage = e.target.files[0];
        setFormData({ ...formData, imageAlbumCover: selectedImage });
        setFormData({ ...formData, newImageAlbumCover: selectedImage });
        setButtonDisabled(false);
        if (selectedImage) {
            setImagePreview(URL.createObjectURL(selectedImage));
        };
    };
    const handleHome = () => {
        navigate('/');
    };
    const handleBack = () => {
        navigate(-1);
    };
    const onSubmit = async (data, e) => {
        e.preventDefault(e);
        const albumData = new FormData();
        albumData.append('id', id);
        albumData.append('file', formData.newImageAlbumCover);
        albumData.append('artistName', data.artistName);
        albumData.append('albumName', data.albumName);
        albumData.append('yearReleased', data.yearReleased);
        albumData.append('albumPrice', data.albumPrice);

        try {
            if (id) {
                const response = await fetch("http://localhost:8080/v1/music/service/update/album/", {
                    method: "PUT",
                    body: albumData
                })
                if (response.ok) {
                    confirmAlert({
                        title: 'Update Success.',
                        buttons: [
                            {
                                label: 'Home',
                                onClick: () => handleHome()
                            }
                        ]
                    });
                }
            } else {
                confirmAlert({
                    title: 'Required Album ID is missing.',
                    buttons: [
                        {
                            label: 'Back',
                            onClick: () => handleHome()
                        }
                    ]
                });
            }
        } catch (error) {
            confirmAlert({
                title: 'Update Failed.',
                message: 'Failed to Update!',
                buttons: [
                    {
                        label: 'Back',
                        onClick: () => handleBack()
                    }
                ]
            });
        }
    };
    return (
        <div className="content-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="edit-album-form-container">
                    <h2 className="edit-album-title" align="center">Edit Album </h2>
                    <table className="edit-album-table">
                        <tbody>
                            <tr align="left">
                                <th></th>
                                <th></th>
                            </tr>
                            <tr>
                                <td>
                                    <label className="input-field-artistName">Artist Name:</label>
                                    <input {...register("artistName")}
                                        autoFocus
                                        name="artistName"
                                        type="text"
                                        size="120"
                                        maxLength="150"
                                        placeholder="Oasis"
                                        value={formData.artistName}
                                        onChange={handleInputChange}
                                    />
                                </td>
                                <td>
                                    {errors.artistName && (
                                        <div className="error">{errors.artistName.message}</div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="input-field-artistName">Album Name:</label>
                                    <input {...register("albumName")}
                                        name="albumName"
                                        type="text"
                                        size="120"
                                        maxLength="150"
                                        placeholder="Be Here Now"
                                        value={formData.albumName}
                                        onChange={handleInputChange}
                                    />
                                </td>
                                <td>
                                    {errors.albumName && (
                                        <div className="error">{errors.albumName.message}</div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="input-field-yearReleased">Year Released:</label>
                                    <input {...register("yearReleased")}
                                        name="yearReleased"
                                        type="text"
                                        size="120"
                                        maxLength="150"
                                        placeholder="1994"
                                        value={formData.yearReleased}
                                        onChange={handleInputChange}
                                    />
                                </td>
                                <td>
                                    {errors.yearReleased && (
                                        <div className="error">{errors.yearReleased.message}</div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="input-field-albumPrice">Album Price:</label>
                                    <input {...register("albumPrice")}
                                        name="albumPrice"
                                        type='number' step='.01'
                                        min='0'
                                        size="120"
                                        maxLength="150"
                                        placeholder="9.99"
                                        value={formData.albumPrice}
                                        onChange={handleInputChange}
                                    />
                                </td>
                                <td>
                                    {errors.albumPrice && (
                                        <div className="error">{errors.albumPrice.message}</div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {formData.imageAlbumCover && (
                                        <div><label>Current Image Cover:</label>
                                            <img className="image-cover" src={`data:image/jpeg;base64,${formData.imageAlbumCover}`} alt="" width="500" height="500" />
                                        </div>
                                    )}
                                    <label className="input-field-imageAlbumCover">Change Album Image Cover:</label>
                                    <input
                                        {...register("imageAlbumCover")}
                                        type="file"
                                        name="imageAlbumCover"
                                        onChange={handleImageChange}
                                    />
                                    {imagePreview && (
                                        <img
                                            src={imagePreview}
                                            alt="Preview Album Cover"
                                            style={{ maxWidth: "250px", maxHeight: "250px" }}
                                        />
                                    )}
                                </td>
                                <td>
                                    {errors.imageAlbumCover && (
                                        <div className="error">{errors.imageAlbumCover.message}</div>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="edit-album-submit-container">
                        <SubmitButton buttonDisabled={buttonDisabled} handleSubmit={handleSubmit} buttonClassName={buttonDisabled ? 'edit-album-submit-button disabled-button' : 'edit-album-submit-button'} />
                        <CancelButton buttonClassName="cancel-edit-album-submit-button" />
                        <DeleteButton id={id} buttonClassName="delete-edit-album-submit-button" />
                    </div>
                </div>
            </form >
        </div >
    )
};
export default EditAlbum;
