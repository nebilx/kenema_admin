import "./AddBatch.css";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Stack, Form,  } from "react-bootstrap";
export default function AddBatch() {
  //   const navigate = useNavigate();
  const [storedData , setStoredData] = useState([]);
  const [drug, setDrug] = useState("");
  const [expire, setExpire] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  
  var bodyFormData = new FormData();
  bodyFormData.append("date", date);
  // bodyFormData.append("storedata", JSON.stringify(storedData));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log(date);
      console.log(storedData);
      const response = await axios.post(
        "http://localhost:4000/dosage", 
        "abebe",
        // {
        //   headers: { "Content-Type": "application/json" },
        //   Authorization: "Bearer " + localStorage.getItem("token"),
        // }
         {
          headers: {
            "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
     
        },
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
    if (errMsg.trim() !== "")
      setTimeout(() => {
        setErrMsg("");
      }, 5000);
  }, [errMsg]);

  return isLoading ? (
    <span className="loader" />
  ) : (
    <div className="container">
      <div className="title">Add Batch</div>
      <br />
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

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
        <input value="List" onClick={addRow} id="add" />
      </div>

      <br />
      <br />
      <table id="table" border="1">
        <thead id="table-head">
          <tr>
            <th>Drug name</th>
            <th>Expire</th>
            <th>Qnatity</th>
          </tr>
        </thead>
        <tbody id="table-body">
          {storedData.map(row=><tr>
            {row.map(col=><td>{col}</td>)}
          </tr>)}


          
        </tbody>
      </table>



        <div className="button">
          <input type="submit" value="Add" />
        </div>
      </form>
    </div>
  );

  function addRow() {
    setStoredData([...storedData,[drug,expire,quantity]])
  }
}
