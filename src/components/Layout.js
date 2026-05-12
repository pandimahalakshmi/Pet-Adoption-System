import Navbar from "./Navbar";
import UserSidebar from "./UserSidebar";

function Layout({ children }) {
  return (
    <div className="app-layout">
      <Navbar />
      <div className="app-body">
        <aside className="app-sidebar">
          <UserSidebar />
        </aside>
        <main className="app-main">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
