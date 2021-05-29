import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

function Dashboard() {
  let data = JSON.parse(localStorage.getItem('user'));
  let userType = data.role;
  let userName = data.name;
  // console.log(userType);

  const logoutHandler = () => {
    console.log('clicked');
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/dashboard">Data Workspace</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>

              {(userType === 'admin' || userType === 'general') && (
                <Nav.Link href="/dashboard/addData">Add Data</Nav.Link>
              )}
              {(userType === 'admin' ||
                userType === 'general' ||
                userType === 'restricted') && (
                <Nav.Link href="/showData">Show Data</Nav.Link>
              )}
              {userType === 'admin' && (
                <Nav.Link href="/dashboard/adduser">Add User</Nav.Link>
              )}
              {userType === 'admin' && (
                <Nav.Link href="/showuser">Show User</Nav.Link>
              )}
            </Nav>
            <Nav className="ml-auto">
              <NavDropdown title={userName} id="collasible-nav-dropdown">
                <NavDropdown.Item href="/dashboard/userprofile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="" onClick={logoutHandler}>
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Dashboard;
