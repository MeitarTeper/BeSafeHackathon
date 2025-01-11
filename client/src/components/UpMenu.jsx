import "./UpMenu.css";

function UpMenu() {
  return (
    <header className="home-header">
        <nav className="navbar">
          <div className="logo">SafeNet</div>
          <ul className="nav-links">
            <li><a href="#about">אודות</a></li>
            <li><a href="#services">שירותים</a></li>
            <li><a href="#contact">צור קשר</a></li>
          </ul>
        </nav>
      </header>
  );
}

export default UpMenu;