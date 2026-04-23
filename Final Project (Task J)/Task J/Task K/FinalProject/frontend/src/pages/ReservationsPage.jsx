import React, { useEffect, useState } from "react";

const ReservationsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/reservations")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f0d0b",
        padding: "4rem 2rem",
        fontFamily: "'Georgia', serif",
        color: "#d4b483",
      }}
    >
      {/* Page Title */}
      <h2
        style={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#c9a84c",
          marginBottom: "2.5rem",
          letterSpacing: "0.05em",
        }}
      >
        All Reservations
      </h2>

      {data.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888", fontSize: "1rem" }}>
          No reservations found.
        </p>
      ) : (
        <div
          style={{
            overflowX: "auto",
            borderRadius: "12px",
            border: "1px solid #2e2218",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#1a1410",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#2a1f12",
                  borderBottom: "2px solid #c9a84c",
                }}
              >
                {["ID", "Name", "Email", "Date", "Guests", "Comments"].map(
                  (heading) => (
                    <th
                      key={heading}
                      style={{
                        padding: "1rem 1.25rem",
                        textAlign: "left",
                        color: "#c9a84c",
                        fontWeight: "600",
                        fontSize: "0.85rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr
                  key={item.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#1a1410" : "#1f1812",
                    borderBottom: "1px solid #2e2218",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#2a2016")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      index % 2 === 0 ? "#1a1410" : "#1f1812")
                  }
                >
                  {[
                    item.id,
                    item.full_name,
                    item.email,
                    item.reservation_date
                      ? new Date(item.reservation_date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "—",
                    item.guests,
                    item.comments,
                  ].map((value, i) => (
                    <td
                      key={i}
                      style={{
                        padding: "0.9rem 1.25rem",
                        color: "#d4b483",
                        fontSize: "0.9rem",
                      }}
                    >
                      {value ?? "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer note */}
      <p
        style={{
          textAlign: "center",
          marginTop: "3rem",
          color: "#555",
          fontSize: "0.8rem",
        }}
      >
      
      </p>
    </div>
  );
};

export default ReservationsPage;