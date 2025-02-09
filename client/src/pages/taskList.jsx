import React, { useEffect, useState } from "react";
import { getTasks, deleteTasks } from "../api/task";
import { useNavigate } from "react-router-dom";
import "../assets/calendar.css";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des tâches :", error);
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTasks(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleAddTask = (day, hour) => {
    navigate(`/add?day=${day}&hour=${hour}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const days = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="task-calendar">
      <h2>Calendrier des tâches</h2>

      <div className="calendar">
        {/* Colonne des heures */}
        <div className="calendar-hour-labels">
          {hours.map((hour) => (
            <div key={hour} className="hour-label">
              {hour}:00
            </div>
          ))}
        </div>

        {/* Colonnes des jours */}
        {days.map((day, dayIndex) => (
          <div key={dayIndex} className="calendar-day">
            <h3 className="day-label">{day}</h3>
            {hours.map((hour) => {
              const task = tasks.find(
                (t) =>
                  new Date(t.date).getDay() === dayIndex + 1 &&
                  new Date(t.date).getHours() === hour
              );

              return (
                <div key={hour} className="calendar-hour">
                  <div className="hour-content">
                    {task ? (
                      <div
                        className="task-item"
                        style={{
                          padding: "10px",
                          margin: "5px 0",
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          textAlign: "left",
                        }}
                      >
                        <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                          {task.name}
                        </span>
                        <div
                          className="action-buttons"
                          style={{ marginTop: "5px" }}
                        >
                          <button
                            onClick={() => handleEdit(task.id)}
                            style={{
                              marginRight: "10px",
                              padding: "5px 10px",
                              fontSize: "14px",
                            }}
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => handleDelete(task.id)}
                            style={{ padding: "5px 10px", fontSize: "14px" }}
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="add-button"
                        onClick={() => handleAddTask(dayIndex + 1, hour)}
                      >
                        + Ajouter une tâche
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
