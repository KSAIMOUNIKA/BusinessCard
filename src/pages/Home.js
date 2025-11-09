import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ maxWidth: 800, color: "white" }}>
      <div style={{
        margin: "20px 0",
        padding: "20px",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        borderRadius: 15,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
      }}>
        <h1 style={{ margin: "0 0 20px 0", fontSize: "2.5em", textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
          Business Card Generator
        </h1>
        <p style={{ fontSize: "1.1em", lineHeight: "1.6" }}>
          Create a beautiful business card, save it to your account, and apply
          saved configurations. Use the "Create Card" page to design and save
          cards.
        </p>

        <div style={{ marginTop: 24 }}>
          <Link to="/create">
            <button style={{
              fontSize: "1.1em",
              padding: "12px 30px",
              borderRadius: "25px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              fontWeight: "bold",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              border: "none",
              cursor: "pointer"
            }}>
              Create a Card
            </button>
          </Link>
        </div>
      </div>

      <section style={{
        margin: "20px 0",
        padding: "20px",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        borderRadius: 15,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
      }}>
        <h3 style={{ marginTop: 0, fontSize: "1.8em" }}>How it works</h3>
        <ol style={{ paddingLeft: "20px" }}>
          <li style={{ padding: "10px", margin: "5px 0", borderRadius: "8px" }}>Register or login from the left panel.</li>
          <li style={{ padding: "10px", margin: "5px 0", borderRadius: "8px" }}>Use the form on Create Card to design your card.</li>
          <li style={{ padding: "10px", margin: "5px 0", borderRadius: "8px" }}>Save cards to your account and apply them later.</li>
        </ol>
      </section>
    </div>
  );
}
