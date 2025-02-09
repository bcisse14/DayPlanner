import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTasksById, updateTasks } from "../api/task";
import "../assets/index.css";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    status: "To do",
    time: "",
  });
  const [loading, setLoading] = useState(false);

  // Function to format date to yyyy-MM-dd
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Extract yyyy-MM-dd
  };

  // Function to format time to HH:mm
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    const hours = String(date.getUTCHours()).padStart(2, "0"); // Use getUTCHours for consistency with Zulu time
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getTasksById(id);
        if (!tasks) {
          alert("Task introuvable !");
          navigate("/list");
          return;
        }
        setFormData({
          name: tasks.name || "",
          description: tasks.description || "",
          date: tasks.date ? formatDate(tasks.date) : "", // Format date as yyyy-MM-dd
          status: tasks.status || "To do",
          time: tasks.time ? formatTime(tasks.time) : "", // Format time as HH:mm
        });
      } catch (error) {
        console.error("Erreur lors de la récupération de la task :", error);
        alert("Erreur de connexion au serveur. Veuillez réessayer.");
      }
    };
    fetchTasks();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formattedData = {
        ...formData,
        date: formatDate(formData.date), // Format date as yyyy-MM-dd
        time: formData.time, // Already formatted as HH:mm
      };
      await updateTasks(id, formattedData);
      alert("Task modifiée avec succès !");
      navigate("/list");
    } catch (error) {
      console.error("Erreur lors de la modification de la task :", error);
      alert(
        "Impossible de modifier la task. Veuillez vérifier les données ou réessayer plus tard."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-task">
      <h2>Edit a Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name :</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description :</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Status :</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="To do">To do</option>
            <option value="On going">On going</option>
            <option value="Done">Done</option>
            <option value="postponed">postponed</option>
          </select>
        </div>
        <div>
          <label>Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Save"}
        </button>
      </form>
    </div>
  );
}

export default EditTask;
