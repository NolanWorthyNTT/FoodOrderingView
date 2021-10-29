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
        props.setCart([]);
        history.push('/');
    }

    const Buttons = () => {
        if(props.role === 'user') {
            return <div>{props.username} - <button onClick={onMenu}>Menu</button> - <button onClick={onOrders}>My Orders</button> - <button onClick={onLogout}>Logout</button></div>;
        } else if(props.role === 'admin') {
            return <div>{props.username} - <button onClick={onLogout}>Logout</button></div>;
        } else {
            return null;
        }
    }

    return(
        <div className="header">
            <header>
                <h1 className="top">Food Ordering App</h1>
                <nav>
                    <Buttons />
                </nav>
            </header>
        </div>
    );
}

export default Header;