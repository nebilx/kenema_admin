import "./EditBranch.css";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { Stack, Form,  } from "react-bootstrap";
export default function EditBranch() {
    const navigate = useNavigate();
  const location = useLocation();
  const id = location.state;
  console.log(id);

  const [name, setName] = useState("");
  const [pno, setPno] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/branch", id);

        console.log(response.data);

        setName(response.data[0].name);
        setPno(response.data[0].pno);
        setAddress(response.data[0].address);
        setStatus(response.data[0].status);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.put(
        "http://localhost:4000/branch",
        JSON.stringify({ id, name, pno, address, status }),
        {
          headers: { "Content-Type": "application/json" },
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
      );
      setIsLoading(false);
      setErrMsg("Updated Successfully");
      console.log(JSON.stringify(response));
        navigate("/listB?");
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
        setErrMsg("Updating Failed");
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
      <div className="title">Edit Branch</div>
      <br />
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <form onSubmit={handleSubmit}>
        <div className="branch-detail">
          <div className="input-box">
            <span className="details">Name</span>
            <input
              type="text"
              placeholder="enter name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="input-box">
            <span className="details">Phone Number</span>
            <input
              type="number"
              placeholder="enter Phone number"
              required
              value={pno}
              onChange={(event) => setPno(event.target.value)}
            />
          </div>
          <div className="input-box">
            <span className="details">Address</span>
            <input
              type="text"
              placeholder="enter Address"
              required
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </div>
          <div className="input-box">
            <span className="details">Status</span>
            <input
              type="text"
              placeholder="enter Status"
              required
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            />
          </div>
        </div>

        <div className="button">
          <input type="submit" value="Update" />
        </div>
      </form>
    </div>
  );
}
