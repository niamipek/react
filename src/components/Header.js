import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoapp from "../assets/Images/password.png";
import { useLocation, NavLink,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Header = (props) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Logout success");
  }
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
            </Nav>
            <Nav>
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                <NavLink to="/login" className="dropdown-item">Login</NavLink>
                <NavDropdown.Item onClick={() => handleLogout()}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
