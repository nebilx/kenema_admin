

import "./EditBranch.css";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Stack, Form,  } from "react-bootstrap";
export default function NewBranch() {
  //   const navigate = useNavigate();

  const [name, setName] = useState("");
  const [pno, setPno] = useState("");
  const [address, setAddress] = useState("");
const [status,setStatus] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (errMsg.trim() !== "")
      setTimeout(() => {
        setErrMsg("");
      }, 5000);
  }, [errMsg]);

  return (
    <div className="container">
    <div className="title">List Type</div>
    <br />
    <p
      ref={errRef}
      className={errMsg ? "errmsg" : "offscreen"}
      aria-live="assertive"
    >
      {errMsg}
    </p>

    <Table striped bordered condensed hover>
  <thead>
   <tr>
    <th>Service</th>
    <th>App Id</th>
    <th>Server</th>
    <th>Port</th>
    <th>Last Heartbeat</th>
   </tr>
  </thead>
  <tbody>
  { registrations.map((registry) =>
   <ServiceRegistry key={registry.Id} registry={registry} />
  )}
  </tbody>
  </Table>

</div>
  )
}
