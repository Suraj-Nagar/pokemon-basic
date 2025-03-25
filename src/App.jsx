import Pokedex from './components/pokedex/pokedex'
import './App.css'

function App() {
  
  return (
    <div className='outer-pokedex'>
    <h1 id='pokedex-heading'>
      <Link to='/' >pokedex</Link> 
      
      </h1>
    <CustomRoutes/>
    </div>
  )
}

export default App
