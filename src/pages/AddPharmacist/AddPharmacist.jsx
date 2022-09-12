import "./AddPharmacist.css";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Stack, Form,  } from "react-bootstrap";
export default function AddPharmacist() {
    const navigate = useNavigate();

  const [name, setName] = useState("");
  const [p_pwd,setP_pwd] = useState("");
  const [image,setImage] = useState("");
  const [status, setStatus] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  var bodyFormData = new FormData();
  bodyFormData.append("name", name);
  bodyFormData.append("p_pwd", p_pwd);
  bodyFormData.append("image", image);
  bodyFormData.append("status", status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/pharmacist",
        bodyFormData,
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
         navigate("/listPh?");
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
      <div className="title">Add Pharmacist</div>
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
              placeholder="enter Pharmacist name"
              required
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Password</span>
            <input
              type="text"
              placeholder="enter Pharmacist password"
              required
              onChange={(event) => setP_pwd(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Photo Image</span>

            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={(event) => setImage(event.target.files[0])}
            />
          </div>

          <div className="input-box">
            <span className="details">Status</span>
            <input
              type="text"
              placeholder="enter status"
              required
              onChange={(event) => setStatus(event.target.value)}
            />
          </div>
        </div>

        <div className="button">
          <input type="submit" value="Add" />
        </div>
      </form>
    </div>
  );
}
