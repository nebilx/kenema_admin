import "./ListUnit.css";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { Stack, Form,  } from "react-bootstrap";
export default function ListUnit() {
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
      const response = await axios.delete("http://localhost:4000/unit", {
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
        const response = await axios.get("http://localhost:4000/unit", {
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
      <div className="title">List Unit</div>
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
            <td>unit_name</td>
            <td>Status</td>
          </tr>

          {data &&
            data.map((data) => {
              return (
                <tr key={data._id}>
                  <td>{data.unit_name}</td>
                  <td>{data.status}</td>
                  <td>
                    {" "}
                    <Link to="/editU" state={data._id}>
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
