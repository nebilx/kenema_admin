import "./EditPatient.css";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { Stack, Form,  } from "react-bootstrap";
export default function EditPatient() {
    const navigate = useNavigate();
  const location = useLocation();
  const id = location.state;
  console.log(id);

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
  bodyFormData.append("id", id);
  bodyFormData.append("name", name);
  bodyFormData.append("age", age);
  bodyFormData.append("gender", gender);
  bodyFormData.append("dob", dob);
  bodyFormData.append("pno", pno);
  bodyFormData.append("p_image", image);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/patient", id);

        console.log(response.data);

        setName(response.data[0].name);
        setAge(response.data[0].age);
        setGender(response.data[0].gender);
        setDob(response.data[0].dob);
        setPno(response.data[0].pno);
        setImage(response.data[0].p_image.url);
        setCity(response.data[0].address[0].city);
        setSub_city(response.data[0].address[0].sub_city);
        setWoreda(response.data[0].address[0].woreda);
        setHouse_no(response.data[0].address[0].house_no);
        setI_id(response.data[0].insurance[0].insurance_id);
        setI_name(response.data[0].insurance[0].insurance_name);
        setI_image(response.data[0].insurance[0].insurance_image.url);
        setU_name(response.data[0].user[0].user_name);
        setU_pwd(response.data[0].user[0].user_pwd);

        setStatus(response.data[0].user[0].status);
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.put(
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
      setErrMsg("Updated Successfully");
      console.log(JSON.stringify(response));
        navigate("/listPa?");
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
      <div className="title">Edit Patient</div>
      <br />
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <form onSubmit={handleUpdate}>
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
            <span className="details">Age</span>
            <input
              type="text"
              placeholder="enter age"
              required
              value={age}
              onChange={(event) => setAge(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Gender</span>
            <input
              type="text"
              placeholder="enter gender"
              required
              value={gender}
              onChange={(event) => setGender(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Date of Birth</span>
            <input
              type="text"
              placeholder="enter date of birth "
              required
              value={dob}
              onChange={(event) => setDob(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Phone number</span>
            <input
              type="text"
              placeholder="enter phone number"
              required
              value={pno}
              onChange={(event) => setPno(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Photo Image</span>
            <br/>
            <img src={image}  width="30" height="30"></img>
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
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details"> Sub-City</span>
            <input
              type="text"
              placeholder="enter sub city"
              required
              value={sub_city}
              onChange={(event) => setSub_city(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Woreda</span>
            <input
              type="text"
              placeholder="enter woreda"
              required
              value={woreda}
              onChange={(event) => setWoreda(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">House No</span>
            <input
              type="text"
              placeholder="enter house no"
              required
              value={house_no}
              onChange={(event) => setHouse_no(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Insurance id </span>
            <input
              type="text"
              placeholder="enter insurance  name"
              required
              value={i_id}
              onChange={(event) => setI_id(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Insurance name</span>
            <input
              type="text"
              placeholder="enter insurance name"
              required
              value={i_name}
              onChange={(event) => setI_name(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Insurance Image</span>
            <br/>
            <img src={i_image}  width="30" height="30"></img>
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
              value={u_name}
              onChange={(event) => setU_name(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">User password</span>
            <input
              type="text"
              placeholder="enter Password"
              required
              value={u_pwd}
              onChange={(event) => setU_pwd(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Status</span>
            <input
              type="text"
              placeholder="enter name"
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
