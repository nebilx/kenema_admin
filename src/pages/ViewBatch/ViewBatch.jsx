import "./ViewBatch.css";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ViewBatch() {
  const location = useLocation();
  const id = location.state;
  console.log(id);

  const [medData, setMedData] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/batch/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        console.log(response.data);
        // console.log(response.data[0].batch_date);
        //console.log(response.data.batch_medicine);

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
      <div className="title">View Batch</div>
      <br />
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <span>Batch Date : {medData.batch_date}</span>

      <table>
        <tbody>
          <tr>
            <th>Drug Name</th>
            <th>Quantity</th>
            <th>Date Manufacture</th>
            <th>Date Expire</th>
          </tr>
          {medData.batch_medicine &&
            medData.batch_medicine.map((item, i) => (
              <tr key={i}>
                <td>{item[0].medname}</td>
                <td>{item[0].medquantity}</td>
                <td>{item[0].medmfg}</td>
                <td>{item[0].medexpire}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
