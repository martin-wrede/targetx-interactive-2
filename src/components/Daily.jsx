// Daily.jsx - Enhanced version
import React, { useContext, useState } from 'react';
import { Context } from '../Context';

export default function Daily() {
  const { 
    data, 
    getTodaysTasks, 
    markTaskCompleted, 
    markTaskIncomplete 
  } = useContext(Context);
  
  const [showNotes, setShowNotes] = useState({});
  const [taskNotes, setTaskNotes] = useState({});
  
  const todaysTasks = getTodaysTasks();
  const today = new Date().toLocaleDateString('de-DE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleTaskToggle = (taskId, completed) => {
    if (completed) {
      markTaskIncomplete(taskId);
    } else {
      markTaskCompleted(taskId);
    }
  };

  const toggleNotes = (taskId) => {
    setShowNotes(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const handleNotesChange = (taskId, notes) => {
    setTaskNotes(prev => ({
      ...prev,
      [taskId]: notes
    }));
  };

  return (
    <div>
      <div className="content_container" id="main">
        <div className="content_main" id="content">
          <h1>Daily Tasks & Motivation</h1>
          
          <div style={{ 
            background: '#f5f5f5', 
            padding: '15px', 
            borderRadius: '8px', 
            marginBottom: '20px' 
          }}>
            <h2>📅 {today}</h2>
          </div>

          {todaysTasks.length > 0 ? (
            <div>
              {todaysTasks.map((task) => (
                <div 
                  key={task.id} 
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '20px',
                    marginBottom: '15px',
                    backgroundColor: task.completed ? '#f0f8f0' : '#fff',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleTaskToggle(task.id, task.completed)}
                      style={{ 
                        width: '20px', 
                        height: '20px', 
                        marginTop: '5px',
                        cursor: 'pointer'
                      }}
                    />
                    
                    <div style={{ flex: 1 }}>
                      <h3 style={{ 
                        margin: '0 0 10px 0',
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? '#666' : '#333'
                      }}>
                        {task.task}
                      </h3>
                      
                      <div style={{ marginBottom: '10px' }}>
                        <p><strong>⏰ Start Time:</strong> {task.dailyStartTime}</p>
                        <p><strong>📊 Estimated Hours:</strong> {task.dailyHours}h</p>
                        <p><strong>🎯 Motivation:</strong> {task.motivation}</p>
                        {task.completed && task.completedAt && (
                          <p style={{ color: 'green' }}>
                            <strong>✅ Completed at:</strong> {new Date(task.completedAt).toLocaleString('de-DE')}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => toggleNotes(task.id)}
                        style={{
                          background: '#007bff',
                          color: 'white',
                          border: 'none',
                          padding: '8px 15px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          marginRight: '10px'
                        }}
                      >
                        {showNotes[task.id] ? 'Hide Notes' : 'Add Notes'}
                      </button>

                      {showNotes[task.id] && (
                        <div style={{ marginTop: '15px' }}>
                          <textarea
                            placeholder="Add your notes, thoughts, or progress updates..."
                            value={taskNotes[task.id] || ''}
                            onChange={(e) => handleNotesChange(task.id, e.target.value)}
                            style={{
                              width: '100%',
                              minHeight: '100px',
                              padding: '10px',
                              border: '1px solid #ddd',
                              borderRadius: '4px',
                              resize: 'vertical'
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Progress Summary */}
              <div style={{
                background: '#e3f2fd',
                padding: '15px',
                borderRadius: '8px',
                marginTop: '20px'
              }}>
                <h3>📈 Today's Progress</h3>
                <p>
                  {todaysTasks.filter(t => t.completed).length} of {todaysTasks.length} tasks completed
                </p>
                <div style={{
                  background: '#ddd',
                  height: '10px',
                  borderRadius: '5px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    background: '#4caf50',
                    height: '100%',
                    width: `${(todaysTasks.filter(t => t.completed).length / todaysTasks.length) * 100}%`,
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px',
              background: '#f9f9f9',
              borderRadius: '8px'
            }}>
              <h3>🎉 No tasks scheduled for today!</h3>
              <p>Enjoy your day or check your roadmap for upcoming tasks.</p>
            </div>
          )}

          {/* Chatbot Integration */}
          <div style={{ marginTop: '30px' }}>
            <h3>💬 Need Help with Your Tasks?</h3>
            <iframe
              src="https://react-chatbot-air-prompt-2.pages.dev/"
              title="Task Assistant"
              width="100%"
              height="400"
              style={{ border: '1px solid #ccc', borderRadius: '8px' }}
            />
          </div>
        </div>
      </div>

      <div id="sidebar" className="content_sub">
        <br />
        <img
          className="content-image"
          src="/targetx-interactive-2/motivation-daily.png"
          alt="Motivation"
          title="Motivation"
          width="200"
        />
        
        {/* Quick Stats */}
        <div style={{ 
          background: '#f5f5f5', 
          padding: '15px', 
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          <h4>Quick Stats</h4>
          <p>Tasks Today: {todaysTasks.length}</p>
          <p>Completed: {todaysTasks.filter(t => t.completed).length}</p>
          <p>Remaining: {todaysTasks.filter(t => !t.completed).length}</p>
        </div>
      </div>
    </div>
  );
}