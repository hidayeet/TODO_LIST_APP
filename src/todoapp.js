import { useState } from "react";
import { Box, Paper, Typography, TextField, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

function Todoapp() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const theme = {
    pageBg: darkMode ? "#1f1f1f":"#f3f3f3",
    cardBg: darkMode ? "#6b6b6b":"#ffffff",
    taskBg: darkMode ? "#4e4e4e":"#ffffff",
    text: darkMode ? "#ffffff":"#111111",
    inputBg: darkMode ? "#2a2a2a":"#ffffff",
    inputText: darkMode ? "#ffffff":"#111111",
    border: darkMode ? "#666":"#d9d9d9",
    iconcolor:"#d1a710"
  };

  function addTask() {
    if (task.trim() === "") return;
    const newTask = {
      id: Date.now(),
      text: task,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setTask("");
  }

  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  function editTask(id) {
    const current = tasks.find((t) => t.id === id);
    const newText = prompt("Edit task:", current.text);

    if (!newText) return;
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, text: newText } : t
      )
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: theme.pageBg, py: 4 }}>
      <Box sx={{ maxWidth: "1000px", mx: "auto", display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <IconButton
          onClick={() => setDarkMode(!darkMode)}
          sx={{
            bgcolor:"#ddd",
            width: 55,
            height: 55,
            "&:hover": { bgcolor: "#ddd" }
          }}
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Box>

      <Paper
        elevation={6}
        sx={{
          maxWidth: "1000px",
          mx: "auto",
          p: 4,
          borderRadius: "24px",
          bgcolor: theme.cardBg,
          border: `1px solid ${theme.border}`
        }}
      >
        <Typography variant="h3" textAlign="center" mb={4} color={theme.text}>
          TO DO LIST
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Add a new task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "18px",
                bgcolor: theme.inputBg
              },
              "& .MuiInputBase-input": {
                color: theme.inputText
              }
            }}
          />

          <Button
            variant="contained"
            onClick={addTask}
            sx={{
              bgcolor:theme.iconcolor,
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "16px",
              "&:hover": { bgcolor: "#e0b000" }
            }}
          >
            ADD
          </Button>
        </Box>

        <Typography variant="h4" textAlign="center" mb={3} color={theme.text}>
          MY TASKS
        </Typography>

        {tasks.map((t) => (
          <Paper
            key={t.id}
            sx={{
              p: 2,
              mb: 2,
              borderRadius: "18px",
              bgcolor: theme.taskBg,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: darkMode ? "none" : "0 6px 16px rgba(0,0,0,0.14)"
            }}
          >
            <Typography
              sx={{
                fontSize: "24px",
                textDecoration: t.completed ? "line-through" : "none",
                color: theme.text
              }}
            >
              {t.text}
            </Typography>

            <Box>
              <IconButton onClick={() => toggleTask(t.id)} sx={{color:theme.iconcolor}}>
                <CheckIcon />
              </IconButton>

              <IconButton onClick={() => editTask(t.id)} sx={{color:theme.iconcolor}}>
                <EditIcon />
              </IconButton>

              <IconButton onClick={() => deleteTask(t.id)} sx={{color:theme.iconcolor}}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Paper>
    </Box>
  );
}

export default Todoapp;