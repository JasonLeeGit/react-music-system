import { Link } from "react-router-dom"

function NavBar() {
    return (
        <div className="nav-bar">
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/create/album">Create</Link>
                    </li>
                    <li>
                        <Link to="/search/albums">Search</Link>
                    </li> 
                    {/* <li>
                        <Link to="/test">TestFlex</Link>
                    </li> */}
                </ul>
            </nav>
        </div>
    );
}
export default NavBar;
