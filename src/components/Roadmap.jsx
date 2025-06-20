import React, { useState } from 'react';

// Sample data based on your example
const sampleRoadmapData = [
  {
    date: '2025-06-17',
    task: 'Write value proposition: What transformation does the reader get?',
    motivation: 'Exchange with a colleague'
  },
  {
    date: '2025-06-18',
    task: 'Research 3 competitor landing pages and note what works.',
    motivation: 'Call some friends'
  },
  {
    date: '2025-06-19',
    task: 'Brainstorm page sections: Hero, About, Book Preview, Testimonials, Buy CTA.',
    motivation: 'Watch the movie about Steve Jobs'
  },
  {
    date: '2025-06-20',
    task: 'Write draft copy for each section (keep it concise + benefit-focused).',
    motivation: 'Get an ice cream'
  }
];

// CSS styles as JavaScript object
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px',
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '16px'
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0
  },
  subtitle: {
    color: '#6b7280',
    marginBottom: '24px'
  },
  exportButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s',
    margin: '0 auto'
  },
  exportButtonHover: {
    backgroundColor: '#4338ca'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '32px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    borderLeft: '4px solid #4f46e5',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  cardCompleted: {
    backgroundColor: '#f0fdf4',
    borderLeftColor: '#10b981'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px'
  },
  dateInfo: {
    textAlign: 'center'
  },
  dayName: {
    fontSize: '12px',
    color: '#6b7280',
    fontWeight: '500'
  },
  day: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1f2937'
  },
  monthYear: {
    fontSize: '10px',
    color: '#6b7280'
  },
  completeButton: {
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    fontSize: '20px'
  },
  completeButtonActive: {
    backgroundColor: '#dcfce7',
    color: '#059669'
  },
  completeButtonInactive: {
    backgroundColor: '#f3f4f6',
    color: '#9ca3af'
  },
  taskSection: {
    marginBottom: '16px'
  },
  sectionTitle: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: '4px'
  },
  taskText: {
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#1f2937'
  },
  taskCompleted: {
    textDecoration: 'line-through',
    color: '#6b7280'
  },
  motivationText: {
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#374151'
  },
  googleCalendarLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    padding: '8px 12px',
    fontSize: '12px',
    backgroundColor: '#dbeafe',
    color: '#1d4ed8',
    textDecoration: 'none',
    borderRadius: '6px',
    transition: 'background-color 0.2s',
    marginTop: '16px',
    border: '1px solid #e5e7eb'
  },
  progressContainer: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  progressTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '16px'
  },
  progressBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  progressBarTrack: {
    flex: 1,
    height: '12px',
    backgroundColor: '#e5e7eb',
    borderRadius: '6px',
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)',
    borderRadius: '6px',
    transition: 'width 0.3s ease'
  },
  progressText: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#6b7280',
    whiteSpace: 'nowrap'
  },
  infoBox: {
    marginTop: '24px',
    backgroundColor: '#eff6ff',
    border: '1px solid #bfdbfe',
    borderRadius: '8px',
    padding: '16px'
  },
  infoTitle: {
    fontWeight: '500',
    color: '#1e40af',
    marginBottom: '8px'
  },
  infoText: {
    fontSize: '14px',
    color: '#1e40af',
    marginBottom: '12px'
  },
  codeBlock: {
    fontSize: '12px',
    color: '#1e40af',
    backgroundColor: 'white',
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #e5e7eb',
    fontFamily: 'monospace'
  }
};

// Helper function to format date
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return {
    dayName: days[date.getDay()],
    day: date.getDate(),
    month: months[date.getMonth()],
    year: date.getFullYear(),
    fullDate: date.toLocaleDateString()
  };
};

// Helper function to generate ICS content
const generateICS = (roadmapData) => {
  const icsHeader = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//AI Coach//Roadmap//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH`;

  const icsFooter = `END:VCALENDAR`;

  const events = roadmapData.map(item => {
    const date = new Date(item.date);
    const startDate = date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endDate = new Date(date.getTime() + 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    return `BEGIN:VEVENT
UID:${Date.now()}-${Math.random().toString(36).substr(2, 9)}@aicoach.com
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:AI Coach: ${item.task}
DESCRIPTION:Task: ${item.task}\\n\\nMotivation: ${item.motivation}
CATEGORIES:AI Coach,Personal Development
STATUS:CONFIRMED
TRANSP:OPAQUE
END:VEVENT`;
  }).join('\n');

  return `${icsHeader}\n${events}\n${icsFooter}`;
};

// Main Roadmap Component
export default function Roadmap({ roadmapData = sampleRoadmapData }) {
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [hoveredButton, setHoveredButton] = useState(null);

  const toggleTaskComplete = (date) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(date)) {
      newCompleted.delete(date);
    } else {
      newCompleted.add(date);
    }
    setCompletedTasks(newCompleted);
  };

  const downloadICS = () => {
    const icsContent = generateICS(roadmapData);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ai-coach-roadmap.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateGoogleCalendarUrl = (task) => {
    const date = new Date(task.date);
    const startDate = date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endDate = new Date(date.getTime() + 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: `AI Coach: ${task.task}`,
      dates: `${startDate}/${endDate}`,
      details: `Task: ${task.task}\n\nMotivation: ${task.motivation}`,
      location: 'Personal Development'
    });
    
     return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerTitle}>
          <span style={{ fontSize: '24px' }}>📅</span>
          <h1 style={styles.title}>AI Coach Roadmap</h1>
        </div>
        <p style={styles.subtitle}>Your personalized journey to success</p>
        
        {/* Export Button */}
        <button
          style={{
            ...styles.exportButton,
            ...(hoveredButton === 'export' ? styles.exportButtonHover : {})
          }}
          onClick={downloadICS}
          onMouseEnter={() => setHoveredButton('export')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <span>⬇️</span>
          Export to Calendar (.ics)
        </button>
      </div>

      {/* Calendar Grid */}
      <div style={styles.grid}>
        {roadmapData.map((item) => {
          const dateInfo = formatDate(item.date);
          const isCompleted = completedTasks.has(item.date);
          
          return (
            <div
              key={item.date}
              style={{
                ...styles.card,
                ...(isCompleted ? styles.cardCompleted : {}),
                ...(hoveredButton === item.date ? { transform: 'translateY(-2px)', boxShadow: '0 8px 25px -5px rgba(0, 0, 0, 0.1)' } : {})
              }}
              onMouseEnter={() => setHoveredButton(item.date)}
              onMouseLeave={() => setHoveredButton(null)}
            >
              {/* Date Header */}
              <div style={styles.cardHeader}>
                <div style={styles.dateInfo}>
                  <div style={styles.dayName}>{dateInfo.dayName}</div>
                  <div style={styles.day}>{dateInfo.day}</div>
                  <div style={styles.monthYear}>{dateInfo.month} {dateInfo.year}</div>
                </div>
                <button
                  onClick={() => toggleTaskComplete(item.date)}
                  style={{
                    ...styles.completeButton,
                    ...(isCompleted ? styles.completeButtonActive : styles.completeButtonInactive)
                  }}
                >
                  {isCompleted ? '✅' : '⭕'}
                </button>
              </div>

              {/* Task */}
              <div style={styles.taskSection}>
                <div style={styles.sectionTitle}>
                  🎯 Today's Task
                </div>
                <p style={{
                  ...styles.taskText,
                  ...(isCompleted ? styles.taskCompleted : {})
                }}>
                  {item.task}
                </p>
              </div>

              {/* Motivation */}
              <div style={styles.taskSection}>
                <div style={styles.sectionTitle}>
                  💖 Motivation
                </div>
                <p style={styles.motivationText}>{item.motivation}</p>
              </div>

              {/* Google Calendar Link */}
              <a
                href={generateGoogleCalendarUrl(item)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...styles.googleCalendarLink,
                  ...(hoveredButton === `cal-${item.date}` ? { backgroundColor: '#bfdbfe' } : {})
                }}
                onMouseEnter={() => setHoveredButton(`cal-${item.date}`)}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <span>🔗</span>
                Add to Google Calendar
              </a>
            </div>
          );
        })}
      </div>

      {/* Progress Summary */}
      <div style={styles.progressContainer}>
        <h2 style={styles.progressTitle}>Progress Summary</h2>
        <div style={styles.progressBar}>
          <div style={styles.progressBarTrack}>
            <div 
              style={{
                ...styles.progressBarFill,
                width: `${(completedTasks.size / roadmapData.length) * 100}%`
              }}
            ></div>
          </div>
          <span style={styles.progressText}>
            {completedTasks.size} of {roadmapData.length} tasks completed
          </span>
        </div>
      </div>

      {/* Info Box */}
      <div style={styles.infoBox}>
        <h3 style={styles.infoTitle}>Google Calendar Integration</h3>
        <p style={styles.infoText}>
          For real-time sync with Google Calendar, you'll need to implement the Google Calendar API with OAuth 2.0 authentication.
        </p>
        <div style={styles.codeBlock}>
          <p>Required API calls:</p>
          <p>• POST /calendar/v3/calendars/primary/events</p>
          <p>• PUT /calendar/v3/calendars/primary/events/eventId</p>
          <p>• DELETE /calendar/v3/calendars/primary/events/eventId</p>
        </div>
      </div>
    </div>
  );
}