import "./AddPrescription.css"
import axios from "axios";
import { useState, useRef, useEffect } from "react";
export default function Xtest() {
  const [medData , setMedData] = useState([]);
  const [drug, setDrug] = useState("");
  const [expire, setExpire] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  
  const [pdata, setPdata] = useState("");
  const [patient,setPatient] = useState("");

  const [mdata, setMdata] = useState("");
  const [medicine,setMedicine] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
console.log(medData);
    try {
      console.log(date);
      console.log(medData);
      const response = await axios.post(
        "http://localhost:4000/prescription", 
       JSON.stringify({date, medData }),
        {
          headers: { "Content-Type": "application/json" },
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
      );
      setIsLoading(false);
      setErrMsg("Added Successfully");
      console.log(JSON.stringify(response));
      //   navigate("/users?");
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setIsLoading(false);
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setIsLoading(false);
        setErrMsg("Missing ");
      } else {
        setIsLoading(false);
        setErrMsg("Adding Failed");
      }
    }
  };


  useEffect(() => {
    const fetchPData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/patient", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        console.log(response.data);
        setPdata(response.data);
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Missing ");
        } else {
          setErrMsg("Failed to Get data");
        }
      }
      setIsLoading(false);
    };

    const fetchMData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/medicine", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        console.log(response.data);
        setMdata(response.data);
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Missing ");
        } else {
          setErrMsg("Failed to Get data");
        }
      }
      setIsLoading(false);
    };

    fetchPData();
    fetchMData();
  }, []);
    
  return (
    <div>

<div className="input-box">
            <span className="details">Patient</span>
            <select
              className="ok"
              name="active"
              id="active"
              required
              onChange={(event) =>
                setPatient(event.target.options[event.target.selectedIndex].text)}>

              <option value="item">List Patient</option>
              {pdata && pdata.map((m) => <option value="item">{m.name}</option>)}
            </select>
          </div>

<br/>
<div className="input-box">
            <span className="details">Medicine</span>
            <select
              className="ok"
              name="active"
              id="active"
              required
              onChange={(event) =>
                setMedicine(event.target.options[event.target.selectedIndex].text)}>

              <option value="item">List Medicine</option>
              {mdata && mdata.map((m) => <option value="item">{m.name}</option>)}
            </select>
          </div>

          <form onSubmit={handleSubmit}>

<div className="input-box">
      <span className="details">Date</span>
      <input
        type="text"
        placeholder="enter date"
        onChange={(event) => setDate(event.target.value)}
      />
    </div>


  <div className="branch-detail">
    <div className="input-box">
      <span className="details">Name</span>
      <input
        type="text"
        placeholder="enter Drug name"

        onChange={(event) => setDrug(event.target.value)}
      />
    </div>

    <div className="input-box">
      <span className="details">Expire</span>
      <input
        type="text"
        placeholder="enter Drug expire "
        onChange={(event) => setExpire(event.target.value)}
      />
    </div>

    <div className="input-box">
      <span className="details">Quantity</span>
      <input
        type="text"
        placeholder="enter Drug quantity"
        onChange={(event) => setQuantity(event.target.value)}
      />
    </div>

   
  </div>

  <br />
<br />
<div className="button">
  <input onClick={addRow} id="add" placeholder="list" />
</div>

<br />
<br />
<table id="table" border="1">
  <thead id="table-head">
    <tr>
      <th>Drug name</th>
      <th>Expire</th>
      <th>Quantity</th>
    </tr>
  </thead>
  <tbody id="table-body">
    {/* {storedData.map(item=>
    <tr key={item}>
      {item.map(col=>
      <td>{col}</td>)}
    </tr>)} */}

{medData.map((item) => (
<tr key={item.id}>
<td>{item.medname}</td> 
<td>{item.medexpire}</td>
<td>{item.medquantity}</td>
<td><button onClick={() => deletemed(item.id)}>X</button></td>
</tr>
))}
    
  </tbody>
</table>



  <div className="button">
    <input type="submit" value="Add" />
  </div>
</form>
</div>
);

function deletemed (id) {
// Filter out todo with the id
const newList = medData.filter((item) => item.id !== id);

setMedData(newList);
};

function addRow() {

const medD = {
id: Math.random(),
medname: drug,
medexpire:expire,
medquantity:quantity,
}

setMedData([...medData,medD]);
}
}