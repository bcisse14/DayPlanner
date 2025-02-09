import { BrowserRouter, Routes, Route } from "react-router-dom";

import AddTask from "../pages/task";
import TaskList from "../pages/taskList";
import EditTask from "../pages/editTask";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddTask />} />
        <Route path="/list" element={<TaskList />} />
        <Route path="/edit/:id" element={<EditTask />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
