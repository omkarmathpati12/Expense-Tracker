
import { Link, Outlet, useLocation } from 'react-router-dom';

const AppShell = () => {
  const location = useLocation();

  const showNav = !['/login', '/register'].includes(location.pathname);

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6f8' }}>
      {showNav && (
        <header
          style={{
            background: 'white',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ fontWeight: 800 }}>Smart Expense</div>
          <nav style={{ display: 'flex', gap: 14 }}>
            <Link to="/" style={styles.navLink}>
              Home
            </Link>
            <Link to="/dashboard" style={styles.navLink}>
              Dashboard
            </Link>
            <Link to="/add-transaction" style={styles.navLink}>
              Add
            </Link>
            <Link to="/logout" style={{ ...styles.navLink, color: '#ef4444' }}>
              Logout
            </Link>
          </nav>
        </header>
      )}

      <Outlet />
    </div>
  );
};

const styles = {
  navLink: {
    textDecoration: 'none',
    color: '#111827',
    fontWeight: 700,
  },
};

export default AppShell;

