import "./App.css";
import Header from "./layout/Header";
import List from "./list/List";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import celebrityList from "./JSON/celebrity.json";

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm">
            <Header />
            <List celebrityList={celebrityList} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
