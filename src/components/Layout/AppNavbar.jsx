import "./Layout.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuth";
import SearchInput from "../home/SearchInput";
import { useState } from "react";
import { BookmarkFill, BoxArrowRight } from "react-bootstrap-icons";

const AppNavbar = () => {
  const { user, isAuthenticated } = useAuthContext();
  const [expanded, setExpanded] = useState(false);
  console.log("User in Navbar:", user);
  console.log("Is Authenticated in Navbar:", isAuthenticated);

  const closeMenu = () => setExpanded(false);

  return (
    <Navbar expanded={expanded} expand="lg" className="app-navbar position-fixed w-100 top-0 z-3 navbar-dark">
      <Container className="nav-container">
        <Navbar.Brand as={Link} to="/" className="brand" onClick={closeMenu}>
          MovieApp
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" className="d-lg-none ms-auto" onClick={() => setExpanded((prev) => !prev)} />
        {isAuthenticated && user?.username && (
          <div className="nav-welcome-mobile d-lg-none">
            Welcome <span>{user.username}</span>
          </div>
        )}
        <Navbar.Collapse id="main-navbar" className="navbar-collapse-custom">
          <Nav className="nav-links">
            <Nav.Link as={NavLink} to="/home" onClick={closeMenu} className="nav-link-custom">
              Home
            </Nav.Link>

            <Nav.Link as={NavLink} to="/browse" onClick={closeMenu} className="nav-link-custom">
              Browse
            </Nav.Link>
            {!isAuthenticated && (
              <>
                <Nav.Link as={NavLink} to="/signin" onClick={closeMenu} className="nav-link-custom me-auto">
                  Sign In
                </Nav.Link>

                <Nav.Link as={NavLink} to="/signup" onClick={closeMenu} className="nav-link-custom">
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>

          {isAuthenticated && user?.username && (
            <div className="nav-right">
              <div className="nav-search-wrapper">
                <SearchInput />
              </div>

              <div className="nav-welcome d-none d-lg-flex">
                Welcome <span>{user.username}</span>
              </div>

              <div className="nav-icons">
                <Nav.Link as={NavLink} to="/bookmarks" onClick={closeMenu} className="nav-icon-link" title="Bookmarks" aria-label="Bookmarks">
                  <BookmarkFill />
                </Nav.Link>

                <Nav.Link as={NavLink} to="/logout" onClick={closeMenu} className="nav-icon-link" title="Logout" aria-label="Logout">
                  <BoxArrowRight />
                </Nav.Link>
              </div>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
