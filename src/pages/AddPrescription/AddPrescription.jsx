import "./AddPrescription.css";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
export default function Xtest() {
  const [medData, setMedData] = useState([]);
  const [drug, setDrug] = useState("");
  const [expire, setExpire] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");

  const [pdata, setPdata] = useState("");
  const [patient, setPatient] = useState("");

  const [mdata, setMdata] = useState("");
  const [medicine, setMedicine] = useState("");

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

  console.log(patient);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(medData);
    try {
      console.log(date);
      console.log(medData);
      const response = await axios.post(
        "http://localhost:4000/prescription",
        JSON.stringify({ date, medData }),
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
    const fetchPData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/patient", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        console.log(response.data);
        setPdata(response.data);
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

    const fetchBData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/batch", {
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

    fetchPData();
    fetchBData();
  }, []);

  useEffect(() => {
    const fetchPData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/patient/${patient}`
        );

        console.log(response.data);

        setName(response.data.name);
        setAge(response.data.age);
        setGender(response.data.gender);
        setDob(response.data.dob);
        setPno(response.data.pno);
        setImage(response.data.p_image.url);
        setCity(response.data.address[0].city);
        setSub_city(response.data.address[0].sub_city);
        setWoreda(response.data.address[0].woreda);
        setHouse_no(response.data.address[0].house_no);

        setI_id(response.data.insurance[0].insurance_id);
        setI_name(response.data.insurance[0].insurance_name);
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

    fetchPData();
  }, [patient]);

  useEffect(() => {
    const fetchSMData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/medicine/${medicine}`
        );

        console.log(response.data);

        // setMid(response.data.medicine_id);
        // setName(response.data.name);
        // setType(response.data.type);
        // setMfg(response.data.mfg);
        // setGeneric_name(response.data.generic_name);
        // setDosage(response.data.dosage);
        // setPrice(response.data.price);
        // setStrength(response.data.strength);
        // setUnit(response.data.unit);
        // setPackages(response.data.package);
        // setImage(response.data.image.url);
        // setStatus(response.data.status);
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

  return (
    <div>
      <div className="input-box">
        <span className="details">Patient</span>
        <select
          className="ok"
          name="active"
          id="active"
          required
          onChange={(event) =>
            setPatient(event.target.options[event.target.selectedIndex].value)
          }
        >
          <option value="item">List Patient</option>
          {pdata &&
            pdata.map((m) => <option value={`${m._id}`}>{m.name}</option>)}
        </select>
      </div>
      <span className="details">Patient Info</span> <br />
      <span className="details">Name : {name}</span> <br />
      <span className="details">Age : {age}</span> <br />
      <span className="details">Gender : {gender}</span> <br />
      <span className="details">Date of Birth : {dob}</span> <br />
      <span className="details">Phone Number : {pno}</span> <br />
      <span className="details">
        Address : {`${city},${sub_city},${woreda},${house_no}`}
      </span>{" "}
      <br />
      <span className="details">Insurance Info</span> <br />
      <span className="details">Insurance Id : {i_id}</span> <br />
      <span className="details">Insurance Name : {i_name}</span> <br />
      <br />
      <div className="input-box">
        <span className="details">Medicine</span>
        <select
          className="ok"
          name="active"
          id="active"
          required
          onChange={(event) =>
            setMedicine(event.target.options[event.target.selectedIndex].text)
          }
        >
          <option value="item">List Medicine</option>
          {mdata && mdata.map((m) => <option value="item">{m.name}</option>)}
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
              <th>Drug name</th>
              <th>Expire</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody id="table-body">
            {/* {storedData.map(item=>
    <tr key={item}>
      {item.map(col=>
      <td>{col}</td>)}
    </tr>)} */}

            {/* {medData.map((item) => (
              <tr key={item.id}>
                <td>{item.medname}</td>
                <td>{item.medexpire}</td>
                <td>{item.medquantity}</td>
                <td>
                  <button onClick={() => deletemed(item.id)}>X</button>
                </td>
              </tr>
            ))} */}
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
      medname: drug,
      medexpire: expire,
      medquantity: quantity,
    };

    setMedData([...medData, medD]);
  }
}
