import LoginScreen from "./screens/LoginScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Adduser from "./screens/Adduser";
import UserProfile from "./screens/UserProfile";
import ShowUserScreen from "./screens/ShowUserScreen";
import UpdateUserScreen from "./screens/UpdateUserScreen";
import AddData from "./screens/AddData";
import ShowData from "./screens/ShowData";
import MainChart from "./screens/MainChart";
import UpdateDataScreen from "./screens/UpdateDataScreen";
import Show from "./screens/Show";
function App() {
  return (
    <>
      <Router>
        <Route exact path="/" component={LoginScreen} />
        <Route exact path="/dashboard" component={MainChart} />
        <Route exact path="/showuser" component={ShowUserScreen} />
        <Route exact path="/updateuser" component={UpdateUserScreen} />
        <Route exact path="/updatedata" component={UpdateDataScreen} />
        <Route exact path="/dashboard/adduser" component={Adduser} />
        <Route exact path="/dashboard/userprofile" component={UserProfile} />
        <Route exact path="/dashboard/addData" component={AddData} />
        <Route exact path="/showData" component={Show} />
      </Router>
    </>
  );
}
export default App;
