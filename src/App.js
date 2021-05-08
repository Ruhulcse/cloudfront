import Dashboard from "./screens/Dashboard";
import LoginScreen from "./screens/LoginScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Route exact path="/" component={LoginScreen} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Router>
    </>
  );
}
export default App;
