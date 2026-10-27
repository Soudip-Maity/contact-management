
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchAppBar from "../components/searchbar";
import Contactlist from "../components/contactlist";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="cms-page">
      <SearchAppBar />

      <main className="cms-content">
        <div style={{ marginBottom: 26 }}>
          <h1 className="cms-heading">Contact Directory</h1>
          <p className="cms-subtitle">
            Manage your contacts, organize relationships, and
            keep your important information in one place.
          </p>
        </div>

        <Contactlist />
      </main>
    </div>
  );
}
