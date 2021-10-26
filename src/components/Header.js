import { Link } from 'react-router-dom';

function Header(props) {
    return(
        <div>
            <header>
                <h1 className="top">Food Ordering App</h1>
                <nav>
                    {props.role === 'no user' || props.role === '' ? '' : props.username + ' - ' + <Link to='/'>Logout</Link>}
                </nav>
            </header>
        </div>
    );
}

export default Header;