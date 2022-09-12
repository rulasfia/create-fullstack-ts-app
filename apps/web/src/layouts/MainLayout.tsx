import { Link, Outlet } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "2rem",
          margin: "1rem auto",
          justifyContent: "center",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/tasks">Tasks</Link>
      </div>
      <hr />

      <Outlet />
    </>
  );
}
