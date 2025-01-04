import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="home">
      <div>Home</div>
      <Link to="/logout">Logout</Link>
    </div>
    
  )
}

export default Home