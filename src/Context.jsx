import React, { useEffect, useState } from 'react';

const Context = React.createContext();

function ContextProvider({ children }) {
  const [data, setData] = useState([]);
  
  // Enhanced roadmap with completion tracking - keeping your existing structure
  const [roadmap, setRoadmap] = useState([
    {
      id: '1', // Added unique ID for task tracking
      date: '2025-06-24',
      task: 'Write value proposition: What transformation does the reader get?',
      dailyStartTime: '10:00',
      dailyHours: 6,
      motivation: 'Exchange of drinks',
      completed: false, // Added completion status
      completedAt: null // Added completion timestamp
    }
  ]);

  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("lang");
    if (!saved) {
      localStorage.setItem("lang", "de");
      return "de";
    }
    return saved;
  });

  // New state for task notes (separate from existing data)
  const [taskNotes, setTaskNotes] = useState({});

  // Function to change language (can be used in a button etc.)
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  // NEW: Function to mark task as completed
  const markTaskCompleted = (taskId) => {
    setRoadmap(prevRoadmap =>
      prevRoadmap.map(task =>
        task.id === taskId
          ? { ...task, completed: true, completedAt: new Date().toISOString() }
          : task
      )
    );
  };

  // NEW: Function to mark task as incomplete
  const markTaskIncomplete = (taskId) => {
    setRoadmap(prevRoadmap =>
      prevRoadmap.map(task =>
        task.id === taskId
          ? { ...task, completed: false, completedAt: null }
          : task
      )
    );
  };

  // NEW: Function to get today's tasks
  const getTodaysTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    return roadmap.filter(task => task.date === today);
  };

  // NEW: Function to add a new task to roadmap
  const addTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: Date.now().toString(), // Simple ID generation
      completed: false,
      completedAt: null
    };
    setRoadmap(prev => [...prev, taskWithId]);
  };

  // NEW: Function to update task notes
  const updateTaskNotes = (taskId, notes) => {
    setTaskNotes(prev => ({
      ...prev,
      [taskId]: notes
    }));
  };

  // NEW: Function to get task notes
  const getTaskNotes = (taskId) => {
    return taskNotes[taskId] || '';
  };

  // NEW: Function to get completion statistics
  const getCompletionStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayTasks = roadmap.filter(task => task.date === today);
    const completedToday = todayTasks.filter(task => task.completed).length;
    
    return {
      totalTasks: roadmap.length,
      todayTasks: todayTasks.length,
      completedToday,
      remainingToday: todayTasks.length - completedToday,
      todayProgress: todayTasks.length > 0 ? (completedToday / todayTasks.length) * 100 : 0
    };
  };

  // daten aus dem json objekt holen (keeping your existing data fetching)
  useEffect(() => {
    const getData = async () => {
      const url = `/targetx-interactive-2/data-${language}.json`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.status);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    getData();
  }, [language]);

  // NEW: Load task completion state from localStorage
  useEffect(() => {
    const savedRoadmap = localStorage.getItem('roadmapState');
    const savedNotes = localStorage.getItem('taskNotes');
    
    if (savedRoadmap) {
      try {
        const parsedRoadmap = JSON.parse(savedRoadmap);
        // Merge with existing roadmap structure to keep your existing data
        setRoadmap(prevRoadmap => {
          return prevRoadmap.map(task => {
            const savedTask = parsedRoadmap.find(saved => saved.date === task.date && saved.task === task.task);
            return savedTask ? { ...task, ...savedTask } : { ...task, id: task.id || Date.now().toString() };
          });
        });
      } catch (error) {
        console.error("Failed to load roadmap state:", error);
      }
    }

    if (savedNotes) {
      try {
        setTaskNotes(JSON.parse(savedNotes));
      } catch (error) {
        console.error("Failed to load task notes:", error);
      }
    }
  }, []);

  // NEW: Save task completion state to localStorage
  useEffect(() => {
    if (roadmap.length > 0) {
      localStorage.setItem('roadmapState', JSON.stringify(roadmap));
    }
  }, [roadmap]);

  // NEW: Save task notes to localStorage
  useEffect(() => {
    localStorage.setItem('taskNotes', JSON.stringify(taskNotes));
  }, [taskNotes]);

  return (
    <Context.Provider value={{ 
      // Your existing values
      data, 
      language, 
      roadmap, 
      changeLanguage,
      // New task management functions
      markTaskCompleted,
      markTaskIncomplete,
      getTodaysTasks,
      addTask,
      updateTaskNotes,
      getTaskNotes,
      getCompletionStats
    }}>
      {children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };