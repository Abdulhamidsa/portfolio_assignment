import "./Layout.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuth";

const AppNavbar = () => {
  const { user, isAuthenticated } = useAuthContext();

  return (
    <Navbar expand="lg" className="app-navbar position-fixed w-100 top-0 z-3 navbar-dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand">
          MovieApp
        </Navbar.Brand>

        <Navbar.Toggle className="d-lg-none" />

        <Navbar.Collapse className="justify-content-end align-items-center gap-4">
          <Nav className="gap-3">
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
                <Nav.Link as={Link} to="/home" className="nav-link-custom">
                  Home
                </Nav.Link>
                {/* <Nav.Link as={Link} to="/movies" className="nav-link-custom">
                  Movies
                </Nav.Link> */}
                {/* <Nav.Link as={Link} to="/profile" className="nav-link-custom">
                  Profile
                </Nav.Link> */}
                <Nav.Link as={Link} to="/bookmarks" className="nav-link-custom">
                  Bookmark
                </Nav.Link>
                <Nav.Link as={Link} to="/logout" className="nav-link-custom">
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>

          {isAuthenticated && user?.username && (
            <div className="nav-welcome d-none d-lg-flex">
              Welcome<span>{user.username}</span>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
