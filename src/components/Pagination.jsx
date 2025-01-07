import React from 'react'
import "../css/Pagination.css"

const Pagination = ({
    totalAlbums,
    albumsPerPage,
    setCurrentPage,
    currentPage
}) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalAlbums / albumsPerPage); i++) {
        pages.push(i);
    }

    if (Math.ceil(totalAlbums / albumsPerPage) > 1) {
        return (
            <div className='pagination'>
                {pages.map((page, index) => {
                    return (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(page)}
                            className={page === currentPage ? "active" : ""}>
                            {page}
                        </button>
                    )
                })}
            </div>
        )
    }
}
export default Pagination
