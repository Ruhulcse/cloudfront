import { useQuery } from 'react-query';
import { config, URL } from '../utils/config';
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';

export default function ShowUserScreen() {
  const { isLoading, error, data } = useQuery('userData', () =>
    axios.get(`${URL}api/v1/users`, config)
  );

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  const submitHandler = async (e) => {
    e.preventDefault();

    // if (keyword) {
    //   history.push(`/users/search/${keyword}/page/1`);
    // }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Delete the item?')) {
      await axios.delete(`${URL}api/v1/users/profile/${id}`, config);
      window.location.reload();
    }
  };

  return (
    <>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <Dashboard />
          <div className="container-fluid pt-5">
            <div className="row mt-3">
              <div className="col-sm-6">
                <h1>All Users</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">All Users</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>

        <div className="card">
          {/* {isLoading ? (
            '<Loader />'
          ) : ( */}
          <div className="card-body">
            <div className="row mb-2">
              <div className="col">
                <LinkContainer to={'/users/new'}>
                  <Button variant="primary" className="btn">
                    Add New User
                  </Button>
                </LinkContainer>
              </div>
              <div className="col-auto">
                <Form onSubmit={submitHandler} inline>
                  <Form.Control
                    type="text"
                    name="q"
                    // onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search..."
                    className="mr-sm-2 ml-auto"
                  ></Form.Control>{' '}
                  <Button
                    type="submit"
                    variant="outline-primary"
                    className="p-2"
                  >
                    Search
                  </Button>
                </Form>
              </div>
            </div>
            <table id="allUsers" className="table table-bordered table-striped">
              <thead>
                <tr className="bg-dark text-white">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Bkash</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {data?.data?.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.bkash}</td>
                    <td>{user.amount}</td>
                    <td>
                      <LinkContainer to={`/updateuser?id=${user._id}`}>
                        <Button variant="warning" className="btn-sm ml-2 mr-1 ">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>{' '}
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <Paginate pager={pager} /> */}
          </div>
          {/* )} */}
        </div>
      </div>
    </>
  );
}
