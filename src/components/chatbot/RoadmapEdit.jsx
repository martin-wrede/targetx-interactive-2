// --- START OF FILE RoadmapEdit.jsx ---

import React, { useState, useContext, useEffect } from 'react';
 // import './Roadmap.css';
import './RoadmapEdit.css'; // Your dedicated CSS for edit components
import { Context } from '../../Context';

// Helper functions (Unchanged)
const formatDate = (dateStr, language = 'de') => {
  const date = new Date(dateStr);
  const daysDE = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  const daysEN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthsDE = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
  const monthsEN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = language === 'de' ? daysDE : daysEN;
  const months = language === 'de' ? monthsDE : monthsEN;
  return {
    dayName: days[date.getDay()],
    day: date.getDate(),
    month: months[date.getMonth()],
    year: date.getFullYear(),
    fullDate: date.toLocaleDateString()
  };
};

const calculateEndTime = (startTime, hours) => {
  if (!startTime) return 'N/A';
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const totalMinutes = startHour * 60 + startMinute + (hours * 60);
  const endHour = Math.floor(totalMinutes / 60);
  const endMinute = totalMinutes % 60;
  return `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
};

const formatDateForInput = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toISOString().split('T')[0];
};

const generateICS = (roadmapData, labels) => {
  const icsHeader = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//AI Coach//Roadmap//EN\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH`;
  const icsFooter = `END:VCALENDAR`;
  const events = roadmapData.map(item => {
    if (!item.date) return ''; // Skip tasks without a date
    const date = new Date(item.date);
    const [startHour, startMinute] = (item.dailyStartTime || '10:00').split(':').map(Number);
    const duration = item.dailyHours || 1;
    const startDate = new Date(date);
    startDate.setHours(startHour, startMinute, 0, 0);
    const endDate = new Date(startDate);
    endDate.setTime(startDate.getTime() + (duration * 60 * 60 * 1000));
    const startDateStr = startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endDateStr = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const isCompleted = item.completed;
    const summary = `${labels?.calendarEventPrefix || 'AI Coach'}: ${isCompleted ? '✅ ' : ''}${item.task}`;
    const description = `${labels?.taskLabel || 'Task'}: ${isCompleted ? '[Completed] ' : ''}${item.task}\\n\\n${labels?.startTimeLabel || 'START TIME'}: ${item.dailyStartTime || '10:00'}\\n${labels?.durationLabel || 'DURATION'}: ${item.dailyHours || 1} ${labels?.hoursLabel || 'hours'}\\n\\n${labels?.motivationLabel || 'Motivation'}: ${item.motivation}`;
    return `BEGIN:VEVENT\nUID:${item.id}@aicoach.com\nDTSTART:${startDateStr}\nDTEND:${endDateStr}\nSUMMARY:${summary}\nDESCRIPTION:${description}\nCATEGORIES:AI Coach,Personal Development\nSTATUS:CONFIRMED\nTRANSP:OPAQUE\nEND:VEVENT\n`;
  }).join('');
  return `${icsHeader}\n${events}${icsFooter}`;
};

const generateGoogleCalendarUrl = (task, data) => {
  const labels = data.roadmapLabels;
  const date = new Date(task.date);
  const [startHour, startMinute] = (task.dailyStartTime || '10:00').split(':').map(Number);
  const duration = task.dailyHours || 1;
  const startDate = new Date(date);
  startDate.setHours(startHour, startMinute, 0, 0);
  const endDate = new Date(startDate);
  endDate.setTime(startDate.getTime() + (duration * 60 * 60 * 1000));
  const startDateStr = startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const endDateStr = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  
  const isCompleted = !!task.completed; 
  const prefix = isCompleted ? '✅ ' : '';
  const label = isCompleted ? '[Completed] ' : '';

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${prefix}${labels?.calendarEventPrefix || ''}: ${task.task}`,
    dates: `${startDateStr}/${endDateStr}`,
    details: `${label}${labels?.taskLabel || 'Task'}: ${task.task}\n\n${labels?.startTimeLabel || 'START TIME'}: ${task.dailyStartTime || '10:00'}\n${labels?.durationLabel || 'DURATION'}: ${task.dailyHours || 1} ${labels?.hoursLabel || 'hours'}\n\n${labels?.motivationLabel || 'Motivation'}: ${task.motivation}`,
    location: isCompleted ? `[Completed] ${labels?.calendarLocation || 'Personal Development'}` : labels?.calendarLocation || 'Personal Development'
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

// Main Roadmap Component
export default function Roadmap({ roadmapData, onRoadmapUpdate, titleDisplay2, titleDisplay3 }) {
  const { data } = useContext(Context);
  const [editingTask, setEditingTask] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [localTasks, setLocalTasks] = useState([]);
  const [confirmationDialog, setConfirmationDialog] = useState(null);

  useEffect(() => {
    const initialTasks = (roadmapData || []).map((task, index) => ({
      ...task,
      id: task.id || `task-${new Date(task.date).getTime()}-${index}-${Math.random()}`,
      completed: !!task.completed,
      durationDays: task.durationDays || 1, // Ensure durationDays has a default
    }));
    setLocalTasks(initialTasks);
  }, [roadmapData]);
  
  const currentRoadmapData = localTasks;

  // --- UPDATED: New tasks now include durationDays ---
  const addNewTask = () => {
    const newId = `task-${Date.now()}`;
    const newTask = {
      id: newId,
      date: new Date().toISOString().split('T')[0],
      dailyStartTime: '10:00',
      dailyHours: 1,
      durationDays: 1, // Default duration in days
      task: 'New Task',
      motivation: '',
      completed: false,
    };
    const updatedTasks = [...localTasks, newTask].sort((a, b) => new Date(a.date) - new Date(b.date));
    if (onRoadmapUpdate) onRoadmapUpdate(updatedTasks);
    startEditing(newTask);
  };

  // --- UPDATED: Editing state now includes durationDays ---
  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditedData({
      date: task.date,
      dailyStartTime: task.dailyStartTime || '10:00',
      dailyHours: task.dailyHours || 1,
      durationDays: task.durationDays || 1,
      task: task.task || '',
      motivation: task.motivation || ''
    });
  };

  const toggleTaskComplete = (id) => {
    if (onRoadmapUpdate) {
      const updatedTasks = localTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      onRoadmapUpdate(updatedTasks);
    }
  };

  const cancelEditing = () => {
    setEditingTask(null);
    setEditedData({});
  };

  const saveTask = (idToSave) => {
    const updatedTasks = localTasks.map(task =>
      task.id === idToSave 
        ? { ...task, ...editedData }
        : task
    ).sort((a, b) => new Date(a.date) - new Date(b.date));
    if (onRoadmapUpdate) onRoadmapUpdate(updatedTasks);
    setEditingTask(null);
    setEditedData({});
  };

  const showDeleteConfirmation = (task) => setConfirmationDialog({ task });
  const cancelDelete = () => setConfirmationDialog(null);

  const confirmDelete = () => {
    if (!confirmationDialog) return;
    const { id } = confirmationDialog.task;
    const updatedTasks = localTasks.filter(t => t.id !== id);
    if (onRoadmapUpdate) onRoadmapUpdate(updatedTasks);
    setConfirmationDialog(null);
  };

  const updateEditedData = (field, value) => setEditedData(prev => ({ ...prev, [field]: value }));

  const downloadICS = () => {
    const icsContent = generateICS(currentRoadmapData, data.roadmapLabels);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = data.roadmapLabels?.icsFileName || 'ai-coach-roadmap.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && confirmationDialog) cancelDelete();
    };
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [confirmationDialog]);
 
  const language = data.language || 'de';

  // --- NEW: Calculations for the Progress Summary Box ---
  const totalTasks = currentRoadmapData.length;
  const completedTasksCount = currentRoadmapData.filter(t => t.completed).length;

  const totalHours = currentRoadmapData.reduce((sum, item) => {
    const durationInDays = item.durationDays || 1;
    return sum + ((item.dailyHours || 0) * durationInDays);
  }, 0);

  const completedHours = currentRoadmapData.reduce((sum, item) => {
    if (item.completed) {
      const durationInDays = item.durationDays || 1;
      return sum + ((item.dailyHours || 0) * durationInDays);
    }
    return sum;
  }, 0);


  return (
    <div className="container">
      {confirmationDialog && (
        <div className="confirmation-overlay" onClick={cancelDelete}>
          <div className="confirmation-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="confirmation-title">{data.roadmapLabels?.deleteConfirmTitle || 'Delete Task?'}</div>
            <div className="confirmation-message">{data.roadmapLabels?.deleteConfirmMessage || 'Are you sure you want to delete this task? This action cannot be undone.'}</div>
            <div className="confirmation-task-preview">"{confirmationDialog.task.task}"</div>
            <div className="confirmation-buttons">
              <button onClick={confirmDelete} className="confirm-button">{data.roadmapLabels?.deleteConfirmYes || 'Yes, Delete'}</button>
              <button onClick={cancelDelete} className="cancel-confirm-button">{data.roadmapLabels?.deleteConfirmNo || 'Cancel'}</button>
            </div>
          </div>
        </div>
      )}

       <div className="header">
        <div className="headerTitle">
          <h1 style={{display:titleDisplay3 }} className="title">{data.roadmapLabels?.title || 'Roadmap'}</h1>
          <h1 style={{display: titleDisplay2}} className="title">{data.roadmapLabels?.title2 || 'Daily Task'}</h1>
        </div>
        <p className="subtitle">{data.roadmapLabels?.subtitle || 'Your personalized learning roadmap'}</p>
        <div className="header-actions">
          <button onClick={addNewTask} className="addNewButton">
            ➕ {data.roadmapLabels?.addNewTask || 'Add New Task'}
          </button>
          <button onClick={downloadICS} className="exportButton">
            📅 {data.roadmapLabels?.downloadICS || 'Download ICS'}
          </button>
        </div>
      </div>

      <div className="grid">
        {currentRoadmapData.map((item) => {
          const dateInfo = formatDate(item.date, language);
          const isCompleted = item.completed;
          const isEditing = editingTask === item.id;
          // When editing, merge the original item with changes to ensure all properties are available for calculation
          const currentData = isEditing ? { ...item, ...editedData } : item;
          const endTime = calculateEndTime(currentData.dailyStartTime, currentData.dailyHours);
          const totalTaskHours = (currentData.dailyHours || 1) * (currentData.durationDays || 1);
          
          return (
            <div key={item.id} className={`card ${isCompleted ? 'cardCompleted' : ''}`}>
              <div className="cardHeader">
                <div className="dateInfo">
                  {isEditing ? (
                    <div className="editable-date-container">
                      <input type="date" value={formatDateForInput(currentData.date)} onChange={(e) => updateEditedData('date', e.target.value)} className="date-input" />
                    </div>
                  ) : (
                    <>
                      <div className="dayName">{dateInfo.dayName}</div>
                      <div className="day">{dateInfo.day}</div>
                      <div className="monthYear">{dateInfo.month} {dateInfo.year}</div>
                    </>
                  )}
                </div>

                <button
                    onClick={() => toggleTaskComplete(item.id)}
                    className={`icon-button complete-button-edit header-center-button ${isCompleted ? 'active' : 'inactive'}`}
                    title={isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
                >
                    {isCompleted ? '✅' : '⭕'}
                </button>

                <button
                    onClick={() => showDeleteConfirmation(item)}
                    className="icon-button delete-button"
                    title="Delete"
                >
                    🗑️
                </button>
              </div>

              {/* --- RESTRUCTURED: Row 1 for Daily Time --- */}
              <div className="timeSection">
                <div className="timeInfo">
                  <div className="timeLabel">{data.roadmapLabels?.dailyStartTimeLabel || 'DAILY START TIME'}</div>
                  {isEditing ? (
                    <input type="time" value={currentData.dailyStartTime || '10:00'} onChange={(e) => updateEditedData('dailyStartTime', e.target.value)} className="time-input" />
                  ) : (
                    <div className="timeValue">{currentData.dailyStartTime || '10:00'}</div>
                  )}
                </div>
                <div className="timeInfo">
                  <div className="timeLabel">{data.roadmapLabels?.dailyEndTimeLabel || 'DAILY END TIME'}</div>
                  <div className="timeValue">{endTime}</div>
                </div>
                <div className="timeInfo">
                  <div className="timeLabel">{data.roadmapLabels?.dailyDurationLabel || 'DAILY DURATION'}</div>
                  {isEditing ? (
                    <div className="duration-input-container">
                      <input type="number" value={currentData.dailyHours || 1} onChange={(e) => updateEditedData('dailyHours', parseFloat(e.target.value) || 1)} className="number-input" min="0.5" step="0.5" />
                      <span>{data.roadmapLabels?.hoursShort || 'h'}</span>
                    </div>
                  ) : (
                    <div className="timeValue">{currentData.dailyHours || 1}{data.roadmapLabels?.hoursShort || 'h'}</div>
                  )}
                </div>
              </div>

              {/* --- RESTRUCTURED: Row 2 for Task Duration --- */}
              <div className="timeSection">
                <div className="timeInfo">
                  <div className="timeLabel">{data.roadmapLabels?.taskDurationDaysLabel || 'TASK DURATION (DAYS)'}</div>
                  {isEditing ? (
                    <div className="duration-input-container">
                      <input type="number" value={currentData.durationDays || 1} onChange={(e) => updateEditedData('durationDays', parseInt(e.target.value, 10) || 1)} className="number-input" min="1" step="1" />
                    </div>
                  ) : (
                    <div className="timeValue">{currentData.durationDays || 1} day(s)</div>
                  )}
                </div>
                <div className="timeInfo">
                  <div className="timeLabel">{data.roadmapLabels?.taskDurationLabel || 'TASK DURATION'}</div>
                  <div className="timeValue timeValue-calculated">{totalTaskHours.toFixed(1)} {data.roadmapLabels?.hoursLabel || 'Hours'}</div>
                </div>
                <div className="timeInfo placeholder"></div>
              </div>

              <div className="taskSection">
                <div className="sectionTitle">
                  {data.roadmapLabels?.taskLabel || 'TASK'}
                  {isEditing ? (
                    <div className="button-container">
                      <button onClick={() => saveTask(item.id)} className="icon-button save-button" title="Save">✓</button>
                      <button onClick={cancelEditing} className="icon-button cancel-button" title="Cancel">✕</button>
                    </div>
                  ) : (
                    <button onClick={() => startEditing(item)} className="icon-button edit-button" title="Edit">✎</button>
                  )}
                </div>
                {isEditing ? (
                  <textarea type="text" value={currentData.task || ''} onChange={(e) => updateEditedData('task', e.target.value)} className="edit-input" placeholder="Task description" autoFocus />
                ) : (
                  <div className={`taskText ${isCompleted ? 'taskCompleted' : ''}`}>{currentData.task}</div>
                )}
              </div>

              <div className="taskSection">
                <div className="sectionTitle">{data.roadmapLabels?.motivationLabel || 'MOTIVATION'}</div>
                {isEditing ? (
                  <textarea value={currentData.motivation || ''} onChange={(e) => updateEditedData('motivation', e.target.value)} className="text-area" placeholder="Motivation..." />
                ) : (
                  <div className="motivationText">{currentData.motivation}</div>
                )}
              </div>
                
              <a href={generateGoogleCalendarUrl(item, data)} target="_blank" rel="noopener noreferrer" className="googleCalendarLink">
                📅 {data.roadmapLabels?.addToGoogleCalendar || 'Add to Google Calendar'}
              </a>
            </div>
          );
        })}
      </div>
      
      {/* --- RESTORED & FIXED: Progress Summary Section --- */}
      {/* Note: You may need to add CSS for .progressContainer, .progressGrid, .progressItem etc. for styling. */}
      <div className="progressContainer">
        <h2 className="progressTitle">{data.roadmapLabels?.progressTitle || 'Progress Overview'}</h2>
        <div className="progressGrid">
          <div className="progressItem">
            <div className="progressValue">{completedTasksCount} / {totalTasks}</div>
            <div className="progressLabel">{data.roadmapLabels?.tasksCompleted || 'Tasks Completed'}</div>
          </div>
          <div className="progressItem">
            <div className="progressValue">{completedHours.toFixed(1)} / {totalHours.toFixed(1)}</div>
            <div className="progressLabel">{data.roadmapLabels?.completedHours || 'Completed Hours'}</div>
          </div>
          <div className="progressItem">
            <div className="progressValue">{totalHours.toFixed(1)}</div>
            <div className="progressLabel">{data.roadmapLabels?.totalHours || 'Total Hours'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}