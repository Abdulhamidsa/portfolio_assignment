import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuth";

const AppNavbar = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <Navbar expand="lg" className="app-navbar position-fixed w-100 top-0 z-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand">
          MovieApp
        </Navbar.Brand>

        {isAuthenticated && <Navbar.Toggle className="d-lg-none" />}

        <Navbar.Collapse>
          <Nav className="ms-auto gap-3">
            {!isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/signin" className="nav-link-custom">
                  Sign In
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" className="nav-link-custom">
                  Sign Up
                </Nav.Link>
              </>
            )}

            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/" className="nav-link-custom">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/movies" className="nav-link-custom">
                  Movies
                </Nav.Link> 
                 <Nav.Link as={Link} to="/search" className="nav-link-custom">
                 Search
                 </Nav.Link>
                <Nav.Link as={Link} to="/profile" className="nav-link-custom">
                  Profile
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
