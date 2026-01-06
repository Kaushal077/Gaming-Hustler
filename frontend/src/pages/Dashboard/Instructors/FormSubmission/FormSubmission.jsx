import React, { useState, useEffect, useRef } from "react";
import "./Form.css";
import Search from "../../../../assets/search.png";
import Excel from "../../../../assets/excel.png";
import Pdf from "../../../../assets/pdf.png";
import Json from "../../../../assets/json.png";
import Csv from "../../../../assets/csv.png";

const toPDF = () => {
  const htmlCode = `
  <!DOCTYPE html>
  <link rel="stylesheet" type="text/css" href="style.css">
  <main class="table" id="customers_table">${customersTable.innerHTML}</main>`;

  const newWindow = window.open();
  newWindow.document.write(htmlCode);

  setTimeout(() => {
    newWindow.print();
    newWindow.close();
  }, 400);
};

const toJSON = () => {
  let tableData = [],
    tHead = [],
    tHeadings = customersTable.querySelectorAll("th"),
    tRows = customersTable.querySelectorAll("tbody tr");

  for (let tHeading of tHeadings) {
    let actualHead = tHeading.textContent.trim().split(" ");

    tHead.push(
      actualHead
        .splice(0, actualHead.length - 1)
        .join(" ")
        .toLowerCase()
    );
  }

  tRows.forEach((row) => {
    const rowObject = {},
      tCells = row.querySelectorAll("td");

    tCells.forEach((tCell, cellIndex) => {
      const img = tCell.querySelector("img");
      if (img) {
        rowObject["customer image"] = decodeURIComponent(img.src);
      }
      rowObject[tHead[cellIndex]] = tCell.textContent.trim();
    });
    tableData.push(rowObject);
  });

  return JSON.stringify(tableData, null, 4);
};

const toCSV = () => {
  const tHeads = customersTable.querySelectorAll("th"),
    tbodyRows = customersTable.querySelectorAll("tbody tr");

  const headings =
    [...tHeads]
      .map((head) => {
        let actualHead = head.textContent.trim().split(" ");
        return actualHead
          .splice(0, actualHead.length - 1)
          .join(" ")
          .toLowerCase();
      })
      .join(",") +
    "," +
    "image name";

  const tableData = [...tbodyRows].map((row) => {
    const rowObject = {},
      tCells = row.querySelectorAll("td");

    tCells.forEach((tCell, cellIndex) => {
      const img = tCell.querySelector("img");
      if (img) {
        rowObject["customer image"] = decodeURIComponent(img.src);
      }
      rowObject[tHeads[cellIndex].textContent.trim().toLowerCase()] =
        tCell.textContent.trim();
    });
    return Object.values(rowObject).join(",");
  });

  return [headings].concat(tableData).join("\n");
};

const toExcel = () => {
  let data = [],
    headings = [],
    rows = customersTable.querySelectorAll("tbody tr");

  const headingCells = customersTable.querySelectorAll("th");

  for (let headingCell of headingCells) {
    let actualHead = headingCell.textContent.trim().split(" ");
    headings.push(
      actualHead
        .splice(0, actualHead.length - 1)
        .join(" ")
        .toLowerCase()
    );
  }

  rows.forEach((row) => {
    const rowObject = {},
      tCells = row.querySelectorAll("td");

    tCells.forEach((tCell, cellIndex) => {
      const img = tCell.querySelector("img");
      if (img) {
        rowObject["customer image"] = decodeURIComponent(img.src);
      }
      rowObject[headings[cellIndex]] = tCell.textContent.trim();
    });
    data.push(rowObject);
  });

  const workbook = XLSX.utils.book_new(),
    worksheet = XLSX.utils.json_to_sheet(data);

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const workbookBinary = XLSX.write(workbook, {
    type: "binary",
    bookType: "xlsx",
  });

  return workbookBinary;
};

const downloadFile = (content, type, name = "file") => {
  const file = new Blob([content], { type });
  const a = document.createElement("a");
  const url = URL.createObjectURL(file);

  a.href = url;
  a.download = `${name}.${type}`;
  a.click();
  URL.revokeObjectURL(url);
};

const FormSubmission = () => {
  const [search, setSearch] = useState("");
  const [exportOptionsVisible, setExportOptionsVisible] = useState(false);
  const [tableRows, setTableRows] = useState([]);
  const [pdfBtn, setPdfBtn] = useState(null);
  const [jsonBtn, setJsonBtn] = useState(null);
  const [csvBtn, setCsvBtn] = useState(null);
  const [excelBtn, setExcelBtn] = useState(null);
  const [customersTable, setCustomersTable] = useState(null);

  const searchInputRef = useRef(null);
  const pdfButtonRef = useRef(null);
  const jsonButtonRef = useRef(null);
  const csvButtonRef = useRef(null);
  const excelButtonRef = useRef(null);
  const tableRowsRef = useRef([]);

  useEffect(() => {
    setSearch(searchInputRef.current);
    setPdfBtn(pdfButtonRef.current);
    setJsonBtn(jsonButtonRef.current);
    setCsvBtn(csvButtonRef.current);
    setExcelBtn(excelButtonRef.current);
    setTableRows(tableRowsRef.current);

    const searchTable = () => {
      tableRowsRef.current.forEach((row, i) => {
        let tableData = row.textContent.toLowerCase(),
          searchData = search.value.toLowerCase();

        row.classList.toggle("hide", tableData.indexOf(searchData) < 0);
        row.style.setProperty("--delay", i / 25 + "s");
      });

      document
        .querySelectorAll("tbody tr:not(.hide)")
        .forEach((visibleRow, i) => {
          visibleRow.style.backgroundColor =
            i % 2 === 0 ? "transparent" : "#0000000b";
        });
    };

    if (pdfButtonRef.current) {
      pdfButtonRef.current.onclick = toPDF;
    }
    if (jsonButtonRef.current) {
      jsonButtonRef.current.onclick = () => {
        const json = toJSON();
        downloadFile(json, "json");
      };
    }
    if (csvButtonRef.current) {
      csvButtonRef.current.onclick = () => {
        const csv = toCSV();
        downloadFile(csv, "csv", "customer_orders");
      };
    }
    if (excelButtonRef.current) {
      excelButtonRef.current.onclick = () => {
        const excel = toExcel();
        downloadFile(excel, "xlsx");
      };
    }

    searchInputRef.current.addEventListener("input", searchTable);

    return () => {
      searchInputRef.current.removeEventListener("input", searchTable);
    };
  }, []);

  const toggleExportOptions = () => {
    setExportOptionsVisible(!exportOptionsVisible);
  };

  return (
    <div className="body">
      <main className="table">
        <div className="table__header">
          <div className="input-group">
            <img src={Search} alt="Search" />
            <input
              type="text"
              placeholder="Search table"
              className="search-input"
              ref={searchInputRef}
            />
          </div>
          <div className="export__file">
            <button
              className="export__file-btn"
              onClick={toggleExportOptions}
            ></button>
            {exportOptionsVisible && (
              <div className="export__file-options">
                <button onClick={toPDF}>
                  <img src={Pdf} alt="Export PDF" />
                </button>
                <button onClick={toJSON}>
                  <img src={Json} alt="Export JSON" />
                </button>
                <button onClick={toCSV}>
                  <img src={Csv} alt="Export CSV" />
                </button>
                <button onClick={toExcel}>
                  <img src={Excel} alt="Export Excel" />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="table__body">
          <table className="table" ref={(table) => setCustomersTable(table)}>
            <thead>
              <tr>
                <th> Team Name </th>
                <th> Player 1</th>
                <th> Player 2 </th>
                <th> Player 3</th>
                <th> Player 4</th>
                <th> Email ID</th>
                <th> Discord ID</th>
                <th> Mob.no</th>
                <th> Action</th>
              </tr>
            </thead>
            <tbody
              ref={(tbody) => {
                if (tbody) {
                  tableRowsRef.current = tbody.querySelectorAll("tr");
                }
              }}
            >
              <tr>
                <td>
                  <img src="/gh-logo.png" alt="" />
                  Team1
                </td>
                <td>Alice</td>
                <td>Bob</td>
                <td>Charlie</td>
                <td>David</td>
                <td>alice@example.com</td>
                <td>#Alice1234</td>
                <td>
                  <strong>1234567890</strong>
                </td>
                <td>
                  <p className="status delivered">EDIT</p>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="/gh-logo.png" alt="" />
                  Team2
                </td>
                <td>Emma</td>
                <td>Frank</td>
                <td>Grace</td>
                <td>Harry</td>
                <td>emma@example.com</td>
                <td>#Emma5678</td>
                <td>
                  <strong>9876543210</strong>
                </td>
                <td>
                  <p className="status delivered">EDIT</p>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="/gh-logo.png" alt="" />
                  Team3
                </td>
                <td>Liam</td>
                <td>Sophia</td>
                <td>Ava</td>
                <td>Noah</td>
                <td>liam@example.com</td>
                <td>#Liam1234</td>
                <td>
                  <strong>8765432109</strong>
                </td>
                <td>
                  <p className="status pending">EDIT</p>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="/gh-logo.png" alt="" />
                  Team4
                </td>
                <td>Oliver</td>
                <td>Isabella</td>
                <td>Elijah</td>
                <td>Amelia</td>
                <td>oliver@example.com</td>
                <td>#Oliver2345</td>
                <td>
                  <strong>7654321098</strong>
                </td>
                <td>
                  <p className="status cancelled">EDIT</p>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="/gh-logo.png" alt="" />
                  Team5
                </td>
                <td>James</td>
                <td>Charlotte</td>
                <td>Carter</td>
                <td>Mia</td>
                <td>james@example.com</td>
                <td>#James3456</td>
                <td>
                  <strong>6543210987</strong>
                </td>
                <td>
                  <p className="status delivered">EDIT</p>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="/gh-logo.png" alt="" />
                  Team6
                </td>
                <td>Noah</td>
                <td>Olivia</td>
                <td>Lucas</td>
                <td>Ella</td>
                <td>noah@example.com</td>
                <td>#Noah4567</td>
                <td>
                  <strong>5432109876</strong>
                </td>
                <td>
                  <p className="status pending">EDIT</p>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="/gh-logo.png" alt="" />
                  Team7
                </td>
                <td>William</td>
                <td>Amelia</td>
                <td>Liam</td>
                <td>Ava</td>
                <td>william@example.com</td>
                <td>#William6789</td>
                <td>
                  <strong>4321098765</strong>
                </td>
                <td>
                  <p className="status cancelled">EDIT</p>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="/gh-logo.png" alt="" />
                  Team8
                </td>
                <td>Ethan</td>
                <td>Emma</td>
                <td>Olivia</td>
                <td>Liam</td>
                <td>ethan@example.com</td>
                <td>#Ethan7890</td>
                <td>
                  <strong>3210987654</strong>
                </td>
                <td>
                  <p className="status delivered">EDIT</p>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="/gh-logo.png" alt="" />
                  Team9
                </td>
                <td>Mason</td>
                <td>Ava</td>
                <td>Lucas</td>
                <td>Olivia</td>
                <td>mason@example.com</td>
                <td>#Mason8901</td>
                <td>
                  <strong>2109876543</strong>
                </td>
                <td>
                  <p className="status pending">EDIT</p>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="/gh-logo.png" alt="" />
                  Team10
                </td>
                <td>Alexander</td>
                <td>Charlotte</td>
                <td>Benjamin</td>
                <td>Sophia</td>
                <td>alexander@example.com</td>
                <td>#Alexander9012</td>
                <td>
                  <strong>1098765432</strong>
                </td>
                <td>
                  <p className="status cancelled">EDIT</p>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="/gh-logo.png" alt="" />
                  Team11
                </td>
                <td>Michael</td>
                <td>Luna</td>
                <td>Chloe</td>
                <td>Ethan</td>
                <td>michael@example.com</td>
                <td>#Michael1235</td>
                <td>
                  <strong>0987654321</strong>
                </td>
                <td>
                  <p className="status delivered">EDIT</p>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="/gh-logo.png" alt="" />
                  Team12
                </td>
                <td>Sophia</td>
                <td>Aiden</td>
                <td>Isabella</td>
                <td>Elijah</td>
                <td>sophia@example.com</td>
                <td>#Sophia3456</td>
                <td>
                  <strong>9876543210</strong>
                </td>
                <td>
                  <p className="status pending">EDIT</p>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="/gh-logo.png" alt="" />
                  Team13
                </td>
                <td>Ethan</td>
                <td>Amelia</td>
                <td>Liam</td>
                <td>Ava</td>
                <td>ethan@example.com</td>
                <td>#Ethan5678</td>
                <td>
                  <strong>8765432109</strong>
                </td>
                <td>
                  <p className="status delivered">EDIT</p>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="/gh-logo.png" alt="" />
                  Team14
                </td>
                <td>Mia</td>
                <td>Lucas</td>
                <td>Emma</td>
                <td>Oliver</td>
                <td>mia@example.com</td>
                <td>#Mia1234</td>
                <td>
                  <strong>7654321098</strong>
                </td>
                <td>
                  <p className="status cancelled">EDIT</p>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="/gh-logo.png" alt="" />
                  Team15
                </td>
                <td>Olivia</td>
                <td>Liam</td>
                <td>Ethan</td>
                <td>Ava</td>
                <td>olivia@example.com</td>
                <td>#Olivia2345</td>
                <td>
                  <strong>6543210987</strong>
                </td>
                <td>
                  <p className="status delivered">EDIT</p>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="/gh-logo.png" alt="" />
                  Team16
                </td>
                <td>Noah</td>
                <td>Isabella</td>
                <td>James</td>
                <td>Charlotte</td>
                <td>noah@example.com</td>
                <td>#Noah4567</td>
                <td>
                  <strong>5432109876</strong>
                </td>
                <td>
                  <p className="status pending">EDIT</p>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="/gh-logo.png" alt="" />
                  Team17
                </td>
                <td>Lucas</td>
                <td>Ella</td>
                <td>William</td>
                <td>Amelia</td>
                <td>lucas@example.com</td>
                <td>#Lucas6789</td>
                <td>
                  <strong>4321098765</strong>
                </td>
                <td>
                  <p className="status cancelled">EDIT</p>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="/gh-logo.png" alt="" />
                  Team18
                </td>
                <td>Ava</td>
                <td>Liam</td>
                <td>Mason</td>
                <td>Olivia</td>
                <td>ava@example.com</td>
                <td>#Ava7890</td>
                <td>
                  <strong>3210987654</strong>
                </td>
                <td>
                  <p className="status delivered">EDIT</p>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="/gh-logo.png" alt="" />
                  Team19
                </td>
                <td>Benjamin</td>
                <td>Sophia</td>
                <td>Alexander</td>
                <td>Charlotte</td>
                <td>benjamin@example.com</td>
                <td>#Benjamin8901</td>
                <td>
                  <strong>2109876543</strong>
                </td>
                <td>
                  <p className="status pending">EDIT</p>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="/gh-logo.png" alt="" />
                  Team20
                </td>
                <td>Chloe</td>
                <td>Ethan</td>
                <td>Michael</td>
                <td>Luna</td>
                <td>chloe@example.com</td>
                <td>#Chloe9012</td>
                <td>
                  <strong>1098765432</strong>
                </td>
                <td>
                  <p className="status cancelled">EDIT</p>
                </td>
              </tr>
              <tr>
                <td>
                  <img src="/gh-logo.png" alt="" />
                  Team21
                </td>
                <td>Ella</td>
                <td>James</td>
                <td>Sophia</td>
                <td>Aiden</td>
                <td>ella@example.com</td>
                <td>#Ella1235</td>
                <td>
                  <strong>0987654321</strong>
                </td>
                <td>
                  <p className="status delivered">EDIT</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default FormSubmission;
