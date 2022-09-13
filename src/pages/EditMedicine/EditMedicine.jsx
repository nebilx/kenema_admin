import "./EditMedicine.css";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { Stack, Form,  } from "react-bootstrap";
export default function EditMedicine() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state;
  console.log(id);

  const [mid, setMid] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [mfg, setMfg] = useState("");
  const [generic_name, setGeneric_name] = useState("");
  const [dosage, setDosage] = useState("");
  const [price, setPrice] = useState("");
  const [strength, setStrength] = useState("");
  const [unit, setUnit] = useState("");
  const [packages, setPackages] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const [datap, setDatap] = useState([]);
  const [datad, setDatad] = useState([]);
  const [datat, setDatat] = useState([]);
  const [datau, setDatau] = useState([]);

  var bodyFormData = new FormData();
  bodyFormData.append("id", id);
  bodyFormData.append("medicine_id", mid);
  bodyFormData.append("name", name);
  bodyFormData.append("type", type);
  bodyFormData.append("mfg", mfg);
  bodyFormData.append("generic_name", generic_name);
  bodyFormData.append("dosage", dosage);
  bodyFormData.append("price", price);
  bodyFormData.append("strength", strength);
  bodyFormData.append("unit", unit);
  bodyFormData.append("package", packages);
  bodyFormData.append("image", image);
  bodyFormData.append("status", status);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/medicine/${id}`
        );

        console.log(response.data);

        setMid(response.data.medicine_id);
        setName(response.data.name);
        setType(response.data.type);
        setMfg(response.data.mfg);
        setGeneric_name(response.data.generic_name);
        setDosage(response.data.dosage);
        setPrice(response.data.price);
        setStrength(response.data.strength);
        setUnit(response.data.unit);
        setPackages(response.data.package);
        setImage(response.data.image.url);
        setStatus(response.data.status);
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

    const fetchMC = async () => {
      try {
        const response = await axios.get("http://localhost:4000/medcontent", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        setDatap(response.data.package.map((d) => d.package_name));
        setDatad(response.data.dosage.map((d) => d.dosage_name));
        setDatat(response.data.type.map((d) => d.type_name));
        setDatau(response.data.unit.map((d) => d.unit_name));
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Missing ");
        } else {
          setErrMsg("Failed to Get data");
        }
      }
    };

    fetchData();
    fetchMC();
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
      navigate("/listM?");
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
            <span className="details">Type :</span>
            <span className="details">{type}</span>
            <br />
            <select
              className="ok"
              name="active"
              id="active"
              required
              onChange={(event) =>
                setType(event.target.options[event.target.selectedIndex].text)
              }
            >
              <option value="item">Medicine Type</option>
              {datat && datat.map((m) => <option value="item">{m}</option>)}
            </select>
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
            <span className="details">Dosage :</span>
            <span className="details">{dosage}</span>
            <br />
            <select
              className="ok"
              name="active"
              id="active"
              required
              onChange={(event) =>
                setDosage(event.target.options[event.target.selectedIndex].text)
              }
            >
              <option value="item">Medicine Dosage</option>
              {datad && datad.map((m) => <option value="item">{m}</option>)}
            </select>
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
            <span className="details">Unit :</span>
            <span className="details">{unit}</span>
            <br />
            <select
              className="ok"
              name="active"
              id="active"
              required
              onChange={(event) =>
                setUnit(event.target.options[event.target.selectedIndex].text)
              }
            >
              <option value="item">Medicine Unit</option>
              {datau && datau.map((m) => <option value="item">{m}</option>)}
            </select>
          </div>

          <div className="input-box">
            <span className="details">Package :</span>
            <span className="details">{packages}</span>
            <br />
            <select
              className="ok"
              name="active"
              id="active"
              required
              onChange={(event) =>
                setPackages(
                  event.target.options[event.target.selectedIndex].text
                )
              }
            >
              <option value="item">Medicine Package</option>
              {datap && datap.map((m) => <option value="item">{m}</option>)}
            </select>
          </div>

          <div className="input-box">
            <span className="details">Image :</span>
            <img src={image} width="30" height="30"></img>
            <br />
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={(event) => setImage(event.target.files[0])}
            />
          </div>

          <div className="input-box">
            <span className="details">Status :</span>
            <span className="details">{status}</span>
            <br />
            <select
              className="ok"
              name="active"
              id="active"
              required
              onChange={(event) =>
                setStatus(event.target.options[event.target.selectedIndex].text)
              }
            >
              <option value="item">Status</option>
              <option value="item">active</option>
              <option value="item">Deactivate</option>
            </select>
          </div>
        </div>

        <div className="button">
          <input type="submit" value="Update" />
        </div>
      </form>
    </div>
  );
}
