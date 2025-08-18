import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoapp from "../assets/Images/password.png";
import { useLocation, NavLink } from "react-router-dom";

const Header = (props) => {
  const location = useLocation();
  console.log("Header location", location);
  return (
    <>
      {" "}
      <Navbar expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logoapp}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React manage users logo"
            />
            ️<span>React manage users</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>

              <NavLink to="/users" className="nav-link">
                Manage users
              </NavLink>
              
              

              
            </Nav><Nav><NavDropdown title="Setting" id="basic-nav-dropdown">
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
              </NavDropdown></Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
