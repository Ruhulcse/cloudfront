import Dashboard from './screens/Dashboard';
import LoginScreen from './screens/LoginScreen';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Adduser from './screens/Adduser';
import ShowUserScreen from './screens/ShowUserScreen';

function App() {
  return (
    <>
      <Router>
        <Route exact path="/" component={LoginScreen} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/showuser" component={ShowUserScreen} />
        <Route exact path="/dashboard/adduser" component={Adduser} />
      </Router>
    </>
  );
}
export default App;
