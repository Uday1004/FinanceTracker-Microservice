import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../Utils/Model";
import {
  Container,
  Header,
  Sidebar,
  Sidenav,
  Content,
  Nav,
  Breadcrumb,
  IconButton,
  HStack,
  Stack,
  Text,
} from "rsuite";
import { Icon } from "@rsuite/icons";
import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FadeLoader } from "react-spinners";

import {
  MdDashboard,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdOutlineStackedBarChart,
} from "react-icons/md";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

function Dashboard() {
  const [expand, setExpand] = React.useState(true);
  const { id } = useParams();
  const [item, setItem] = useState({
    name: "",
    details: {
      dailyearning: [],
      dailyexpense: [],
    },
  });
  const [value, setValue] = useState(""); // Start with an empty string
  const [open, setOpen] = React.useState(false);
  const testRef = useRef(null);
  const [mode, setMode] = useState(""); // "earning" or "expense"
  const [totalEarn, setTotalEarn] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [saving, setSaving] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        // setLoading(true);
        const response = await fetch(`http://localhost:5000/normal/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setItem(
          data || {
            name: "",
            details: {
              dailyearning: [],
              dailyexpense: [],
            },
          }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        setItem({
          name: "",
          details: {
            dailyearning: [],
            dailyexpense: [],
          },
        });
      } finally {
        // setLoading(false);
      }
    };
    fetchAPI();
  }, [id]);

  const handleModel1Open = (e) => {
    setMode("earning");
    setOpen(true);
  };

  const handleModel2Open = (e) => {
    setMode("expense");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const testsubmit = async (e) => {
    e.preventDefault();

    if (String(value).trim() === "") return;
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return;

    const date = new Date();
    const newItem = {
      date: date.toLocaleDateString("en-GB"),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      amount: numericValue,
    };

    try {
      const endpoint =
        mode === "earning"
          ? `http://localhost:5000/details/${id}/dailyearning`
          : `http://localhost:5000/details/${id}/dailyexpense`;

      const res = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (!res.ok) {
        const errData = await res.json();
        console.error("Failed:", errData);
        return;
      }

      // Update state with new item
      setItem((prev) => {
        const updated = { ...prev };
        if (mode === "earning") {
          updated.details.dailyearning.push(newItem);
        } else {
          updated.details.dailyexpense.push(newItem);
        }
        return updated;
      });

      setValue(""); // Clear input
      setOpen(false); // Close modal
    } catch (err) {
      console.error("❌ Error submitting:", err);
    } finally {
      window.location.reload();
    }
  };

  //Other Functions for header cards
  //total income + saving
  useEffect(() => {
    // Safely calculate total earnings from daily entries
    const totalDailyEarnings = (item.details?.dailyearning || []).reduce(
      (total, entry) => total + (Number(entry?.amount) || 0),
      0
    );

    // Safely get fixed income (handles strings, null/undefined, etc.)
    const fixedIncome = Math.max(0, Number(item.details?.fixedincome)) || 0;

    // Calculate total income (daily + fixed)
    const totalIncome = totalDailyEarnings + fixedIncome;

    // Safely calculate total expenses
    const totalExpenses = (item.details?.dailyexpense || []).reduce(
      (total, entry) => total + (Number(entry?.amount) || 0),
      0
    );

    // Calculate savings (ensure it's never negative)
    const netSavings = Math.max(0, totalIncome - totalExpenses);

    // Update state
    setTotalEarn(totalIncome);
    setTotalExpense(totalExpenses);
    setSaving(netSavings);
  }, [item]);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div>
      <nav className="navbar navbar-light bg-light p-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <div
              className="rounded-circle bg-primary"
              style={{ width: "16px", height: "16px" }}
            ></div>
            <span
              className="fs-4 fw-semibold 
                text-dark text-light
              "
            >
              FI-Track
            </span>
          </div>

          <div className="dropdown mx-3">
            {/* <Dropdown title="Dropdown">
              <Dropdown.Item>New File</Dropdown.Item>
              <Dropdown.Item>Current Profile</Dropdown.Item>
              <Dropdown.Item>Download As...</Dropdown.Item>
              <Dropdown.Item>Export PDF</Dropdown.Item>
              <Dropdown.Item>Export HTML</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>About</Dropdown.Item>
            </Dropdown> */}
            <span className="mx-3">
              WELCOME{" "}
              <span className="text-primary">
                {item.name ? item.name.toUpperCase() : "Loading..."}
              </span>
            </span>

            {item.profile ? (
              <span className="text-light rounded-circle">
                <img
                  src="https://media.licdn.com/dms/image/v2/D4D03AQHmY9zARl-klQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1718274711921?e=2147483647&v=beta&t=suFg2dSF1BaPz_PwWZ_iMCOqHltkGpbIyyGOD9AGs3g"
                  alt=""
                  className="rounded-circle img-fluid"
                  style={{ width: "35px", height: "35px" }}
                />
              </span>
            ) : (
              <span className="bg-info text-light rounded-circle px-3 py-2">
                {item.name?.charAt(0)?.toUpperCase() ?? ""}
              </span>
            )}
          </div>
        </div>
      </nav>

      <div height={800} className="sidebar-page">
        <Container>
          <Sidebar
            style={{
              display: "flex",
              flexDirection: "column",
              height: "90vh",
            }}
            width={expand ? 260 : 56}
            // height={800}
            collapsible
            className="shadow"
          >
            <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
            <Sidenav
              expanded={expand}
              defaultOpenKeys={["3"]}
              appearance="subtle"
            >
              <Sidenav.Body>
                <Nav defaultActiveKey="1">
                  <Nav.Item eventKey="1" icon={<Icon as={MdDashboard} />}>
                    Dashboard
                  </Nav.Item>
                  <Nav.Item eventKey="2" icon={<Icon as={IoMdSettings} />}>
                    Operations
                  </Nav.Item>
                  <Nav.Item
                    eventKey="3"
                    icon={<Icon as={MdOutlineStackedBarChart} />}
                  >
                    Chart
                  </Nav.Item>

                  <Nav.Menu
                    eventKey="4"
                    trigger="hover"
                    title="Profile"
                    icon={<Icon as={FaUser} />}
                    placement="rightStart"
                  >
                    <Nav.Item eventKey="4-1">Details</Nav.Item>
                    <Nav.Item eventKey="4-2">Contact Info</Nav.Item>
                    <Nav.Item eventKey="4-3">Profile Picture</Nav.Item>
                    <Nav.Item
                      eventKey="4-4"
                      className="text-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </Nav.Item>
                  </Nav.Menu>
                </Nav>
              </Sidenav.Body>
            </Sidenav>
          </Sidebar>

          <Container className="mt-2 mx-2">
            <Header className="page-header">
              <Breadcrumb>
                {/* <Breadcrumb.Item href="#">Home</Breadcrumb.Item> */}
                <Breadcrumb.Item href="##">Home</Breadcrumb.Item>
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
              </Breadcrumb>
            </Header>
            <Content>
              <div className="d-flex row gap-3 m-0  justify-content-center">
                <div className="card    col-10 col-sm-6 col-lg-3">
                  <div className="card-body">
                    <div style={{ height: "4.5rem" }}>
                      <h4>Fixed Income + Total Earn</h4>
                    </div>

                    <div className="h4 text-center text-info fw-bold mt-3">
                      {totalEarn}
                    </div>
                  </div>
                </div>
                <div className="card    col-9 col-sm-6 col-lg-3">
                  <div className="card-body">
                    <div style={{ height: "4.5rem" }}>
                      <h4>Total Expenditure</h4>
                    </div>
                    <div className="h4 text-center text-danger fw-bold mt-3">
                      {totalExpense}
                    </div>
                  </div>
                </div>
                <div className="card    col-9 col-sm-6 col-lg-3">
                  <div className="card-body">
                    <div style={{ height: "4.5rem" }}>
                      <h4>Total Saving </h4>
                    </div>
                    <div
                      className={`h4 text-center ${
                        saving >= 0 ? "text-success" : "text-danger"
                      } fw-bold mt-3`}
                    >
                      {saving}
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-start row gap-4">
                  {/* Earnings Card */}
                  <div className="card col-md-5">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <span className="h5 fw-bold">Add Earning</span>
                        <span
                          className="btn btn-success mx-3 mb-2 fw-bold"
                          onClick={handleModel1Open}
                        >
                          Add Earning
                        </span>
                      </div>

                      <div
                        className="border p-2"
                        style={{
                          width: "100%",
                          height: "300px",
                          overflowY: "auto",
                        }}
                      >
                        {item.details?.dailyearning?.length > 0 ? (
                          item.details.dailyearning.map((entry, idx) => (
                            <div
                              key={idx}
                              className="d-flex justify-content-between align-items-center border rounded px-3 py-2 mb-2"
                              style={{
                                width: "100%",
                                height: "60px",
                                backgroundColor: "#a29ca340",
                              }}
                            >
                              <div>
                                <div>{entry.date}</div>
                                <div>{entry.time}</div>
                              </div>
                              <div className="fs-4 fw-bold text-success">
                                ₹ {entry.amount}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-muted text-center mt-4">
                            No earnings yet
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expenses Card */}
                  <div className="card col-md-5">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <span className="h5 fw-bold">Add Expense</span>
                        <span
                          className="btn btn-danger mx-3 mb-2 fw-bold"
                          onClick={handleModel2Open}
                        >
                          Add Expense
                        </span>
                      </div>

                      <div
                        className="border p-2"
                        style={{
                          width: "100%",
                          height: "300px",
                          overflowY: "auto",
                        }}
                      >
                        {item.details?.dailyexpense?.length > 0 ? (
                          item.details.dailyexpense.map((entry, idx) => (
                            <div
                              key={idx}
                              className="d-flex justify-content-between align-items-center border rounded px-3 py-2 mb-2"
                              style={{
                                width: "100%",
                                height: "60px",
                                backgroundColor: "#a29ca340",
                              }}
                            >
                              <div>
                                <div>{entry.date}</div>
                                <div>{entry.time}</div>
                              </div>
                              <div className="fs-4 fw-bold text-danger">
                                ₹ {entry.amount}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-muted text-center mt-4">
                            No expenses yet
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="d-flex row gap-3 m-0  justify-content-center">
                <div className="col-10">ksdl</div>
                <div className="col-10">skdfjl</div>
              </div> */}
            </Content>
          </Container>
        </Container>
      </div>
      <Modal isOpen={open}>
        <>
          <form className="text-center">
            <Input
              type="text"
              placeholder="Enter value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              ref={testRef}
            />
            <Button
              className="btn btn-primary"
              title="Submit"
              type={"submit"}
              onClick={testsubmit}
            />

            <Button
              onClick={handleClose}
              className="btn btn-danger mx-2"
              title="Close"
            />
          </form>
          <div className="mt-2"></div>
        </>
      </Modal>
    </div>
  );
}

const NavToggle = ({ expand, onChange }) => {
  return (
    <Stack
      className="nav-toggle mx-2 mt-1 "
      justifyContent={expand ? "flex-start" : "center"}
    >
      <IconButton
        onClick={onChange}
        appearance="subtle"
        className="text-primary"
        size="lg"
        icon={
          expand ? (
            <MdKeyboardDoubleArrowLeft />
          ) : (
            <MdKeyboardDoubleArrowRight />
          )
        }
      />
    </Stack>
  );
};

const Brand = ({ expand }) => {
  return (
    <HStack className="page-brand" spacing={12}>
      {/* <FaReact size={26} /> */}
      {expand && <Text className="mx-2 p-2 align-self-center">Brand</Text>}
    </HStack>
  );
};
export default Dashboard;
