import { Link } from "react-router-dom"


function CaptainHome() {
  return (
    <div>
      <h1 className="text-3xl font-medium text-green-500">Welcome to captain Home</h1>
      <Link to="/captain-logout">Logout</Link>
    </div>
  )
}

export default CaptainHome