import './App.css'; // Asegúrate de que esta línea está presente

function App() {
  return (
    <div className="landing">
      {/* ----- Navbar ----- */}
      <nav className="navbar">
        <img 
          src="/logo.png" 
          alt="Impúlsame" 
          className="logo" 
        />
        <button 
          className="login-button"
          onClick={() => window.location.href = 'https://identity.pulbot.store'}
        >
          Ingresar
        </button>
      </nav>

      {/* ----- Hero Section ----- */}
      <section className="hero">
        <h1>Impulsa tu negocio hoy</h1>
        <p>Te prestamos y acompañamos en tu viaje</p>
        <button className="cta-button">
          Solicita tu préstamo
        </button>
      </section>
    </div>
  );
}

export default App;
