import "./AddBatch.css";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Stack, Form,  } from "react-bootstrap";
export default function AddBatch() {
  //   const navigate = useNavigate();
  const [medData, setMedData] = useState([]);
  const [drug, setDrug] = useState("");
  const [expire, setExpire] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [date_mfg, setDate_mfg] = useState("");
  const [date_expire, setDate_expire] = useState("");

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

  const [mdata, setMdata] = useState("");
  const [medicine, setMedicine] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  console.log(medicine);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(medData);
    try {
      console.log(date);
      console.log(medData);
      const response = await axios.post(
        "http://localhost:4000/batch",
        JSON.stringify({ batch_date: date, medData }),
        {
          headers: { "Content-Type": "application/json" },
          Authorization: "Bearer " + localStorage.getItem("token"),
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
        setErrMsg("Adding Failed");
      }
    }
  };

  useEffect(() => {
    const fetchMData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/medicine", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        console.log(response.data);
        setMdata(response.data);
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
    fetchMData();
  }, []);

  useEffect(() => {
    const fetchSMData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/medicine/${medicine}`
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
    fetchSMData();
  }, [medicine]);

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
      <div className="title">Add Batch</div>
      <br />
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <div className="input-box">
        <span className="details">Medicine</span>
        <select
          className="ok"
          name="active"
          id="active"
          required
          onChange={(event) =>
            setMedicine(event.target.options[event.target.selectedIndex].value)
          }
        >
          <option value="item">List Medicine</option>
          {mdata &&
            mdata.map((m) => (
              <option value={`${m._id}`}>
                {` ${m.medicine_id}, ${m.name}, ${m.generic_name}, ${m.mfg}, ${m.dosage}, ${m.package}, ${m.strength}, ${m.type}, ${m.unit}`}
              </option>
            ))}
        </select>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <span className="details">Date</span>
          <input
            type="text"
            placeholder="enter date"
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        <div className="branch-detail">
          <span className="details">Medicine Info</span> <br />
          <span className="details">med id : {mid}</span> <br />
          <span className="details">med Name : {name}</span> <br />
          <span className="details">med type : {type}</span>
          <br />
          <span className="details">med mfg : {mfg}</span>
          <br />
          <span className="details">med generic_name: {generic_name}</span>{" "}
          <br />
          <span className="details">med dosage : {dosage}</span> <br />
          <span className="details">med price : {price}</span> <br />
          <span className="details">med strength : {strength}</span> <br />
          <span className="details">med unit : {unit}</span> <br />
          <span className="details">med package : {packages}</span> <br />
          <img src={image} width="30" height="30"></img> <br />
          
          <div className="input-box">
            <span className="details">Quantity</span>
            <input
              type="text"
              placeholder="enter Drug quantity"
              onChange={(event) => setQuantity(event.target.value)}
            />
          </div>
          <div className="input-box">
            <span className="details">Date Manufacture</span>
            <input
              type="text"
              placeholder="enter date of manufacture"
              required
              onChange={(event) => setDate_mfg(event.target.value)}
            />
          </div>
          <div className="input-box">
            <span className="details">Date Expire</span>
            <input
              type="text"
              placeholder="enter date expire"
              required
              onChange={(event) => setDate_expire(event.target.value)}
            />
          </div>
        </div>

        <br />
        <br />
        <div className="button">
          <input onClick={addRow} id="add" placeholder="list" />
        </div>

        <br />
        <br />
        <table id="table" border="1">
          <thead id="table-head">
            <tr>
              <th>Drug Name</th>
              <th>Quantity</th>
              <th>Date Manufacture</th>
              <th>Date Expire</th>
            </tr>
          </thead>
          <tbody id="table-body">
            {/* {storedData.map(item=>
          <tr key={item}>
            {item.map(col=>
            <td>{col}</td>)}
          </tr>)} */}

            {medData.map((item) => (
              <tr key={item.id}>
                <td>{item.medname}</td>
                <td>{item.medquantity}</td>
                <td>{item.medmfg}</td>
                <td>{item.medexpire}</td>
                <td>
                  <button onClick={() => deletemed(item.id)}>X</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="button">
          <input type="submit" value="Add" />
        </div>
      </form>
    </div>
  );

  function deletemed(id) {
    // Filter out todo with the id
    const newList = medData.filter((item) => item.id !== id);

    setMedData(newList);
  }

  function addRow() {
    const medD = {
      id: Math.random(),
      medname: `${mid}, ${name}, ${generic_name}, ${mfg}, ${dosage}, ${packages}, ${strength}, ${type}, ${unit}`,
      medquantity: quantity,
      medmfg: date_mfg,
      medexpire: date_expire,
    };

    setMedData([...medData, medD]);
  }
}
