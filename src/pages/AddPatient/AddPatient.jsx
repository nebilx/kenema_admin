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
  const [pno, setPno] = useState("");
  const [image, setImage] = useState("");
  const [city, setCity] = useState("");
  const [sub_city, setSub_city] = useState("");
  const [woreda, setWoreda] = useState("");
  const [house_no, setHouse_no] = useState("");
  const [i_id, setI_id] = useState("");
  const [i_name, setI_name] = useState("");
  const [i_image, setI_image] = useState("");
  const [u_name, setU_name] = useState("");
  const [u_pwd, setU_pwd] = useState("");
  const [status, setStatus] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  var bodyFormData = new FormData();
  bodyFormData.append("name", name);
  bodyFormData.append("age", age);
  bodyFormData.append("gender", gender);
  bodyFormData.append("dob", dob);
  bodyFormData.append("pno", pno);
  bodyFormData.append("image", image);
  bodyFormData.append("city", city);
  bodyFormData.append("sub_city", sub_city);
  bodyFormData.append("woreda", woreda);
  bodyFormData.append("house_no", house_no);
  bodyFormData.append("insurance_id", i_id);
  bodyFormData.append("insurance_name", i_name);
  bodyFormData.append("insurance_image", i_image);
  bodyFormData.append("uname", u_name);
  bodyFormData.append("upwd", u_pwd);
  bodyFormData.append("status", status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/patient",
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
              placeholder="enter age"
              required
              onChange={(event) => setAge(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Gender</span>
            <input
              type="text"
              placeholder="enter gender"
              required
              onChange={(event) => setGender(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Date of Birth</span>
            <input
              type="text"
              placeholder="enter date of birth "
              required
              onChange={(event) => setDob(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Phone number</span>
            <input
              type="text"
              placeholder="enter phone number"
              required
              onChange={(event) => setPno(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Photo Image</span>
            {/* <input
              type="text"
              placeholder="enter name"
              required
              onChange={(event) => setImage(event.target.value)}
            /> */}

            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={(event) => setImage(event.target.files[0])}
            />
          </div>

          <div className="input-box">
            <span className="details">City</span>
            <input
              type="text"
              placeholder="enter city"
              required
              onChange={(event) => setCity(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details"> Sub-City</span>
            <input
              type="text"
              placeholder="enter sub city"
              required
              onChange={(event) => setSub_city(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Woreda</span>
            <input
              type="text"
              placeholder="enter woreda"
              required
              onChange={(event) => setWoreda(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">House No</span>
            <input
              type="text"
              placeholder="enter house no"
              required
              onChange={(event) => setHouse_no(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Insurance id </span>
            <input
              type="text"
              placeholder="enter insurance  name"
              required
              onChange={(event) => setI_id(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Insurance name</span>
            <input
              type="text"
              placeholder="enter insurance name"
              required
              onChange={(event) => setI_name(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Insurance Image</span>

            {/* <input
              type="text"
              placeholder="enter name"
              required
              onChange={(event) => setI_image(event.target.value)}
            /> */}

            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={(event) => setI_image(event.target.files[0])}
            />
          </div>

          <div className="input-box">
            <span className="details">User Name</span>
            <input
              type="text"
              placeholder="enter user name"
              required
              onChange={(event) => setU_name(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">User password</span>
            <input
              type="text"
              placeholder="enter Password"
              required
              onChange={(event) => setU_pwd(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Status</span>
            <input
              type="text"
              placeholder="enter name"
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
