// todolistUtils.js

export const fetchTodos = async (token) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}api/v1/todo`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responsedata = await response.json();

    if (!response.ok) throw new Error("Failed to fetch to-do list.");
    return responsedata.data.todos || [];
  } catch (error) {
    throw new Error("Failed to fetch to-do list.");
  }
};

export const addTodo = async (newTodo, token) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}api/v1/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Authorization with Bearer token
      },
      body: JSON.stringify({ title: newTodo }), // Assuming title is the only field
    });

    const data = await response.json();

    if (response.ok) {
      return data.data.todo; // Accessing the correct field from the backend response
    } else {
      throw new Error(data.message || "Failed to add to-do.");
    }
  } catch (error) {
    throw new Error("An error occurred while adding the to-do.");
  }
};

export const updateTodo = async (id, updatedFields, token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}api/v1/todo/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFields),
      }
    );

    const data = await response.json();

    if (response.ok) {
      // Return the updated todo item
      return data.data.todo; // Accessing the updated todo item from the response
    } else {
      throw new Error(data.message || "Failed to update to-do.");
    }
  } catch (error) {
    throw new Error("An error occurred while updating the to-do.");
  }
};

export const deleteTodo = async (id, token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}api/v1/todo/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Include Bearer token for authentication
        },
      }
    );

    if (response.ok) {
      // Return true if the todo was successfully deleted
      return true;
    } else {
      const data = await response.json();
      throw new Error(data.message || "Failed to delete to-do.");
    }
  } catch (error) {
    throw new Error("An error occurred while deleting the to-do.");
  }
};
