// src/Card.js

import { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";

// Card component now accepts currentUser and logout from App.js
function Card({ currentUser, logout }) {
  let [customize, setCustomize] = useState({
    // Background options
    backgroundType: "gradient", // gradient, solid, pattern, image
    gradient1: "#007bff",
    gradient2: "#ffffff",
    solidColor: "#007bff",
    patternType: "dots", // dots, lines, grid, waves
    // Text colors
    color: "#000000",
    nameColor: "#000000",
    roleColor: "#000000",
    detailsColor: "#000000",
    skillsColor: "#000000",
    // Font sizes
    nameFontSize: "28",
    roleFontSize: "16",
    detailsFontSize: "12",
    skillsFontSize: "10",
    // Font families
    fontFamily: "Arial",
    nameFontFamily: "Arial",
    roleFontFamily: "Arial",
    detailsFontFamily: "Arial",
    skillsFontFamily: "Arial",
    // Font weights
    nameFontWeight: "bold",
    roleFontWeight: "normal",
    detailsFontWeight: "normal",
    skillsFontWeight: "normal",
    // Card shape
    cardShape: "rounded", // rounded, rectangle, circle, custom
    radius: "15",
    // Additional styling
    cardWidth: "350",
    cardHeight: "220",
    shadowIntensity: "5",
    borderWidth: "0",
    borderColor: "#000000",
    borderStyle: "solid",
  });
  let [data, setData] = useState({
    fullname: "John Doe",
    role: "Software developer lead",
    email: "johndoe@gmail.com",
    phNo: "+91 5555555555",
    address: "Avenue,510004",
    skill1: "React Js",
    skill2: "Mongo DB",
    skill3: "Express Js",
    skill4: "Node Js",
  });
  let [cards, setCards] = useState([]);

  // --- AUTH STATE/HANDLERS REMOVED ---
  // [currentUser, auth, authMessage, loginUser, registerUser, logout] are gone.
  // currentUser and logout are now props.

  // Optimized handlers with useCallback
  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleCustomize = useCallback((event) => {
    const { name, value } = event.target;
    setCustomize((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Apply a selected card's data and styles to the form and preview
  function applyCard(card) {
    // Update form data
    setData((prev) => ({
      ...prev,
      fullname: card.fullname || "",
      role: card.role || "",
      email: card.email || "",
      phNo: card.phNo || "",
      address: card.address || "",
      skill1: card.skill1 || "",
      skill2: card.skill2 || "",
      skill3: card.skill3 || "",
      skill4: card.skill4 || "",
    }));

    // Normalize radius to a numeric string (remove any trailing 'px')
    let radiusVal = card.radius ?? "15";
    if (typeof radiusVal === "number") radiusVal = String(radiusVal);
    if (typeof radiusVal === "string")
      radiusVal = radiusVal.replace(/px$/i, "");

    // Update customize styles with all new options
    setCustomize((prev) => ({
      ...prev,
      backgroundType: card.backgroundType || prev.backgroundType,
      gradient1: card.gradient1 || prev.gradient1,
      gradient2: card.gradient2 || prev.gradient2,
      solidColor: card.solidColor || prev.solidColor,
      patternType: card.patternType || prev.patternType,
      color: card.color || prev.color,
      nameColor: card.nameColor || card.color || prev.nameColor,
      roleColor: card.roleColor || card.color || prev.roleColor,
      detailsColor: card.detailsColor || card.color || prev.detailsColor,
      skillsColor: card.skillsColor || card.color || prev.skillsColor,
      nameFontSize: card.nameFontSize || prev.nameFontSize,
      roleFontSize: card.roleFontSize || prev.roleFontSize,
      detailsFontSize: card.detailsFontSize || prev.detailsFontSize,
      skillsFontSize: card.skillsFontSize || prev.skillsFontSize,
      fontFamily: card.fontFamily || prev.fontFamily,
      nameFontFamily: card.nameFontFamily || card.fontFamily || prev.nameFontFamily,
      roleFontFamily: card.roleFontFamily || card.fontFamily || prev.roleFontFamily,
      detailsFontFamily: card.detailsFontFamily || card.fontFamily || prev.detailsFontFamily,
      skillsFontFamily: card.skillsFontFamily || card.fontFamily || prev.skillsFontFamily,
      nameFontWeight: card.nameFontWeight || prev.nameFontWeight,
      roleFontWeight: card.roleFontWeight || prev.roleFontWeight,
      detailsFontWeight: card.detailsFontWeight || prev.detailsFontWeight,
      skillsFontWeight: card.skillsFontWeight || prev.skillsFontWeight,
      cardShape: card.cardShape || prev.cardShape,
      radius: radiusVal,
      cardWidth: card.cardWidth || prev.cardWidth,
      cardHeight: card.cardHeight || prev.cardHeight,
      shadowIntensity: card.shadowIntensity || prev.shadowIntensity,
      borderWidth: card.borderWidth || prev.borderWidth,
      borderColor: card.borderColor || prev.borderColor,
      borderStyle: card.borderStyle || prev.borderStyle,
    }));
  }

  // Optimized helper function to generate background style with useMemo
  const backgroundStyle = useMemo(() => {
    const radiusVal = String(customize.radius).replace(/px$/i, "");
    let borderRadius = "0px";
    
    switch (customize.cardShape) {
      case "rounded":
        borderRadius = `${radiusVal}px`;
        break;
      case "rectangle":
        borderRadius = "0px";
        break;
      case "circle":
        borderRadius = "50%";
        break;
      case "custom":
        borderRadius = `${radiusVal}px`;
        break;
      default:
        borderRadius = `${radiusVal}px`;
    }

    let background = "";
    switch (customize.backgroundType) {
      case "gradient":
        background = `linear-gradient(135deg, ${customize.gradient1}, ${customize.gradient2})`;
        break;
      case "solid":
        background = customize.solidColor;
        break;
      case "pattern":
        const patterns = {
          dots: `radial-gradient(circle, ${customize.gradient1} 1px, transparent 1px)`,
          lines: `repeating-linear-gradient(45deg, ${customize.gradient1}, ${customize.gradient1} 10px, ${customize.gradient2} 10px, ${customize.gradient2} 20px)`,
          grid: `linear-gradient(${customize.gradient1} 1px, transparent 1px), linear-gradient(90deg, ${customize.gradient1} 1px, ${customize.gradient2} 1px)`,
          waves: `repeating-linear-gradient(0deg, ${customize.gradient1}, ${customize.gradient2} 10px, ${customize.gradient1} 20px)`,
        };
        background = patterns[customize.patternType] || patterns.dots;
        break;
      default:
        background = `linear-gradient(135deg, ${customize.gradient1}, ${customize.gradient2})`;
    }

    return { background, borderRadius };
  }, [customize.radius, customize.cardShape, customize.backgroundType, customize.gradient1, customize.gradient2, customize.solidColor, customize.patternType]);

  // Optimized fetch cards function with useCallback
  const fetchCardsForUser = useCallback(async (username) => {
    if (!username) {
      setCards([]);
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5000/user/cards?username=${encodeURIComponent(
          username
        )}`
      );
      const cards = response.data?.cards || [];
      setCards(Array.isArray(cards) ? cards : []);
    } catch (error) {
      console.error("Error fetching cards:", error);
      setCards([]);
    }
  }, []);

  useEffect(() => {
    // When currentUser prop changes, load that user's cards
    fetchCardsForUser(currentUser);
  }, [currentUser, fetchCardsForUser]);

  // Optimized submit handler
  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    if (!currentUser) {
      alert("Please login or register to save a card.");
      return;
    }

    const payload = { ...data, ...customize, owner: currentUser };
    try {
      await axios.post("http://localhost:5000/user/save", payload);
      alert("Card saved successfully!");
      // Refresh cards for this user after save
      fetchCardsForUser(currentUser);
    } catch (err) {
      console.error("Error saving card:", err.response || err.message);
      alert(
        err.response?.data?.message ||
          "Error saving card. Check the console for details."
      );
    }
  }, [currentUser, data, customize, fetchCardsForUser]);

  if (!currentUser) {
    return (
      <div style={{ padding: 20, textAlign: "center", color: "white" }}>
        <div style={{
          margin: "20px 0",
          padding: "20px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: 15,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
        }}>
        <h2>Please log in to create and manage cards.</h2>
        <p>Navigate to the **Login** page to continue.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      display: "flex", 
      gap: 20, 
      alignItems: "flex-start",
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "0 20px"
    }}>
      {/* Sidebar for user info and logout */}
      <div style={{ 
        width: 260, 
        padding: 20, 
        background: "rgba(255, 255, 255, 0.15)", 
        backdropFilter: "blur(10px)", 
        borderRadius: 15,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        flexShrink: 0
      }}>
        <div>
          <h3 style={{ marginTop: 0, color: "white" }}>Logged in as</h3>
          <p style={{ fontWeight: 600, margin: "8px 0", color: "white" }}>{currentUser}</p>
          <button
            onClick={logout}
            style={{ 
              display: "block", 
              width: "100%", 
              padding: "12px 0",
              borderRadius: 10,
              background: "linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)",
              color: "white",
              fontWeight: "bold",
              boxShadow: "0 4px 15px rgba(238, 9, 121, 0.4)",
              border: "none",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>

        <div style={{ marginTop: 20 }}>
          <h1 style={{ color: "white" }}>Your Cards</h1>
          {Array.isArray(cards) && cards.length > 0 ? (
            cards.map((card) => {
              return (
                <div
                  key={card._id || card.email}
                  style={{
                marginBottom: 12,
                padding: 12,
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: 10,
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
                  <p style={{ margin: 0, fontWeight: "bold", color: "white" }}>
                    {card.fullname}
                  </p>
                  <p style={{ margin: 0, fontSize: "0.9em", color: "rgba(255, 255, 255, 0.8)" }}>{card.email}</p>
                  <button
                    name={card.email}
                    onClick={() => applyCard(card)}
                    style={{ 
                      marginTop: 8,
                      padding: "6px 15px",
                      borderRadius: 8,
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      fontSize: "0.9em",
                      fontWeight: "bold",
                      boxShadow: "0 2px 10px rgba(102, 126, 234, 0.3)",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    Apply
                  </button>
                </div>
              );
            })
          ) : (
            <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>You have no saved cards.</p>
          )}
        </div>
      </div>

      {/* Main Card Creation Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          padding: 24,
          background: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(10px)",
          borderRadius: 15,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
          flex: "1 1 500px",
          maxWidth: "600px",
          overflowY: "auto",
          maxHeight: "calc(100vh - 120px)"
        }}
      >
        <h3 style={{ 
          marginTop: 0,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>Create/Customize Card</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginBottom: 16,
          }}
        >
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={data.fullname}
            onChange={handleChange}
            style={{ border: "2px solid #e0e0e0" }}
          ></input>
          <input
            type="text"
            value={data.role}
            name="role"
            placeholder="Role"
            onChange={handleChange}
            style={{ border: "2px solid #e0e0e0" }}
          ></input>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 8,
            marginBottom: 16,
          }}
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            style={{ border: "2px solid #e0e0e0" }}
          ></input>
          <input
            type="text"
            name="phNo"
            value={data.phNo}
            placeholder="Phone Number"
            onChange={handleChange}
            style={{ border: "2px solid #e0e0e0" }}
          ></input>
          <input
            type="text"
            name="address"
            value={data.address}
            placeholder="Address"
            onChange={handleChange}
            style={{ border: "2px solid #e0e0e0" }}
          ></input>
        </div>

        <h4 style={{ margin: "16px 0 8px 0" }}>Skills</h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginBottom: 16,
          }}
        >
          <input
            type="text"
            name="skill1"
            value={data.skill1}
            placeholder="Skill 1"
            onChange={handleChange}
            style={{ border: "2px solid #e0e0e0" }}
          ></input>
          <input
            type="text"
            name="skill2"
            value={data.skill2}
            placeholder="Skill 2"
            onChange={handleChange}
            style={{ border: "2px solid #e0e0e0" }}
          ></input>
          <input
            type="text"
            name="skill3"
            value={data.skill3}
            placeholder="SKill 3"
            onChange={handleChange}
            style={{ border: "2px solid #e0e0e0" }}
          ></input>
          <input
            type="text"
            name="skill4"
            value={data.skill4}
            placeholder="Skill 4"
            onChange={handleChange}
            style={{ border: "2px solid #e0e0e0" }}
          ></input>
        </div>

        <h4 style={{ margin: "16px 0 8px 0" }}>Card Customization</h4>
        
        {/* Background Type */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}>Background Type:</label>
          <select
            name="backgroundType"
            onChange={handleCustomize}
            value={customize.backgroundType}
            style={{ width: "100%", padding: 8, borderRadius: 8, border: "2px solid #e0e0e0" }}
          >
            <option value="gradient">Gradient</option>
            <option value="solid">Solid Color</option>
            <option value="pattern">Pattern</option>
          </select>
        </div>

        {/* Background Colors */}
        {customize.backgroundType === "gradient" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Gradient Color 1:</label>
          <input
            type="color"
            onChange={handleCustomize}
            value={customize.gradient1}
            name="gradient1"
                style={{ width: "100%", height: 40, borderRadius: 8, border: "2px solid #e0e0e0" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Gradient Color 2:</label>
          <input
            type="color"
            onChange={handleCustomize}
            value={customize.gradient2}
            name="gradient2"
                style={{ width: "100%", height: 40, borderRadius: 8, border: "2px solid #e0e0e0" }}
              />
            </div>
          </div>
        )}

        {customize.backgroundType === "solid" && (
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", marginBottom: 4 }}>Solid Color:</label>
            <input
              type="color"
              onChange={handleCustomize}
              value={customize.solidColor}
              name="solidColor"
              style={{ width: "100%", height: 40, borderRadius: 8, border: "2px solid #e0e0e0" }}
            />
          </div>
        )}

        {customize.backgroundType === "pattern" && (
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", marginBottom: 8 }}>Pattern Type:</label>
            <select
              name="patternType"
              onChange={handleCustomize}
              value={customize.patternType}
              style={{ width: "100%", padding: 8, borderRadius: 8, border: "2px solid #e0e0e0" }}
            >
              <option value="dots">Dots</option>
              <option value="lines">Lines</option>
              <option value="grid">Grid</option>
              <option value="waves">Waves</option>
            </select>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
              <div>
                <label style={{ display: "block", marginBottom: 4 }}>Pattern Color 1:</label>
                <input
                  type="color"
                  onChange={handleCustomize}
                  value={customize.gradient1}
                  name="gradient1"
                  style={{ width: "100%", height: 40, borderRadius: 8, border: "2px solid #e0e0e0" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: 4 }}>Pattern Color 2:</label>
          <input
            type="color"
                  onChange={handleCustomize}
                  value={customize.gradient2}
                  name="gradient2"
                  style={{ width: "100%", height: 40, borderRadius: 8, border: "2px solid #e0e0e0" }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Card Shape */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}>Card Shape:</label>
          <select
            name="cardShape"
            onChange={handleCustomize}
            value={customize.cardShape}
            style={{ width: "100%", padding: 8, borderRadius: 8, border: "2px solid #e0e0e0" }}
          >
            <option value="rounded">Rounded</option>
            <option value="rectangle">Rectangle</option>
            <option value="circle">Circle</option>
            <option value="custom">Custom Radius</option>
          </select>
        </div>

        {/* Border Radius (only show if rounded or custom) */}
        {(customize.cardShape === "rounded" || customize.cardShape === "custom") && (
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", marginBottom: 4 }}>
              Border Radius: {customize.radius}px
            </label>
        <input
          type="range"
          min={0}
          max={150}
          onChange={handleCustomize}
          name="radius"
          value={customize.radius}
          style={{ width: "100%" }}
            />
          </div>
        )}

        {/* Card Size */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}>Card Size:</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Width: {customize.cardWidth}px</label>
              <input
                type="range"
                min={250}
                max={500}
                onChange={handleCustomize}
                name="cardWidth"
                value={customize.cardWidth}
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Height: {customize.cardHeight}px</label>
              <input
                type="range"
                min={150}
                max={350}
                onChange={handleCustomize}
                name="cardHeight"
                value={customize.cardHeight}
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>

        {/* Border */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}>Border:</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 8 }}>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Width: {customize.borderWidth}px</label>
              <input
                type="range"
                min={0}
                max={10}
                onChange={handleCustomize}
                name="borderWidth"
                value={customize.borderWidth}
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Color:</label>
              <input
                type="color"
                onChange={handleCustomize}
                value={customize.borderColor}
                name="borderColor"
                style={{ width: "100%", height: 40, borderRadius: 8, border: "2px solid #e0e0e0" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Style:</label>
              <select
                name="borderStyle"
                onChange={handleCustomize}
                value={customize.borderStyle}
                style={{ width: "100%", padding: 8, borderRadius: 8, border: "2px solid #e0e0e0" }}
              >
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <option value="dotted">Dotted</option>
                <option value="double">Double</option>
              </select>
            </div>
          </div>
        </div>

        {/* Shadow */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 4 }}>
            Shadow Intensity: {customize.shadowIntensity}px
          </label>
          <input
            type="range"
            min={0}
            max={20}
            onChange={handleCustomize}
            name="shadowIntensity"
            value={customize.shadowIntensity}
            style={{ width: "100%" }}
          />
        </div>

        <h4 style={{ margin: "24px 0 8px 0" }}>Typography Customization</h4>

        {/* Font Families */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}>Font Family:</label>
          <select
            name="fontFamily"
            onChange={handleCustomize}
            value={customize.fontFamily}
            style={{ width: "100%", padding: 8, borderRadius: 8, border: "2px solid #e0e0e0", marginBottom: 8 }}
          >
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Georgia">Georgia</option>
            <option value="Verdana">Verdana</option>
            <option value="Courier New">Courier New</option>
            <option value="Impact">Impact</option>
            <option value="Comic Sans MS">Comic Sans MS</option>
            <option value="Trebuchet MS">Trebuchet MS</option>
            <option value="Palatino">Palatino</option>
            <option value="Garamond">Garamond</option>
            <option value="Roboto">Roboto</option>
            <option value="Open Sans">Open Sans</option>
            <option value="Lato">Lato</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Poppins">Poppins</option>
            <option value="Raleway">Raleway</option>
          </select>
        </div>

        {/* Name Typography */}
        <div style={{ marginBottom: 16, padding: 12, background: "#f5f5f5", borderRadius: 8 }}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}>Name:</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Font Size: {customize.nameFontSize}px</label>
              <input
                type="range"
                min={12}
                max={48}
                onChange={handleCustomize}
                name="nameFontSize"
                value={customize.nameFontSize}
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Color:</label>
              <input
                type="color"
                onChange={handleCustomize}
                value={customize.nameColor}
                name="nameColor"
                style={{ width: "100%", height: 40, borderRadius: 8, border: "2px solid #e0e0e0" }}
              />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Font Family:</label>
              <select
                name="nameFontFamily"
                onChange={handleCustomize}
                value={customize.nameFontFamily}
                style={{ width: "100%", padding: 6, borderRadius: 6, border: "2px solid #e0e0e0", fontSize: "0.9em" }}
              >
                <option value="inherit">Use Default</option>
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Georgia">Georgia</option>
                <option value="Verdana">Verdana</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Lato">Lato</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Poppins">Poppins</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Font Weight:</label>
              <select
                name="nameFontWeight"
                onChange={handleCustomize}
                value={customize.nameFontWeight}
                style={{ width: "100%", padding: 6, borderRadius: 6, border: "2px solid #e0e0e0", fontSize: "0.9em" }}
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
                <option value="lighter">Lighter</option>
                <option value="bolder">Bolder</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="400">400</option>
                <option value="500">500</option>
                <option value="600">600</option>
                <option value="700">700</option>
                <option value="800">800</option>
                <option value="900">900</option>
              </select>
            </div>
          </div>
        </div>

        {/* Role Typography */}
        <div style={{ marginBottom: 16, padding: 12, background: "#f5f5f5", borderRadius: 8 }}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}>Role:</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Font Size: {customize.roleFontSize}px</label>
              <input
                type="range"
                min={10}
                max={32}
                onChange={handleCustomize}
                name="roleFontSize"
                value={customize.roleFontSize}
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Color:</label>
              <input
                type="color"
                onChange={handleCustomize}
                value={customize.roleColor}
                name="roleColor"
                style={{ width: "100%", height: 40, borderRadius: 8, border: "2px solid #e0e0e0" }}
              />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Font Family:</label>
              <select
                name="roleFontFamily"
                onChange={handleCustomize}
                value={customize.roleFontFamily}
                style={{ width: "100%", padding: 6, borderRadius: 6, border: "2px solid #e0e0e0", fontSize: "0.9em" }}
              >
                <option value="inherit">Use Default</option>
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Georgia">Georgia</option>
                <option value="Verdana">Verdana</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Lato">Lato</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Poppins">Poppins</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Font Weight:</label>
              <select
                name="roleFontWeight"
                onChange={handleCustomize}
                value={customize.roleFontWeight}
                style={{ width: "100%", padding: 6, borderRadius: 6, border: "2px solid #e0e0e0", fontSize: "0.9em" }}
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
                <option value="lighter">Lighter</option>
                <option value="bolder">Bolder</option>
              </select>
            </div>
          </div>
        </div>

        {/* Details Typography */}
        <div style={{ marginBottom: 16, padding: 12, background: "#f5f5f5", borderRadius: 8 }}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}>Contact Details:</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Font Size: {customize.detailsFontSize}px</label>
              <input
                type="range"
                min={8}
                max={20}
                onChange={handleCustomize}
                name="detailsFontSize"
                value={customize.detailsFontSize}
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Color:</label>
              <input
                type="color"
                onChange={handleCustomize}
                value={customize.detailsColor}
                name="detailsColor"
                style={{ width: "100%", height: 40, borderRadius: 8, border: "2px solid #e0e0e0" }}
              />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Font Family:</label>
              <select
                name="detailsFontFamily"
                onChange={handleCustomize}
                value={customize.detailsFontFamily}
                style={{ width: "100%", padding: 6, borderRadius: 6, border: "2px solid #e0e0e0", fontSize: "0.9em" }}
              >
                <option value="inherit">Use Default</option>
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Georgia">Georgia</option>
                <option value="Verdana">Verdana</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Lato">Lato</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Poppins">Poppins</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Font Weight:</label>
              <select
                name="detailsFontWeight"
                onChange={handleCustomize}
                value={customize.detailsFontWeight}
                style={{ width: "100%", padding: 6, borderRadius: 6, border: "2px solid #e0e0e0", fontSize: "0.9em" }}
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
                <option value="lighter">Lighter</option>
                <option value="bolder">Bolder</option>
              </select>
            </div>
          </div>
        </div>

        {/* Skills Typography */}
        <div style={{ marginBottom: 16, padding: 12, background: "#f5f5f5", borderRadius: 8 }}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}>Skills:</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Font Size: {customize.skillsFontSize}px</label>
              <input
                type="range"
                min={6}
                max={16}
                onChange={handleCustomize}
                name="skillsFontSize"
                value={customize.skillsFontSize}
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Color:</label>
              <input
                type="color"
                onChange={handleCustomize}
                value={customize.skillsColor}
                name="skillsColor"
                style={{ width: "100%", height: 40, borderRadius: 8, border: "2px solid #e0e0e0" }}
              />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Font Family:</label>
              <select
                name="skillsFontFamily"
                onChange={handleCustomize}
                value={customize.skillsFontFamily}
                style={{ width: "100%", padding: 6, borderRadius: 6, border: "2px solid #e0e0e0", fontSize: "0.9em" }}
              >
                <option value="inherit">Use Default</option>
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Georgia">Georgia</option>
                <option value="Verdana">Verdana</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Lato">Lato</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Poppins">Poppins</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Font Weight:</label>
              <select
                name="skillsFontWeight"
                onChange={handleCustomize}
                value={customize.skillsFontWeight}
                style={{ width: "100%", padding: 6, borderRadius: 6, border: "2px solid #e0e0e0", fontSize: "0.9em" }}
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
                <option value="lighter">Lighter</option>
                <option value="bolder">Bolder</option>
              </select>
            </div>
          </div>
        </div>
        <button
          type="submit"
          style={{ 
            marginTop: 16, 
            padding: 12, 
            width: "100%",
            borderRadius: 10,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            fontSize: "1.1em",
            fontWeight: "bold",
            boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
            border: "none",
            cursor: "pointer"
          }}
        >
          Save Card
        </button>
      </form>

      {/* Card Preview */}
      <div
        style={{
          position: "relative",
          width: parseInt(customize.cardWidth) + 40,
          height: parseInt(customize.cardHeight) + 40,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {/* Main Card Preview */}
        <div
          id="container"
          style={{
            position: "relative",
            width: customize.cardWidth,
            height: customize.cardHeight,
            padding: 20,
            boxShadow: `0 ${customize.shadowIntensity}px ${Math.max(parseInt(customize.shadowIntensity) * 2, 4)}px rgba(0,0,0,${Math.min(parseInt(customize.shadowIntensity) / 20, 0.4)})`,
            borderRadius: backgroundStyle.borderRadius,
            background: backgroundStyle.background,
            border: `${customize.borderWidth}px ${customize.borderStyle} ${customize.borderColor}`,
            fontFamily: customize.fontFamily,
        }}
      >
        <div className="section1">
          <h1 style={{ 
            margin: 0, 
            fontSize: `${customize.nameFontSize}px`,
            color: customize.nameColor,
            fontFamily: customize.nameFontFamily === "inherit" ? customize.fontFamily : customize.nameFontFamily,
            fontWeight: customize.nameFontWeight,
          }}>
            {data.fullname}
          </h1>
          <p style={{ 
            margin: "5px 0 15px 0", 
            fontSize: `${customize.roleFontSize}px`,
            color: customize.roleColor,
            fontFamily: customize.roleFontFamily === "inherit" ? customize.fontFamily : customize.roleFontFamily,
            fontWeight: customize.roleFontWeight,
          }}>
            {data.role}
          </p>
        </div>
        <div className="section2">
          <div id="details" style={{ 
            fontSize: `${customize.detailsFontSize}px`, 
            lineHeight: 1.5,
            color: customize.detailsColor,
            fontFamily: customize.detailsFontFamily === "inherit" ? customize.fontFamily : customize.detailsFontFamily,
            fontWeight: customize.detailsFontWeight,
          }}>
            <span>{data.email}</span>
            <br />
            <span>{data.phNo}</span>
            <br />
            <span>{data.address}</span>
          </div>
          <div
            id="buttons"
            style={{ marginTop: 15, display: "flex", flexWrap: "wrap", gap: 5 }}
          >
            <span
              style={{
                border: `1px solid ${customize.skillsColor}`,
                padding: "2px 5px",
                borderRadius: 3,
                fontSize: `${customize.skillsFontSize}px`,
                color: customize.skillsColor,
                fontFamily: customize.skillsFontFamily === "inherit" ? customize.fontFamily : customize.skillsFontFamily,
                fontWeight: customize.skillsFontWeight,
              }}
            >
              {data.skill1}
            </span>
            <span
              style={{
                border: `1px solid ${customize.skillsColor}`,
                padding: "2px 5px",
                borderRadius: 3,
                fontSize: `${customize.skillsFontSize}px`,
                color: customize.skillsColor,
                fontFamily: customize.skillsFontFamily === "inherit" ? customize.fontFamily : customize.skillsFontFamily,
                fontWeight: customize.skillsFontWeight,
              }}
            >
              {data.skill2}
            </span>
            <span
              style={{
                border: `1px solid ${customize.skillsColor}`,
                padding: "2px 5px",
                borderRadius: 3,
                fontSize: `${customize.skillsFontSize}px`,
                color: customize.skillsColor,
                fontFamily: customize.skillsFontFamily === "inherit" ? customize.fontFamily : customize.skillsFontFamily,
                fontWeight: customize.skillsFontWeight,
              }}
            >
              {data.skill3}
            </span>
            <span
              style={{
                border: `1px solid ${customize.skillsColor}`,
                padding: "2px 5px",
                borderRadius: 3,
                fontSize: `${customize.skillsFontSize}px`,
                color: customize.skillsColor,
                fontFamily: customize.skillsFontFamily === "inherit" ? customize.fontFamily : customize.skillsFontFamily,
                fontWeight: customize.skillsFontWeight,
              }}
            >
              {data.skill4}
            </span>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Card;
