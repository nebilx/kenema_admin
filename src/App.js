import "./App.css";

import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overview from "./pages/Overview";

import { Reports, ReportsOne, ReportsTwo, ReportsThree } from "./pages/Reports";

import AddBatch from "./pages/AddBatch/AddBatch";
import AddBranch from "./pages/AddBranch/AddBranch";
import AddMedicine from "./pages/AddMedicine/AddMedicine";
import AddPatient from "./pages/AddPatient/AddPatient";

function App() {
  return (
    <AddPatient />

    // <Router>
    //   <Sidebar />
    //   <Routes>
    //     <Route path="/overview" exact component={Overview} />
    //     <Route path="/reports" exact component={AddMedicine} />
    //     <Route path="/reports/reports1" exact component={AddPatient} />
    //     <Route path="/reports/reports2" exact component={AddBatch} />
    //     <Route path="/reports/reports3" exact component={ReportsThree} />
    //     <Route path="/team" exact component={AddBranch} />
    //   </Routes>
    // </Router>
  );
}

export default App;
