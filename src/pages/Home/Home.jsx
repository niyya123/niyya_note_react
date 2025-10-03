import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/features/auth/authSlice';
const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
return(
    <>
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f7fa" }}>
      {/* Sidebar */}
      <nav
        style={{
          width: 220,
          background: "#0a2342",
          color: "#fff",
          padding: "24px 0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <img src="/logo192.png" alt="Logo" style={{ width: 48 }} />
          <h2 style={{ margin: "16px 0 0 0" }}>Niyya Notes</h2>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: 16, paddingLeft: 24 }}>
            <strong>Home</strong>
            <div style={{ marginLeft: 16, cursor: "pointer" }}>Home</div>
          </div>
          <div style={{ marginBottom: 16, paddingLeft: 24 }}>
            <strong>Gallery</strong>
            <div style={{ marginLeft: 16, cursor: "pointer" }}>Gallery</div>
            <div style={{ marginLeft: 16, cursor: "pointer" }}>Add Images</div>
          </div>
          <div style={{ marginBottom: 16, paddingLeft: 24 }}>
            <strong>Chat</strong>
            <div style={{ marginLeft: 16, cursor: "pointer" }}>Chat box</div>
          </div>
          <div style={{ marginBottom: 16, paddingLeft: 24 }}>
            <strong>Games</strong>
            <div style={{ marginLeft: 16, cursor: "pointer" }}>Games</div>
          </div>
          <div style={{ marginBottom: 16, paddingLeft: 24 }}>
            <strong>Notes</strong>
            <div style={{ marginLeft: 16, cursor: "pointer" }}>Notes</div>
          </div>
          <div style={{ marginBottom: 16, paddingLeft: 24 }}>
            <strong>Account</strong>
            <div style={{ marginLeft: 16, cursor: "pointer" }}>User Info</div>
            <div
              style={{ marginLeft: 16, cursor: "pointer" }}
              onClick={() => {
                localStorage.removeItem("token");
                dispatch(logout());
                navigate("/login");
              }}
            >
              Sign out
            </div>
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <main style={{ flex: 1, padding: "32px 48px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div />
          <div style={{ fontSize: 16 }}>
            Hello, user <strong>brother</strong>
          </div>
        </div>
        <div style={{ marginTop: 32 }}>
          <h1>
            Welcome to <span style={{ color: "#1976d2" }}>My App</span> or{" "}
            <span style={{ color: "#2ec4b6" }}>Your Space</span>
          </h1>
          <div style={{ display: "flex", gap: 32, marginTop: 32 }}>
            <img
              src="https://cdn.dribbble.com/users/1787323/screenshots/5977192/media/2e3e2e2e2e2e2e2e2e2e2e2e2e2e2e2e.png"
              alt="App"
              style={{ width: 320, borderRadius: 16, boxShadow: "0 2px 8px #ccc" }}
            />
            <div style={{ maxWidth: 400, fontSize: 18, color: "#333" }}>
              This is a website where you can take notes, save your images, and have some chit-chat in the general room chat and play some games. Make your productivity and fun seamless!
            </div>
          </div>
          <div style={{ marginTop: 48 }}>
            <h2>Features:</h2>
            <ul style={{ fontSize: 18 }}>
              <li>Save, upload, and manage your images</li>
              <li>General real-time chat box</li>
              <li>Some chill games</li>
              <li>Note todos</li>
              <li>Play games</li>
            </ul>
          </div>
          <div style={{ marginTop: 32 }}>
            <img
              src="https://cdn.dribbble.com/users/1787323/screenshots/5977192/media/2e3e2e2e2e2e2e2e2e2e2e2e2e2e2e2e2e.png"
              alt="Features"
              style={{ width: 320, borderRadius: 16, boxShadow: "0 2px 8px #ccc" }}
            />
          </div>
        </div>
      </main>
    </div>
    <button onClick={() => {
      localStorage.removeItem('token');
      dispatch(logout());
      navigate('/login');
    }}>Logout</button>
    </>
)
}
export default Home;