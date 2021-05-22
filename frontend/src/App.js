import Pagination from "react-bootstrap/Pagination";

import "./App.css";

import { Table, Form, Col } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";

// function itemObj() {
//   this.date = util.randomDate(new Date(2012, 0, 1), new Date());
//   this.name = util.makeId(4);
//   this.count = Math.floor(Math.random() * 100);
//   this.distance = Math.floor(Math.random() * 1000);
// }

// for (var i = 0; i < 101; i++) {
//   items.push(new itemObj());
// }

const ITEMS_PER_PAGE = 10;

function App() {
  const [dataSaved, setDataSaved] = useState([]);
  const [itemsDisplayed, setItemsDisplayed] = useState([]);
  const [itemsToRender, setItemsToRender] = useState([]);
  const [filterState, setFilterState] = useState("");
  const [columnsState, setColumnState] = useState("name");
  const [conditionState, setConditionState] = useState("contains");
  const [page, setPage] = useState(0);

  let renderItems = () => {
    setItemsToRender(
      itemsDisplayed.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)
    );
  };

  const equalsStr = (rows, column) => {
    return rows.filter((row) => row[column].toLowerCase() === filterState);
  };
  const containsStr = (rows, column) => {
    return rows.filter(
      (row) => row[column].toLowerCase().indexOf(filterState) > -1
    );
  };

  const equalNumber = (rows, column) => {
    return rows.filter((row) => Number(row[column]) === Number(filterState));
  };
  const containsNumber = (rows, column) => {
    return rows.filter((row) => String(row[column]).indexOf(filterState) > -1);
  };
  const biggerNumber = (rows, column) => {
    return rows.filter((row) => Number(row[column]) > Number(filterState));
  };
  const lessNumber = (rows, column) => {
    return rows.filter((row) => Number(row[column]) < Number(filterState));
  };

  useEffect(() => {
    fetch("http://localhost:3002/data")
      .then((results) => results.json())
      .then((data) => {
        setDataSaved(data.data);
        setItemsDisplayed(data.data);
      });
  }, []);

  const inputEl = useRef(null);

  useEffect(() => {
    switch (columnsState) {
      case "name":
        if (conditionState === "equal") {
          setItemsDisplayed(equalsStr(dataSaved, "name"));
        } else if (conditionState === "contains") {
          setItemsDisplayed(containsStr(dataSaved, "name"));
        }
        break;
      case "distance":
      case "amount":
        if (conditionState === "equal") {
          setItemsDisplayed(equalNumber(dataSaved, columnsState));
        } else if (conditionState === "contains") {
          setItemsDisplayed(containsNumber(dataSaved, columnsState));
        } else if (conditionState === "bigger") {
          setItemsDisplayed(biggerNumber(dataSaved, columnsState));
        } else if (conditionState === "less") {
          setItemsDisplayed(lessNumber(dataSaved, columnsState));
        }
        break;
      default:
        break;
    }
  }, [filterState, columnsState, conditionState]);

  useEffect(() => {
    renderItems();
  }, [itemsDisplayed, page]);

  return (
    <div className="table-wrapper">
      <div>
        <Form>
          <Form.Row>
            <Col xs="auto" className="my-2">
              <Form.Control
                as="select"
                className="mr-sm-2"
                id="inlineFormCustomSelect"
                onChange={(event) => {
                  setColumnState(event.target.value);
                  setFilterState("");
                  setConditionState("contains");
                  inputEl.current.value = "contains";
                }}
              >
                <option value="name">Name</option>
                <option value="amount">Amount</option>
                <option value="distance">Distance</option>
              </Form.Control>
            </Col>
            <Col xs="auto" className="my-2">
              <Form.Control
                as="select"
                className="mr-sm-2"
                id="inlineFormCustomSelect"
                ref={inputEl}
                onChange={(event) => {
                  setConditionState(event.target.value);
                }}
              >
                <option value="contains">Contains</option>
                <option value="equal">Equal</option>
                <option disabled={columnsState === "name"} value="bigger">
                  Bigger
                </option>
                <option disabled={columnsState === "name"} value="less">
                  Less
                </option>
              </Form.Control>
            </Col>
            <Col xs="auto" className="my-2">
              <Form.Control
                placeholder="Data to filter"
                onChange={(event) => {
                  setFilterState(event.target.value);
                }}
              />
            </Col>
          </Form.Row>
        </Form>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Distance</th>
          </tr>
        </thead>
        <tbody>
          {itemsToRender.map((item, index) => {
            return (
              <tr>
                <td>{item.date.toString()}</td>
                <td>{item.name}</td>
                <td>{item.amount}</td>
                <td>{item.distance}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination>
        {new Array(Math.ceil(itemsDisplayed.length / ITEMS_PER_PAGE))
          .fill(0)
          .map((item, index) => {
            return (
              <Pagination.Item
                key={index}
                active={index === page}
                onClick={() => setPage(index)}
              >
                {index + 1}
              </Pagination.Item>
            );
          })}
      </Pagination>
    </div>
  );
}

export default App;
