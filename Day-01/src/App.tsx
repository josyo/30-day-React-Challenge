import { ProfileCard } from './components/ProfileCard'

function App() {
  return (
    <main className="app-layout">
      <header className="app-header">
        <h1>Dashboard</h1>
      </header>
      <section className="content-area">
        <ProfileCard 
          name="Joseph" 
          role="Developer" 
          goal="Mastering react in 30 days" 
        />
      </section>
    </main>
  )
}

export default App