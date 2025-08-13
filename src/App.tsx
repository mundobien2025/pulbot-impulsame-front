import { useState } from 'react';
import './App.css';
import RegistrationForm from './components/RegistrationForm';

function App() {
  const [showForm, setShowForm] = useState(false);
  console.log('showForm value:', showForm); // Verifica en consola

  return (
    <div className="landing">
      {/* Navbar */}
      <nav className="navbar">
        <img src="/logo.png" alt="Impúlsame" className="logo" />
        <div className="auth-buttons">
          <button 
            className="login-button"
            onClick={() => window.location.href = 'https://identity.pulbot.store'}
          >
            Ingresar
          </button>
          <button 
            className="login-button"
            onClick={() => setShowForm(true)}
          >
            Registrarse
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>Impulsa tu negocio hoy</h1>
        <p>Te prestamos y acompañamos en tu viaje</p>
        <button className="cta-button">
          Solicita tu préstamo
        </button>
      </section>

      {/* ✨ Añade esta línea para mostrar el formulario */}
      {showForm && <RegistrationForm onClose={() => setShowForm(false)} />}
    </div>
  );
}

export default App;
