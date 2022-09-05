import "./ListMedicine.css";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { Stack, Form,  } from "react-bootstrap";
export default function ListMedicine() {
  //   const navigate = useNavigate();

  const [name, setName] = useState("");
  const [pno, setPno] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");
  const [data, setData] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async (id) => {
    setIsLoading(true);
    try {
      console.log("id" + id);
      const response = await axios.delete("http://localhost:4000/medicine", {
        data: { id },
      });
      setIsLoading(false);
      setErrMsg("Deleted Successfully");
      console.log(JSON.stringify(response));
      setData(data.filter((item) => item._id !== id));
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
        setErrMsg("Deleting Failed");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/medicine", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        console.log(response.data);
        setData(response.data);
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
      <div className="title">List Type</div>
      <br />
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <table>
        <tbody>
          <tr>
            <td>Medicine Id</td>
            <td>Name</td>
            <td>Type</td>
            <td>Manufacture</td>
            <td>Generic Name</td>
            <td>Date Manufacture</td>
            <td>Dosage</td>
            <td>Date Expire</td>
            <td>Price</td>
            <td>Strength</td>
            <td>Unit</td>
            <td>Package</td>
            <td>Image</td>
            <td>Status</td>
          </tr>

          {data &&
            data.map((data) => {
              return (
                <tr key={data._id}>
                  <td>{data.medicine_id}</td>
                  <td>{data.name}</td>
                  <td>{data.type}</td>
                  <td>{data.mfg}</td>
                  <td>{data.generic_name}</td>
                  <td>{data.date_mfg}</td>
                  <td>{data.dosage}</td>
                  <td>{data.date_expire}</td>
                  <td>{data.price}</td>
                  <td>{data.strength}</td>
                  <td>{data.unit}</td>
                  <td>{data.package}</td>
                  <td>{data.image}</td>
                  <td>{data.status}</td>
                  <td>
                    {" "}
                    <Link to="/editM" state={data._id}>
                      <button> Edit</button>
                    </Link>
                  </td>
                  <td>
                    <button onClick={() => onDelete(data._id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
