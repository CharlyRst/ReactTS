import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header className="header">
        <span className="brand">Station Atlas</span>
        <nav>
          <NavLink to="/docks" className={({ isActive }) => (isActive ? "active" : "")}>
            Quais
          </NavLink>
          <NavLink to="/requests" className={({ isActive }) => (isActive ? "active" : "")}>
            Demandes
          </NavLink>
        </nav>
      </header>
      <main className="content">
        <Outlet />
      </main>
    </>
  );
}
