import "./EditUnit.css";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Stack, Form,  } from "react-bootstrap";
export default function NewBranch() {
  //   const navigate = useNavigate();

  const [uname, setUname] = useState("");
  const [status, setStatus] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.put(
        "http://localhost:4000/unit",
        JSON.stringify({ unit_name:Uname,status }),
        {
          headers: { "Content-Type": "application/json" },
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
      );
      setIsLoading(false);
      setErrMsg("Updated Successfully");
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
      <div className="title">Edit Unit</div>
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
              placeholder="enter Dosage name"
              required
              onChange={(event) => setUname(event.target.value)}
            />
          </div>
        
          <div className="input-box">
            <span className="details">Status</span>
            <input
              type="text"
              placeholder="enter Address"
              required
              onChange={(event) => setStatus(event.target.value)}
            />
          </div>
        </div>

        <div className="button">
          <input type="submit" value="Updated" />
        </div>
      </form>
    </div>
  );
}
