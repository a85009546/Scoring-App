import { useState } from 'react'
import './App.css'

const DEFAULT_TEAMS = [
  { id: 1, name: '隊伍一', score: 0, color: '#FF6B6B' },
  { id: 2, name: '隊伍二', score: 0, color: '#4ECDC4' },
  { id: 3, name: '隊伍三', score: 0, color: '#FFE66D' },
  { id: 4, name: '隊伍四', score: 0, color: '#95E1D3' },
]

function App() {
  const [teams, setTeams] = useState(DEFAULT_TEAMS)
  const [showAddTeam, setShowAddTeam] = useState(false)
  const [newTeamName, setNewTeamName] = useState('')

  const updateScore = (teamId, delta) => {
    setTeams(teams.map(team => 
      team.id === teamId 
        ? { ...team, score: Math.max(0, team.score + delta) }
        : team
    ))
  }

  const resetScore = (teamId) => {
    setTeams(teams.map(team => 
      team.id === teamId 
        ? { ...team, score: 0 }
        : team
    ))
  }

  const resetAll = () => {
    if (window.confirm('確定要重置所有分數嗎？')) {
      setTeams(teams.map(team => ({ ...team, score: 0 })))
    }
  }

  const addTeam = () => {
    if (newTeamName.trim()) {
      const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#A8E6CF', '#FFD93D', '#6BCB77', '#FF9F43']
      const newTeam = {
        id: Date.now(),
        name: newTeamName.trim(),
        score: 0,
        color: colors[teams.length % colors.length]
      }
      setTeams([...teams, newTeam])
      setNewTeamName('')
      setShowAddTeam(false)
    }
  }

  const removeTeam = (teamId) => {
    if (teams.length <= 1) {
      alert('至少需要保留一個隊伍！')
      return
    }
    if (window.confirm('確定要刪除這個隊伍嗎？')) {
      setTeams(teams.filter(team => team.id !== teamId))
    }
  }

  const sortedTeams = [...teams].sort((a, b) => b.score - a.score)

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎯 團康計分器</h1>
        <button className="reset-all-btn" onClick={resetAll}>
          重置全部
        </button>
      </header>

      <div className="teams-container">
        {teams.map((team) => {
          const rank = sortedTeams.findIndex(t => t.id === team.id) + 1
          return (
            <div key={team.id} className="team-card" style={{ borderColor: team.color }}>
              <div className="team-header">
                <div className="team-info">
                  <span className="team-rank">#{rank}</span>
                  <h2 className="team-name">{team.name}</h2>
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => removeTeam(team.id)}
                  aria-label="刪除隊伍"
                >
                  ×
                </button>
              </div>
              
              <div className="score-display" style={{ color: team.color }}>
                {team.score}
              </div>

              <div className="score-controls">
                <button 
                  className="score-btn minus"
                  onClick={() => updateScore(team.id, -1)}
                >
                  -1
                </button>
                <button 
                  className="score-btn minus"
                  onClick={() => updateScore(team.id, -5)}
                >
                  -5
                </button>
                <button 
                  className="score-btn plus"
                  onClick={() => updateScore(team.id, 5)}
                >
                  +5
                </button>
                <button 
                  className="score-btn plus"
                  onClick={() => updateScore(team.id, 1)}
                >
                  +1
                </button>
              </div>

              <button 
                className="reset-btn"
                onClick={() => resetScore(team.id)}
              >
                重置分數
              </button>
            </div>
          )
        })}
      </div>

      {showAddTeam ? (
        <div className="add-team-form">
          <input
            type="text"
            placeholder="輸入隊伍名稱"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTeam()}
            autoFocus
            className="team-name-input"
          />
          <div className="form-buttons">
            <button className="confirm-btn" onClick={addTeam}>確認</button>
            <button className="cancel-btn" onClick={() => {
              setShowAddTeam(false)
              setNewTeamName('')
            }}>取消</button>
          </div>
        </div>
      ) : (
        <button 
          className="add-team-btn"
          onClick={() => setShowAddTeam(true)}
        >
          + 新增隊伍
        </button>
      )}
    </div>
  )
}

export default App

