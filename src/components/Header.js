import { useHistory } from 'react-router-dom'

function Header(props) {
    const history = useHistory();

    const onMenu = (e) => {
        history.push('/menu');
    }

    const onOrders = (e) => {
        history.push('/orders');
    }

    const onLogout = (e) => {
        props.setRole('');
        props.setUsername('');
        props.setUserId(-1);
        history.push('/');
    }

    const renderUsernameAndLogout = () => {
        if(props.role === 'admin' || props.role === 'user') {
            return <div>{props.username} - <button onClick={onMenu}>Menu</button> - <button onClick={onOrders}>My Orders</button> - <button onClick={onLogout}>Logout</button></div>;
        }
    }

    return(
        <div className="header">
            <header>
                <h1 className="top">Food Ordering App</h1>
                <nav>
                    {renderUsernameAndLogout()}
                </nav>
            </header>
        </div>
    );
}

export default Header;