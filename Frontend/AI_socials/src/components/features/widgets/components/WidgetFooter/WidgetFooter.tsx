import "./WidgetFooter.css";

const links = ["About", "Privacy", "Terms", "Developers", "Settings"];

const WidgetsFooter = () => {
  return (
    <footer className="widgets-footer">
      <nav className="widgets-footer__links">
        {links.map((link) => (
          <button key={link} className="widgets-footer__link">
            {link}
          </button>
        ))}
      </nav>

      <p className="widgets-footer__copyright">© 2026 AI Social</p>
    </footer>
  );
};

export default WidgetsFooter;
