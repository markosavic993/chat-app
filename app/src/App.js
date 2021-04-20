import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ChatRoom from "./ChatRoom/ChatRoom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ChatRoom}/>
      </Switch>
    </Router>
  );
}

export default App;
