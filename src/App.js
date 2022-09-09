import "./App.css";

import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overview from "./pages/Overview";

import { Reports, ReportsOne, ReportsTwo, ReportsThree } from "./pages/Reports";

import AddBatch from "./pages/AddBatch/AddBatch";

import AddPrescription from "./pages/AddPrescription/AddPrescription";

import AddPharmacist from "./pages/AddPharmacist/AddPharmacist";
import ListPharmacist from "./pages/ListPharmacist/ListPharmacist";
import EditPharmacist from "./pages/EditPharmacist/EditPharmacist"

import AddPackage from "./pages/AddPackage/AddPackage";
import ListPackage from "./pages/ListPackage/ListPackage";
import EditPackage from "./pages/EditPackage/EditPackage";

import AddMedicine from "./pages/AddMedicine/AddMedicine";
import ListMedicine from "./pages/ListMedicine/ListMedicine";
import EditMedicine from "./pages/EditMedicine/EditMedicine";

import AddType from "./pages/AddType/AddType";
import ListType from "./pages/ListType/ListType";
import EditType from "./pages/EditType/EditType";

import AddDosage from "./pages/AddDosage/AddDosage";
import ListDosage from "./pages/ListDosage/ListDosage";
import EditDosage from "./pages/EditDosage/EditDosage";

import AddUnit from "./pages/AddUnit/AddUnit";
import ListUnit from "./pages/ListUnit/ListUnit";
import EditUnit from "./pages/EditUnit/EditUnit";

import AddBranch from "./pages/AddBranch/AddBranch";
import ListBranch from "./pages/ListBranch/ListBranch";
import EditBranch from "./pages/EditBranch/EditBranch";

import AddPatient from "./pages/AddPatient/AddPatient";
import ListPatient from "./pages/ListPatient/ListPatient";
import EditPatient from "./pages/EditPatient/EditPatient";


function App() {
  return (
    <Router>
      <AddBatch />
      <Routes>
        <Route path="/editT" exact element={<EditType />} />
        <Route path="/editD" exact element={<EditDosage />} />
        <Route path="/editU" exact element={<EditUnit />} />
        <Route path="/editB" exact element={<EditBranch />} />
        <Route path="/editPa" exact element={<EditPatient />} />
        <Route path="/editM" exact element={<EditMedicine />} />
        <Route path="/editPac" exact element={<EditPackage />} />
        <Route path="/editPh" exact element={<EditPharmacist />} />
        
        {/* <Route path="/overview" exact component={Overview} />
        <Route path="/reports" exact component={AddMedicine} />
        <Route path="/reports/reports1" exact component={AddPatient} />
        <Route path="/reports/reports2" exact component={AddBatch} />
        <Route path="/reports/reports3" exact component={ReportsThree} />
        <Route path="/team" exact component={AddBranch} /> */}
      </Routes>
    </Router>
  );
}

export default App;
