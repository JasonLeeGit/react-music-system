import { useState } from 'react';
import { Link } from 'react-router-dom';

const AlbumList = ({ albums }) => {
  function enlargeImage(e){
    e.target.classList.toggle('active-large');
  }
  return ( 
    <div className="album-list-results">
      <table className="table-search-results">
        <tbody>
          <tr align="left">
            <th>Artist Name</th>
            <th>Album Name</th>
            <th>Album Price</th>
            <th>Year Released</th>
            <th>Cover Image</th>
          </tr>
          {albums.map((album) => {
            return (
              <tr align="left" key={album.id}>
                <td>{album.artistName}</td>
                <td title="View, Edit or Delete">
                    <Link to={`/edit/album/${album.id}/${album.artistName}/${album.albumName}/${album.yearReleased}/${album.albumPrice}`}>
                      {album.albumName}
                    </Link>
                </td>
                <td>{album.albumPrice}</td>
                <td>{album.yearReleased}</td>
                {album.imageAlbumCover ? (
                  <td title="Enlarge Image">
                    <img onClick={enlargeImage} src={`data:image/jpeg;base64,${album.imageAlbumCover}`} alt="" width="50" height="50"/>
                  </td>
                ) : (
                  <td>N/A</td>
                )
                }
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default AlbumList;