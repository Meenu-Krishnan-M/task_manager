import { useEffect, useState } from 'react';
import { Button, Modal, Badge, Form, ButtonGroup } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import {getAllTasks,addTask,updateTask,deleteTask,toggleTaskStatus} from '../services/allApi';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState('all');

  const fetchTasks = async () => {
    try {
      const data = await getAllTasks();
      setTasks(Array.isArray(data?.data) ? data.data : []);
    } catch {
      toast.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await deleteTask(id);
      if (result?.status == 200 || result?.data?._id == id) {
        toast.info("Task deleted successfully");
        fetchTasks();
      } else {
        toast.error("Failed to delete");
      }
    } catch (err) {
      toast.error("Error while deleting");
      console.error(err);
    }
  };

  const handleAddTask = async () => {
    if (!title.trim()) 
      return toast.warning("Task title required");
    try {
      if (editMode) {
        await updateTask(editId, { title });
        toast.success("Task updated successfully");
      } else {
        await addTask({ title });
        toast.success("Task added successfully");
      }
      setTitle('');
      setEditMode(false);
      setEditId(null);
      setShow(false);
      await fetchTasks();
    } catch (error) {
      toast.error("Error saving task");
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      await toggleTaskStatus(id, completed);
      fetchTasks();
    } catch {
      toast.error("Failed to update status");
    }
  };
  const openEditModal = (task) => {
    setTitle(task.title);
    setEditMode(true);
    setEditId(task._id);
    setShow(true);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter == 'completed') return task.completed;
    if (filter == 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="container mt-5">
      {/* style={{background: 'linear-gradient(to right, #992a09ff, #9997caff)',WebkitBackgroundClip: 'text',WebkitTextFillColor:'transparent',fontWeight: 'bold'}} */}
      <h3 className="text-center mb-4" >📠<span className='ms-2' style={{background: 'linear-gradient(to right, #992a09ff, #6f6da3ff)',WebkitBackgroundClip: 'text',WebkitTextFillColor:'transparent',fontWeight: 'bold'}}>Task Manager</span></h3>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button style={{background: 'linear-gradient(to right, #25af76ff, #9997caff)'}} onClick={() => { setShow(true); setEditMode(false); setTitle(''); }}>
          Add Task
        </Button>
        <div>
          <Badge style={{background: 'linear-gradient(to right, #5286b8ff, #9997caff)'}} className="me-4 p-2">Total: {tasks.length}</Badge>
          <Badge style={{background: 'linear-gradient(to right, #25af76ff, #9997caff)'}} className="me-4 p-2">Completed: {tasks.filter(t => t.completed).length}</Badge>
        </div>
      </div>

      <div className="d-flex justify-content-center mb-4">
        <ButtonGroup>
          <Button variant={filter == 'all' ? 'secondary' : 'outline-secondary'} onClick={() => setFilter('all')}>All</Button>
          <Button variant={filter == 'completed' ? 'success' : 'outline-success'} onClick={() => setFilter('completed')}>Completed</Button>
          <Button variant={filter =='pending' ? 'warning' : 'outline-secondary'} onClick={() => setFilter('pending')}>Pending</Button>
        </ButtonGroup>
      </div>
    {/* --------text-decoration-line-through//while completed----- */}
      <div className="row g-3">
        {filteredTasks.length > 0 ? filteredTasks.map((task, index) => (
          <div key={task._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className={`border rounded p-3 shadow-sm h-100 ${task.completed ? 'bg-light text-muted' : 'bg-white'}`}>
              <div className="d-flex flex-column justify-content-between h-100">
                <div className={`custom-checkbox ${task.completed ? 'checkbox-success' : ''}`}>
                  <h5 className={task.completed ? 'text-decoration-line-through' : ''}>
                    {index + 1}. {task.title}
                  </h5>
                  {/* toggle checkbox !!! */}
                  <Form.Check type="checkbox" label={task.completed ? 'Completed' : 'Incomplete'} checked={task.completed}
                    onChange={() => handleToggleComplete(task._id, !task.completed)} />
                </div>
                <div className="mt-3 d-flex justify-content-end">
                  <Button variant="info" size="sm" className="me-2" onClick={() => openEditModal(task)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(task._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center text-muted w-100 mt-3">..No tasks to show..</div>
        )}
      </div>

     {/* add or update  */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          {/* title-modal */}
          <Modal.Title style={{background: 'linear-gradient(to right, #25af76ff, #9997caff)',WebkitBackgroundClip: 'text',WebkitTextFillColor:'transparent',fontWeight: 'bold'}} >{editMode ? 'Edit Task' : 'Add Task'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input className="form-control" placeholder="Enter task title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddTask}>{editMode ? 'Update' : 'Add'}</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-center" autoClose={1500} theme="colored" />
    </div>
  );
};

export default TaskManager;
