import "./App.css";

import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overview from "./pages/Overview";

import { Reports, ReportsOne, ReportsTwo, ReportsThree } from "./pages/Reports";

import AddBatch from "./pages/AddBatch/AddBatch";
import ListBatch from "./pages/ListBatch/ListBatch";
import ViewBatch from "./pages/ViewBatch/ViewBatch";

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
      <Routes>

        <Route path="/addBa" exact element={<AddBatch />} />
        <Route path="/listBa" exact element={<ListBatch />} />
        <Route path="/viewBa" exact element={<ViewBatch />} />
        {/* <Route path="/editT" exact element={<EditType />} /> */}

        <Route path="/addPr" exact element={<AddPrescription />} />
        {/* <Route path="/listPr" exact element={<ListBatch />} /> */}

        <Route path="/addT" exact element={<AddType />} />
        <Route path="/listT" exact element={<ListType />} />
        <Route path="/editT" exact element={<EditType />} />

        <Route path="/addD" exact element={<AddDosage />} />
        <Route path="/listD" exact element={<ListDosage />} />
        <Route path="/editD" exact element={<EditDosage />} />

        <Route path="/addU" exact element={<AddUnit />} />
        <Route path="/listU" exact element={<ListUnit />} />
        <Route path="/editU" exact element={<EditUnit />} />

        <Route path="/addB" exact element={<AddBranch />} />
        <Route path="/listB" exact element={<ListBranch />} />
        <Route path="/editB" exact element={<EditBranch />} />

        <Route path="/addPa" exact element={<AddPatient />} />
        <Route path="/listPa" exact element={<ListPatient />} />
        <Route path="/editPa" exact element={<EditPatient />} />

        <Route path="/addM" exact element={<AddMedicine />} />
        <Route path="/listM" exact element={<ListMedicine />} />
        <Route path="/editM" exact element={<EditMedicine />} />

        <Route path="/addPac" exact element={<AddPackage />} />
        <Route path="/listPac" exact element={<ListPackage />} />
        <Route path="/editPac" exact element={<EditPackage />} />

        <Route path="/addPh" exact element={<AddPharmacist />} />
        <Route path="/listPh" exact element={<ListPharmacist />} />
        <Route path="/editPh" exact element={<EditPharmacist />} />

      </Routes>
    </Router>
  );
}

export default App;
