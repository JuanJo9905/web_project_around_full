import logo from "../images/Vector.svg";
import { useLocation, Link } from 'react-router-dom';

export default function Header({ isLoggedIn, email, onSignOut }) {
    const location = useLocation();
    
    const getHeaderContent = () => {
        switch(location.pathname) {
            case '/signin':
                return {
                    text: 'Regístrate',
                    link: '/signup'
                };
            case '/signup':
                return {
                    text: 'Iniciar sesión',
                    link: '/signin'
                };
            default:
                return null;
        }
    };

    const headerContent = getHeaderContent();

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__top-row">
                    <div className="header__logo-section">
                        <img src={logo} alt="Around The U.S." className="header__logo" />
                    </div>
                    
                    <div className="header__right-section">
                        {headerContent && (
                            <Link 
                                to={headerContent.link} 
                                className="header__auth-link"
                            >
                                {headerContent.text}
                            </Link>
                        )}
                        
                        {isLoggedIn && (
                            <div className="header__user-info">
                                <span className="header__email">{email}</span>
                                <button className="header__logout" onClick={onSignOut}>
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}