import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Landing() {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const [num, setnum] = useState(0);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetch(`http://localhost:5000/normal/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setItem(data);
      console.log(data);
    };
    fetchAPI();
  }, [id]);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div>
        <h2>
          hi{" "}
          {item.details?.fixedincome
            ? Number(item.details.fixedincome) - 10
            : "Loading..."}
        </h2>
      </div>
    </div>
  );
}

export default Landing;
