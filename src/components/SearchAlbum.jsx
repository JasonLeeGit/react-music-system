import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import AlbumList from './AlbumList'
import Pagination from './Pagination'
import "../css/SearchAlbum.css"

const SearchAllAlbums = () => {

    const [albums, setAlbums] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [showErrorDiv, setShowErrorDiv] = useState(false)
    const [showWarningDiv, setWarningDiv] = useState(false)
    const [showResultsDiv, setShowResultsDiv] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [albumsPerPage] = useState(10);
    const indexOfLastAlbum = currentPage * albumsPerPage;
    const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage
    const navigate = useNavigate();

    const searchInputChange = (e) => {
        setSearchTerm(e.target.value)
        setShowErrorDiv(false)
        setWarningDiv(false)
    }
    const searchInputClear = (e) => {
        setSearchTerm("")
        e.target.value=""
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setSearchTerm(e.target.value)
            findAlbumsByArtists(searchTerm)
        }
    }
    const handleCancel= () => {
        navigate('/');
    }
    const findAlbumsByArtists = async (searchTerm) => {
        if (searchTerm) {
            fetch(`http://localhost:8080/v1/music/service/search/albums/?artistName=${searchTerm}`)
                .then((response) => response.json())
                .then((data) => setAlbums(data))
  
           if (albums) {
                setShowResultsDiv(true)
                setShowErrorDiv(false)
                setWarningDiv(false)
            } else {
                setShowResultsDiv(false)
                setWarningDiv(true)
                setAlbums([])
            }
        } else {
            setShowResultsDiv(false)
            setShowErrorDiv(true)
            setWarningDiv(false)
            setAlbums([])
        }
    }
    return (
        <div className="content-container">
            <div className="search-container">
                <input
                    autoFocus={true}
                    title=' Search For Artist By Name'
                    placeholder='Search by Artist Name...'
                    value={searchTerm}
                    onChange={(e) => searchInputChange(e)}
                    onKeyDown={(e) => handleKeyDown(e)}
                    onClick={(e) => searchInputClear(e)}
                />
                <button className="search-button" onClick={() => { findAlbumsByArtists(searchTerm) }}>Search</button>
                <button className="cancel-search-album-submit-button" onClick={handleCancel}>Cancel</button>
            </div>
            {showResultsDiv &&
                <div><AlbumList albums={albums.slice(indexOfFirstAlbum, indexOfLastAlbum)} />
                <Pagination
                    totalAlbums={albums.length}
                    albumsPerPage={albumsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
                </div>
            }
            {showErrorDiv && 
                <div><p className='search-error'>Please enter a search value!</p></div>
            }
            {showWarningDiv &&
                <div><p className='search-warning'>Warning No Results Found For {searchTerm}</p></div>
            }
        </div>
    )
}
export default SearchAllAlbums