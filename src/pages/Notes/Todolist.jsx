// import Styles from ".././pages.module.css";
import Styles from "./Todo.module.css"
import { useEffect, useState } from "react";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "./todolistUtils";
import delbtn from "../../assets/trash.png";
import savebtn from "../../assets/text-file.png";
import editbtn from "../../assets/edit.png";
import cancelbtn from "../../assets/close.png";
import {  motion } from "framer-motion";

function Todolist({ btn }) {
  const [todolist, setTodolist] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodoId, setEditTodoId] = useState(null); // ID of the to-do item being edited
  const [editTitle, setEditTitle] = useState("");
  const [error, setError] = useState(null);
  const [userToken, setUserToken] = useState(null); 


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserToken(token); 
    }
  }, []); 

  

  useEffect(() => {
    async function fetchData() {
      try {
        if (userToken) {
          // Fetch todos based on the current user's token
          const todos = await fetchTodos(userToken); // Pass the token here
          setTodolist(todos); // Update the state with the fetched todos
        }
      } catch (error) {
        setError(error.message);
      }
    }

    fetchData();
  }, [userToken]); // Tr

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const newTodoItem = await addTodo(newTodo,userToken);
      setTodolist([...todolist, newTodoItem]);
      setNewTodo("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    try {
      // Await updated todo from backend
      const updatedTodo = await updateTodo(editTodoId, { title: editTitle },userToken);
  
      // Update the state with the new todo returned from the backend
      const updatedTodos = todolist.map((todo) =>
        todo._id === editTodoId ? updatedTodo : todo
      );
  
      // Set the new state
      setTodolist(updatedTodos);
      setEditTodoId(null);
      setEditTitle("");
    } catch (error) {
      setError(error.message);
    }
  };
  
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id, userToken);
      const updatedTodos = todolist.filter((todo) => todo._id !== id);
      setTodolist(updatedTodos);
    } catch (error) {
      setError(error.message);
    }
  };
  
  const handleEditChange = (id, title) => {
    setEditTodoId(id);
    setEditTitle(title);
  };



  return (
    <motion.div
     className={Styles.todobox}
     initial={{opacity:0, y:500}}
     whileInView={{opacity:1, y:0, transition:{duration :0.4}}}

     
     >
      <div className={Styles.topbar}>
        <form onSubmit={handleAddTodo} className={Styles.addform}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new note"
            className={Styles.addinput}
            required
          />
          <button type="submit">+</button>
        </form>
        <button onClick={() => btn()} className={Styles.closebtn}>
          <img src={cancelbtn} alt="" />
        </button>
      </div>

      <div className={Styles.wrapper}>
        {todolist&& todolist.map((todo,) => (
          <motion.div 
           initial={{y:100, opacity :0}}
           whileInView={{y:0, opacity :1, transition:{duration :0.3}}}
            key={todo._id} className={Styles.title}>
            {editTodoId === todo._id ? (
              <form onSubmit={handleUpdate} className={Styles.updateform}>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className={Styles.updatetitle}
                  required
                />
                <div className={Styles.btnboxhandel}>
                  <motion.button
                    type="submit"
                    initial={{ scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <img src={savebtn} alt="" />
                  </motion.button>
                  <motion.button
                    type="submit"
                    initial={{ scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEditChange(todo._id, todo.title)}
                  >
                    <img src={editbtn} alt="" />
                  </motion.button>
                  <motion.button
                    type="submit"
                    initial={{ scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteTodo(todo._id)}
                  >
                    <img src={delbtn} alt="" />
                  </motion.button>
                </div>
              </form>
            ) : (
              <>
                <div className={Styles.totdotitle}>
                  <p>{todo.title}</p>
                </div>
                <div className={Styles.btnboxhandel}>
                  <motion.button
                    type="submit"
                    initial={{ scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <img src={savebtn} alt="" />
                  </motion.button>
                  <motion.button
                    type="submit"
                    initial={{ scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEditChange(todo._id, todo.title)}
                  >
                    <img src={editbtn} alt="" />
                  </motion.button>
                  <motion.button
                    type="submit"
                    initial={{ scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                    f
                    onClick={() => handleDeleteTodo(todo._id)}
                  >
                    <img src={delbtn} alt="" />
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>

      {error && <p>Error: {error}</p>}
    </motion.div>
  );
}

export default Todolist;
