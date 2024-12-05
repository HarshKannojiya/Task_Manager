import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await axios.get(`https://task-manager-backend-fzq7.onrender.com/api/tasks/${id}`);
        setTask(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://task-manager-backend-fzq7.onrender.com/api/tasks/${id}`);
      navigate('/dashboard'); 
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-task/${id}`);
  };

  if (!task) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">{task.title}</h2>
      <p><strong>Description: </strong>{task.description}</p>
      <p><strong>Due Date: </strong>{new Date(task.dueDate).toLocaleDateString()}</p>
      <p><strong>Status: </strong>{task.status}</p>
      <button className="btn btn-warning" onClick={handleEdit}>Edit</button>
      <button className="btn btn-danger ms-2" onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TaskDetails;