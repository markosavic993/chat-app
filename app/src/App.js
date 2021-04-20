import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ChatRoom from "./ChatRoom/ChatRoom";
import CreateRoom from "./CreateRoom/CreateRoom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={CreateRoom}/>
        <Route exact path="/rooms/:roomId" component={ChatRoom}/>
      </Switch>
    </Router>
  );
}

export default App;
