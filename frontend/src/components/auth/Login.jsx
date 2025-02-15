import { useState } from "react";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [retryTimeout, setRetryTimeout] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        // Prevenir múltiples envíos
        if (isLoading || retryTimeout > 0) return;
        
        setIsLoading(true);

        try {
            // Validación básica
            if (!formData.email || !formData.password) {
                throw new Error('Por favor, complete todos los campos');
            }

            // Añadir pequeño retraso para evitar demasiadas peticiones
            await new Promise(resolve => setTimeout(resolve, 500));

            await onLogin({
                email: formData.email.trim(),
                password: formData.password
            });
        } catch (err) {
            console.error('Error en login:', err);
            
            // Manejar error de demasiadas peticiones
            if (err.message.includes('Too Many Requests') || err.message.includes('demasiadas peticiones')) {
                setError('Demasiados intentos. Por favor, espera un momento...');
                setRetryTimeout(30);
                
                // Iniciar cuenta regresiva
                const interval = setInterval(() => {
                    setRetryTimeout((prev) => {
                        if (prev <= 1) {
                            clearInterval(interval);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
            } else {
                setError(err.message || 'Error en el inicio de sesión');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setError('');
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
                    disabled={isLoading || retryTimeout > 0}
                />
                <input
                    className="auth__input"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Contraseña"
                    required
                    disabled={isLoading || retryTimeout > 0}
                />
                {error && <span className="auth__error">{error}</span>}
                {retryTimeout > 0 && (
                    <span className="auth__error">
                        Podrás intentar nuevamente en {retryTimeout} segundos
                    </span>
                )}
                <button 
                    type="submit" 
                    className="auth__button"
                    disabled={isLoading || !formData.email || !formData.password || retryTimeout > 0}
                >
                    {isLoading ? "Cargando..." : retryTimeout > 0 ? `Espera ${retryTimeout}s` : "Ingresar"}
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