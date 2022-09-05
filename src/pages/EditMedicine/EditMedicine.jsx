import "./EditMedicine.css";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { Stack, Form,  } from "react-bootstrap";
export default function EditMedicine() {
  //   const navigate = useNavigate();
  const location = useLocation();
  const id = location.state;
  console.log(id);

  const [mid, setMid] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [mfg, setMfg] = useState("");
  const [generic_name, setGeneric_name] = useState("");
  const [date_mfg, setDate_mfg] = useState("");
  const [dosage, setDosage] = useState("");
  const [date_expire, setDate_expire] = useState("");
  const [price, setPrice] = useState("");
  const [strength, setStrength] = useState("");
  const [unit, setUnit] = useState("");
  const [packages, setPackages] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  var bodyFormData = new FormData();
  bodyFormData.append("id", id);
  bodyFormData.append("medicine_id", mid);
  bodyFormData.append("name", name);
  bodyFormData.append("type", type);
  bodyFormData.append("mfg", mfg);
  bodyFormData.append("generic_name", generic_name);
  bodyFormData.append("date_mfg", date_mfg);
  bodyFormData.append("dosage", dosage);
  bodyFormData.append("date_expire", date_expire);
  bodyFormData.append("price", price);
  bodyFormData.append("strength", strength);
  bodyFormData.append("unit", unit);
  bodyFormData.append("package", packages);
  bodyFormData.append("image", image);
  bodyFormData.append("status", status);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/medicine", id);

        console.log(response.data);

        setMid(response.data[0].medicine_id);
        setName(response.data[0].name);
        setType(response.data[0].type);
        setMfg(response.data[0].mfg);
        setGeneric_name(response.data[0].generic_name);
        setDate_mfg(response.data[0].date_mfg);
        setDosage(response.data[0].dosage);
        setDate_expire(response.data[0].date_expire);
        setPrice(response.data[0].price);
        setStrength(response.data[0].strength);
        setUnit(response.data[0].unit);
        setPackages(response.data[0].package);
        setImage(response.data[0].image);
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.put(
        "http://localhost:4000/medicine",
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
      <div className="title">Edit Medicine</div>
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
            <span className="details">Medicine Id</span>
            <input
              type="text"
              placeholder="enter name"
              required
              value={mid}
              onChange={(event) => setMid(event.target.value)}
            />
          </div>

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
            <span className="details">Type</span>
            <input
              type="text"
              placeholder="enter name"
              required
              value={type}
              onChange={(event) => setType(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Manufacture</span>
            <input
              type="text"
              placeholder="enter name"
              required
              value={mfg}
              onChange={(event) => setMfg(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Generic Name</span>
            <input
              type="text"
              placeholder="enter name"
              required
              value={generic_name}
              onChange={(event) => setGeneric_name(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Date Manufacture</span>
            <input
              type="text"
              placeholder="enter name"
              required
              value={date_mfg}
              onChange={(event) => setDate_mfg(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Dosage</span>
            <input
              type="text"
              placeholder="enter name"
              required
              value={dosage}
              onChange={(event) => setDosage(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Date Expire</span>
            <input
              type="text"
              placeholder="enter name"
              required
              value={date_expire}
              onChange={(event) => setDate_expire(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Price</span>
            <input
              type="text"
              placeholder="enter name"
              required
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Strength</span>
            <input
              type="text"
              placeholder="enter name"
              required
              value={strength}
              onChange={(event) => setStrength(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Unit</span>
            <input
              type="text"
              placeholder="enter name"
              required
              value={unit}
              onChange={(event) => setUnit(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Package</span>
            <input
              type="text"
              placeholder="enter name"
              required
              value={packages}
              onChange={(event) => setPackages(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Image</span>
            <input
              type="text"
              placeholder="enter name"
              required
              value={image}
              onChange={(event) => setImage(event.target.value)}
            />
          </div>

          <div className="input-box">
            <span className="details">Status</span>
            <input
              type="text"
              placeholder="enter status"
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
