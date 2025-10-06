export default function NavBar({children}) {
  return (
    <nav className="nav-bar">
        <Logo />
       {children}
    </nav>
  )
}
function Logo(){
  return(
    <div className="logo">
      <span role="img">🥤</span>
      <h1>Popcorn Soda</h1>
    </div>
  )
}