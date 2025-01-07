import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { OrbitProgress } from 'react-loading-indicators'
import AlbumList from './AlbumList'
import Pagination from './Pagination'
import "../css/Home.css"

function AllAlbums() {

    const allAlbumsURL = 'http://localhost:8080/v1/music/service/all/albums';
    const [currentPage, setCurrentPage] = useState(1);
    const [albumsPerPage] = useState(10);
    const indexOfLastAlbum = currentPage * albumsPerPage;
    const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;

    // useQuery is like useEffect it gets called on page load it adds caching
    const albumData = useQuery(
        ['albums'], () => { return fetch(allAlbumsURL).then(response => response.json()); },
        //{ staleTime: 60000},
        //{ refetchOnWindowFocus: false},
        { enabled: true } //set to false to disable from automatically running.
    );
    return (
        <div className="content-container">
            {albumData.isError &&
                <div className="error" align="center">{albumData.isError}</div>
            }
            {albumData.isInitialLoading &&
                <div className="loading-data">
                    <OrbitProgress color="#a4c991" size="large" />
                </div>
            }
            {albumData.data &&
                <div>
                    <AlbumList
                        albums={albumData.data?.slice(indexOfFirstAlbum, indexOfLastAlbum)}
                    />
                    <Pagination
                        totalAlbums={albumData.data.length}
                        albumsPerPage={albumsPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                </div>
            }
        </div>

    )
};
export default AllAlbums;



