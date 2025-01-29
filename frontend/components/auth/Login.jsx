import { useState } from "react";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await onLogin(formData);
        } catch (err) {
            console.log('Error capturado en Login:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="auth">
            <h2 className="auth__title">Iniciar sesión</h2>
            <form className="auth__form" onSubmit={handleSubmit}>
                <input
                    className="auth__input"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Correo electrónico"
                    required
                />
                <input
                    className="auth__input"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Contraseña"
                    required
                />
                <button 
                    type="submit" 
                    className="auth__button"
                    disabled={isLoading}
                >
                    {isLoading ? "Cargando..." : "Ingresar"}
                </button>
            </form>
            <div className="auth__register">
                <p className="auth__register-text">
                    ¿Aún no eres miembro?{" "}
                    <Link to="/signup" className="auth__register-link">
                        Regístrate aquí
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;