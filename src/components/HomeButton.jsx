import { useNavigate } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const HomeButton = ({ buttonClassName }) => {
    const navigate = useNavigate()
    const home = (e) => {
        navigate('/')
    }

    const handleHome = (e) => {
        e.preventDefault(e)
        confirmAlert({
            title: 'Album Update Success.',
            message: 'Home.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => home(e)
                }
            ]
        });
    }
    return (
        <button type="submit" onClick={handleHome} className={buttonClassName}>Home</button>
    )
}
export default HomeButton;