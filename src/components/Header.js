import { useHistory } from 'react-router-dom'

function Header(props) {
    const history = useHistory();

    const onClick = (e) => {
        props.setRole('');
        props.setUsername('');
        history.push('/');
    }

    const renderUsernameAndLogout = () => {
        if(props.role === 'admin' || props.role === 'user') {
            return <div>{props.username} - <button onClick={onClick}>Logout</button></div>;
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