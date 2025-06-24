import React, { useContext, useState, useEffect } from 'react';
import Gallery from './Gallery';
import Roadmap from './Roadmap'; 
import { Context } from '../Context';

export default function Planner() {
  const { 
    data, 
    roadmap, 
    setRoadmap, 
    getTodaysTasks, 
    getCompletionStats,
    markTaskCompleted,
    markTaskIncomplete 
  } = useContext(Context);

  // State for iframe reference and communication
  const [iframeRef, setIframeRef] = useState(null);
  const [lastSyncTime, setLastSyncTime] = useState(null);

  // Your existing states
  const [age, setAge] = useState("")
  const [sex, setSex] = useState("")
  const [country, setCountry] = useState("Deutschland")
  const [promptInfo, setPromptInfo] = useState("testprompt")

  // PostMessage communication handler
  useEffect(() => {
    const handleMessage = (event) => {
      // Security: Check origin (adjust this to match your iframe's actual domain)
      const allowedOrigins = [
        'https://react-chatbot-air-prompt-2.pages.dev',
        'http://localhost:3000', // for development
        'http://127.0.0.1:3000'  // for development
      ];
      
      if (!allowedOrigins.includes(event.origin)) {
        console.warn('Message from unauthorized origin:', event.origin);
        return;
      }
      
      const { type, data: messageData } = event.data;
      
      console.log('Received message:', { type, data: messageData });
      
      switch (type) {
        case 'REQUEST_ROADMAP_DATA':
          // Send current roadmap data to iframe
          if (iframeRef && iframeRef.contentWindow) {
            const responseData = {
              type: 'ROADMAP_DATA',
              data: {
                roadmap: roadmap,
                todaysTasks: getTodaysTasks(),
                stats: getCompletionStats(),
                timestamp: new Date().toISOString()
              }
            };
            
            console.log('Sending roadmap data to iframe:', responseData);
            iframeRef.contentWindow.postMessage(responseData, event.origin);
            setLastSyncTime(new Date().toLocaleTimeString());
          }
          break;
          
        case 'UPDATE_TASK':
          // Update task from iframe
          console.log('Updating task:', messageData);
          if (messageData.taskId && messageData.updates) {
            if (messageData.updates.completed !== undefined) {
              // Use existing context functions for consistency
              if (messageData.updates.completed) {
                markTaskCompleted(messageData.taskId);
              } else {
                markTaskIncomplete(messageData.taskId);
              }
            } else {
              // General task update
              setRoadmap(prev => prev.map(task => 
                task.id === messageData.taskId 
                  ? { ...task, ...messageData.updates }
                  : task
              ));
            }
          }
          break;
          
        case 'ADD_TASK':
          // Add new task from iframe
          console.log('Adding task:', messageData);
          if (messageData.task) {
            const newTask = {
              ...messageData.task,
              id: Date.now().toString(),
              completed: false,
              completedAt: null
            };
            setRoadmap(prev => [...prev, newTask]);
          }
          break;
          
        case 'EXPORT_DAILY_JSON':
          // Export requested from iframe
          console.log('Export requested from iframe');
          exportDailyJSON();
          break;
          
        case 'IFRAME_READY':
          // Iframe is loaded and ready to receive data
          console.log('Iframe is ready, sending initial data');
          sendDataToIframe();
          break;
          
        default:
          console.log('Unknown message type:', type);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [iframeRef, roadmap, setRoadmap, getTodaysTasks, getCompletionStats, markTaskCompleted, markTaskIncomplete]);

  // Function to send data to iframe
  const sendDataToIframe = () => {
    if (iframeRef && iframeRef.contentWindow) {
      const dataToSend = {
        type: 'SYNC_DATA',
        data: {
          roadmap: roadmap,
          todaysTasks: getTodaysTasks(),
          stats: getCompletionStats(),
          timestamp: new Date().toISOString()
        }
      };
      
      console.log('Sending data to iframe:', dataToSend);
      iframeRef.contentWindow.postMessage(dataToSend, '*');
      setLastSyncTime(new Date().toLocaleTimeString());
    }
  };

  // Export daily JSON function
  const exportDailyJSON = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayTasks = getTodaysTasks();
    const stats = getCompletionStats();
    
    const dailyData = {
      date: today,
      dayOfWeek: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
      tasks: todayTasks,
      stats: stats,
      exportedAt: new Date().toISOString(),
      totalTasks: roadmap.length
    };
    
    // Create and download JSON file
    const blob = new Blob([JSON.stringify(dailyData, null, 2)], 
      { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `daily-tasks-${today}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log('Daily JSON exported:', dailyData);
    
    // Notify iframe that export is complete
    if (iframeRef && iframeRef.contentWindow) {
      iframeRef.contentWindow.postMessage({
        type: 'EXPORT_COMPLETE',
        data: { filename: `daily-tasks-${today}.json`, success: true }
      }, '*');
    }
  };

  // Your existing handleSubmit function
  const handleSubmit = (event) => {
    event.preventDefault();
    const testUrl = `https://react-chatbot-air-prompt.pages.dev/?promptInfo=${promptInfo}`;
    console.log(testUrl);
  }

  // Manual sync button handler
  const handleManualSync = () => {
    sendDataToIframe();
  };

  return (
    <div>
      <h1>Try the Planner</h1>
      
      {/* Control Panel */}
      <div style={{ 
        background: '#f8f9fa', 
        padding: '15px', 
        marginBottom: '20px', 
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h3>📊 Data Control Panel</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={exportDailyJSON}
            style={{
              background: '#28a745',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            📥 Export Today's Tasks as JSON
          </button>
          
          <button 
            onClick={handleManualSync}
            style={{
              background: '#007bff',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            🔄 Sync Data to Calendar
          </button>
        </div>
        
        {lastSyncTime && (
          <p style={{ margin: '10px 0 0 0', fontSize: '14px', color: '#6c757d' }}>
            Last sync: {lastSyncTime}
          </p>
        )}
        
        <div style={{ marginTop: '10px', fontSize: '14px' }}>
          <strong>Quick Stats:</strong> {roadmap.length} total tasks, {getTodaysTasks().length} today, {getCompletionStats().completedToday} completed
        </div>
      </div>

      <br /><br />
  
      <h2>Business Idea Input Stand</h2>

      <iframe
        ref={setIframeRef}
        src="https://react-chatbot-air-prompt-2.pages.dev/"
        title="External Content"
        width="100%"
        height="400"
        style={{ border: '1px solid #ccc' }}
        onLoad={() => {
          console.log('Iframe loaded');
          // Give iframe a moment to initialize, then send data
          setTimeout(() => {
            sendDataToIframe();
          }, 1000);
        }}
      />

      <h2>Zusätzliche Tools / Optional</h2>

      <b>Design Thinking Workflow</b>

      <img
        className="content-image"
        src="/targetx-interactive-2/designthinking.jpg"
        title="Design Thinking"
        alt="Design Thinking"
        style={{width:"300px"}}
      />
      <br />

      <b>Image Generation</b>
      <br />
      <iframe
        src="https://react-image-creator-2.pages.dev/"
        title="External Content"
        width="100%"
        height="400"
        style={{ border: '1px solid #ccc' }}
      />
    </div>
  );
}