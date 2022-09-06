export default function x() {
  return (
    <div>
      Item:
      <input type="text" name="item" id="item" />
      <br />
      Quantity:
      <input type="text" name="quantity" id="quantity" />
      <br />
      Price: AUD
      <input type="text" name="price" id="price" />
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
        <tbody id="table-body"></tbody>
      </table>
      console.log(tableBody);
    </div>
  );
}

function addRow() {
  var tableBody = document.getElementById("table-body");
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var row = document.createElement("tr");

  td1.innerHTML = document.getElementById("item").value;
  td2.innerHTML = document.getElementById("quantity").value;
  td3.innerHTML = document.getElementById("price").value;

  row.appendChild(td1);
  row.appendChild(td2);
  row.appendChild(td3);

  tableBody.appendChild(row);
}
