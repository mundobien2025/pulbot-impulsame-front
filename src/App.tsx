// import React from 'react';
import './App.css';

function App() {
  return (
    <div className="landing">
      {/* Navbar */}
      <nav style={{ backgroundColor: '#004884', padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src="logo.png" alt="Impúlsame" style={{ height: '40px' }} />
          <button 
            style={{ 
              backgroundColor: '#32B18F', 
              color: 'white', 
              border: 'none', 
              padding: '0.5rem 1rem',
              borderRadius: '4px'
            }}
            onClick={() => window.location.href = 'https://identity.pulbot.store'}
          >
            Ingresar
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ 
        backgroundColor: '#004884', 
        color: 'white', 
        textAlign: 'center', 
        padding: '4rem 1rem'
      }}>
        <h1>Impulsa tu negocio hoy</h1>
        <p>Préstamos rápidos, tasas justas y apoyo real</p>
        <button 
          style={{ 
            backgroundColor: '#32B18F', 
            color: 'white', 
            padding: '0.8rem 2rem',
            fontSize: '1.2rem',
            marginTop: '1rem'
          }}
        >
          Solicita tu préstamo
        </button>
      </section>

      {/* Beneficios */}
      <section style={{ padding: '3rem 1rem', textAlign: 'center' }}>
        <h2 style={{ color: '#004884' }}>Beneficios</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '300px' }}>
            <h3 style={{ color: '#32B18F' }}>Desembolsos en 24h</h3>
            <p>Dinero en tu cuenta sin esperas.</p>
          </div>
          {/* Agrega más beneficios aquí */}
        </div>
      </section>
    </div>
  );
}

export default App;
