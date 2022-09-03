import "./AddMedicine.css";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Stack, Form,  } from "react-bootstrap";
export default function NewBranch() {
  //   const navigate = useNavigate();

  const [mid, setMid] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [mfg, setMfg] = useState("");
  const [generic_name, setGeneric_name] = useState("");
  const [date_mfg, setDate_mfg] = useState("");
  const [category, setCategory] = useState("");
  const [date_expire, setDate_expire] = useState("");
  const [price, setPrice] = useState("");
  const [strength, setStrength] = useState("");
  const [form, setForm] = useState("");
  const [image, setImage] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  var bodyFormData = new FormData();
  bodyFormData.append("medicine_id", mid);
  bodyFormData.append("name", name);
  bodyFormData.append("type", type);
  bodyFormData.append("mfg", mfg);
  bodyFormData.append("generic_name", generic_name);
  bodyFormData.append("date_mfg", date_mfg);
  bodyFormData.append("category", category);
  bodyFormData.append("date_expire", date_expire);
  bodyFormData.append("price", price);
  bodyFormData.append("strength", strength);
  bodyFormData.append("form", form);
  bodyFormData.append("image", image);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/medicine",
        { data: "test" },
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
      <div className="title">Add Medicine</div>
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
            <span className="details">Medicine Id</span>
            <input
              type="text"
              placeholder="enter name"
              required
              onChange={(event) => setMid(event.target.value)}
            />
          </div>

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
            <span className="details">Type</span>
            <input
              type="text"
              placeholder="enter name"
              required
              onChange={(event) => setType(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Manufacture</span>
            <input
              type="text"
              placeholder="enter name"
              required
              onChange={(event) => setMfg(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Generic Name</span>
            <input
              type="text"
              placeholder="enter name"
              required
              onChange={(event) => setGeneric_name(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Date Manufacture</span>
            <input
              type="text"
              placeholder="enter name"
              required
              onChange={(event) => setDate_mfg(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Category</span>
            <input
              type="text"
              placeholder="enter name"
              required
              onChange={(event) => setCategory(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Date Expire</span>
            <input
              type="text"
              placeholder="enter name"
              required
              onChange={(event) => setDate_expire(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Price</span>
            <input
              type="text"
              placeholder="enter name"
              required
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Strength</span>
            <input
              type="text"
              placeholder="enter name"
              required
              onChange={(event) => setStrength(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Form</span>
            <input
              type="text"
              placeholder="enter name"
              required
              onChange={(event) => setForm(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Image</span>
            <input
              type="text"
              placeholder="enter name"
              required
              onChange={(event) => setImage(event.target.value)}
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
