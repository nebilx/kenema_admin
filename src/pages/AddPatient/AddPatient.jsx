import "./AddPatient.css";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Stack, Form,  } from "react-bootstrap";
export default function NewPatient() {
  //   const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [pno, setPno] = useState("");
  const [image, setImage] = useState("");
  const [uname, setUname] = useState("");
  const [upwd, setUpwd] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  var bodyFormData = new FormData();
  bodyFormData.append("name", name);
  bodyFormData.append("age", age);
  bodyFormData.append("gender", gender);
  bodyFormData.append("dob", dob);
  bodyFormData.append("address", address);
  bodyFormData.append("pno", pno);
  bodyFormData.append("image", image);
  bodyFormData.append("user_name", uname);
  bodyFormData.append("user_pwd", upwd);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log(name, age, gender, dob, address, pno, image, uname, upwd);

    try {
      const response = await axios.post(
        "http://localhost:4000/patient",

        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          bodyFormData,
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
        setErrMsg("adding User Failed");
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
      <div className="title">Add Patient</div>
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
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Age</span>
            <input
              type="text"
              placeholder="enter name"
              required
              onChange={(event) => setAge(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Gender</span>
            <input
              type="text"
              placeholder="enter name"
              required
              onChange={(event) => setGender(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Date of Birth</span>
            <input
              type="text"
              placeholder="enter name"
              required
              onChange={(event) => setDob(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Address</span>
            <input
              type="text"
              placeholder="enter name"
              required
              onChange={(event) => setAddress(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Phone number</span>
            <input
              type="text"
              placeholder="enter name"
              required
              onChange={(event) => setPno(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Photo Image</span>
            <input
              type="text"
              placeholder="enter name"
              required
              onChange={(event) => setImage(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">User name</span>
            <input
              type="text"
              placeholder="enter name"
              required
              onChange={(event) => setUname(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">User password</span>
            <input
              type="text"
              placeholder="enter name"
              required
              onChange={(event) => setUpwd(event.target.value)}
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
