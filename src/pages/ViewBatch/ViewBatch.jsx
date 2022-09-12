import "./ViewBatch.css";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ViewBatch() {
    const location = useLocation();
    const id = location.state;
    console.log(id);

    const [medData , setMedData] = useState([]);
    const [errMsg, setErrMsg] = useState("");
    const errRef = useRef();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              "http://localhost:4000/batch",id,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            );
    
            console.log(response.data);
            console.log(response.data[0].batch_date);
            console.log(response.data[0].batch_medicine[0][0]);
          
            setMedData(response.data);
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
        fetchData();
      }, []);

      
  useEffect(() => {
    if (errMsg.trim() !== "")
      setTimeout(() => {
        setErrMsg("");
      }, 5000);
  }, [errMsg]);

  return (
    <div className="container">
      <div className="title">List Branch</div>
      <br />
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

<span>{medData.batch_date}</span>

      <table>
        <tbody>
          <tr>
          <th>Drug name</th>
            <th>Expire</th>
            <th>Quantity</th>
          </tr>
          {medData && medData.map((item) => (
  <tr key={item._id}>
   <td>{item.batch_medicine[0][0].medname}</td> 
   <td>{item.batch_medicine[0][0].medexpire}</td>
   <td>{item.batch_medicine[0][0].medquantity}</td>
  </tr>
))}
        </tbody>
      </table>
    </div>
  );
 }