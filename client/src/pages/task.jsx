import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTasks } from "../api/task";

function AddTask() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    status: "To do",
    time: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convertir le format datetime-local en ISO 8601 si nécessaire
      const payload = {
        ...formData,
        date: new Date(formData.date).toISOString(), // Conversion en ISO 8601
      };
      await createTasks(payload); // Envoyer les données avec le champ `date`
      alert("Task added successfully !");
      navigate("/list");
      setFormData({
        name: "",
        description: "",
        date: "",
        status: "To do",
        time: "",
      });
    } catch (error) {
      console.error("Error while creating the task :", error);
    }
  };

  return (
    <div className="add-task">
      <h2>Add a Task</h2>
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
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddTask;
