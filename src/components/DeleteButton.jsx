import React from 'react'
import { useNavigate } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert';
import { useQueryClient } from '@tanstack/react-query';  
import 'react-confirm-alert/src/react-confirm-alert.css';

const DeleteButton = ({id, buttonClassName}) => {  
    const queryClient = useQueryClient();  
    const navigate = useNavigate()
    const deleteAlbum = (e) => {
        const deleteAlbumData = new FormData();
        e.preventDefault(e)
        deleteAlbumData.append('id', id)
        if (deleteAlbumData) {
            fetch("http://localhost:8080/v1/music/service/delete/album/", {
                method: "DELETE",
                body: deleteAlbumData
        })
            queryClient.invalidateQueries({ queryKey: ['albums'], refetchType: 'active'});
            navigate('/');
            window.location.reload(true); // refresh page after delete
        } 
    };

    const submit = (e) => {
        e.preventDefault(e)
        confirmAlert({
          title: 'Confirm Delete',
          message: 'Are You Sure?.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => deleteAlbum(e)
            },
            {
              label: 'No',
            }
          ]
        });
      };
      return (

          <button type="button" onClick={submit} className={buttonClassName}>Delete Album</button>
     
    );
};
export default DeleteButton;