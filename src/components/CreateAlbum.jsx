import { useState, Input } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { any, z } from "zod";
import CancelButton from './CancelButton';
import SubmitButton from './SubmitButton';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "../css/CreateAlbum.css"
import "../css/Error.css"
import "../css/Input.css"
import "../css/Buttons.css"
import errorMap from 'zod/locales/en.js';

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const schema = z.object({
    artistName: z.string().min(1, { message: "* Artist Name is required!" }),
    albumName: z.string().min(1, { message: "* Album Name is required!" }),
    yearReleased: z.string().min(1, { message: "* Year Released is required!" }),
    albumPrice: z.string().min(1, { message: "* Album Price is required!" }),
    imageAlbumCover: z.any()
        .refine((imageAlbumCover) => imageAlbumCover?.length >= 1, { message: '* Image Album Cover is required!' })  //this message remains once shown?
        .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), "Only .jpg, .jpeg, .png and .webp formats are supported."
        )
})

const CreateAlbumNew = () => {
    const [imagePreview, setImagePreview] = useState("");
    const [error, setError] = useState();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schema)
    })
    const navigate = useNavigate();
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setFormData({ ...formData, imageAlbumCover: selectedImage })
        if (selectedImage) {
            setImagePreview(URL.createObjectURL(selectedImage))
        }
    }
    const [formData, setFormData] = useState({
        artistName: '',
        albumName: '',
        yearReleased: '',
        albumPrice: '',
        imageAlbumCover: ''
    });
    const handleHome = () => {
        navigate('/')
    }
    const handleBack = () => {
        navigate(-1)
    }
    const onSubmit = async (data) => {
        //adding param names to they match Spring @RequestParams
        const albumData = new FormData();
        albumData.append('file', formData.imageAlbumCover);
        albumData.append('artistName', data.artistName);
        albumData.append('albumName', data.albumName);
        albumData.append('yearReleased', data.yearReleased);
        albumData.append('albumPrice', data.albumPrice);

        if (albumData) {
            try {
                const response = await fetch('http://localhost:8080/v1/music/service/insert/album/', {
                    method: 'POST',
                    body: albumData
                });

                if (response.status === 406) {
                    throw new Error("Duplicate Entry");
                }
                if (response.ok) {
                    confirmAlert({
                        title: 'Album successfully created.',
                        buttons: [
                            {
                                label: 'Home',
                                onClick: () => handleHome()
                            }
                        ]
                    });
                }
            } catch (error) {
                confirmAlert({
                    title: 'Insert Failed.',
                    message: 'Failed to Insert - Duplicate entry',
                    buttons: [
                        {
                            label: 'Back',
                            onClick: () => handleBack()
                        }
                    ]
                });
            }
        } else {
            confirmAlert({
                title: 'Something went wrong with create missing required album data.',
                buttons: [
                    {
                        label: 'Back',
                        onClick: () => handleHome()
                    }
                ]
            });
        }
    }
    return (
        <div className="content-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="create-album-form-container">
                    <h2 className="create-album-title">Create New Album</h2>
                    <table className="create-album-table">
                        <tbody>
                            <tr align="left">
                                <th></th>
                                <th></th>
                            </tr>
                            <tr>
                                <td>
                                    <label className="input-field-artistName">Artist Name:</label>
                                    <input {...register("artistName")}
                                        autoFocus type="text"
                                        size="120"
                                        maxLength="150"
                                        placeholder="Oasis" />
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
                                        type="text"
                                        size="120"
                                        maxLength="150"
                                        placeholder="Be Here Now" />
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
                                        type="text"
                                        size="120"
                                        maxLength="150"
                                        placeholder="1994" />
                                </td>
                                <td>
                                    {errors.yearReleased && (
                                        <div className="error">{errors.yearReleased.message}</div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label type="text" className="input-field-albumPrice">Album Price:</label>
                                    <input {...register("albumPrice")}
                                        type='number'
                                        step='.01'
                                        min='0'
                                        size="120"
                                        maxLength="150"
                                        placeholder="9.99" />
                                </td>
                                <td>
                                    {errors.albumPrice && (
                                        <div className="error">{errors.albumPrice.message}</div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>
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
                                </td>
                                <td>
                                    {errors.imageAlbumCover && (
                                        <div className="error">{errors.imageAlbumCover.message}</div>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="create-album-submit-container">
                        <SubmitButton buttonClassName="create-album-submit-button" />
                        <CancelButton buttonClassName="cancel-create-album-submit-button" />
                    </div>
                </div>
            </form >
        </div >
    );

}
export default CreateAlbumNew;