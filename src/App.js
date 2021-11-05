import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import EditUser from "./pages/EditUser";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/editUser/:id" component={EditUser} />
      </Switch>
    </div>
  );
}

export default App;
