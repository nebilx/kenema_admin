// export default function x() {
//   return (
//     <div>
//       Item:
//       <input type="text" name="item" id="item" />
//       <br />
//       Quantity:
//       <input type="text" name="quantity" id="quantity" />
//       <br />
//       Price: AUD
//       <input type="text" name="price" id="price" />
//       <br />
//       <br />
//       <div className="button">
//         <input type="submit" value="Add" onClick={addRow} id="add" />
//       </div>
//       <br />
//       <br />
//       <table id="table" border="1">
//         <thead id="table-head">
//           <tr>
//             <th>Item</th>
//             <th>Quantity</th>
//             <th>Price</th>
//           </tr>
//         </thead>
//         <tbody id="table-body"></tbody>
//       </table>
//       console.log(tableBody);
//     </div>
//   );
// }

// function addRow() {
//   var tableBody = document.getElementById("table-body");
//   var td1 = document.createElement("td");
//   var td2 = document.createElement("td");
//   var td3 = document.createElement("td");
//   var row = document.createElement("tr");

//   td1.innerHTML = document.getElementById("item").value;
//   td2.innerHTML = document.getElementById("quantity").value;
//   td3.innerHTML = document.getElementById("price").value;

//   row.appendChild(td1);
//   row.appendChild(td2);
//   row.appendChild(td3);

//   tableBody.appendChild(row);
// }


import { useState } from 'react';
export default function Xtest() {
  const [storedData , setStoredData] = useState([]);
  const [item,setItem] = useState("");
  const [quantity,setQuantity] = useState("");
  const [price,setPrice] = useState("");
  
  function finished() {
    // this thing only print the first element 
      alert(storedData[0] ?? "no data found");
      console.log(storedData.map(t => {
        console.log(t);
      }) ?? "no data found");
    }
    
    function addRow() {
      setStoredData([...storedData,[item,quantity,price]])
    }
    
  return (
    <div>
      Item:
      <input type="text" name="item" value={item} onChange={(e)=>setItem(e.target.value)} id="item" />
      <br />
      Quantity:
      <input type="text" name="quantity" value={quantity} onChange={(e)=>setQuantity(e.target.value)} id="quantity" />
      <br />
      Price: AUD
      <input type="text" name="price" value={price} onChange={(e)=>setPrice(e.target.value)} id="price" />
      <br />
      <br />
      <div className="button">
        <input type="submit" value="Add" onClick={addRow} id="add" />
      </div>
      <br />
      <br />
      <table id="table" border="1">
        <thead id="table-head">
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody id="table-body">
          {storedData.map(row=><tr>
            {row.map(col=><td>{col}</td>)}
          </tr>)}
        </tbody>
      </table>
      <div className="button">
        <input type="submit" value="Print" onClick={finished} id="add" />
      </div>
    </div>
  );
}