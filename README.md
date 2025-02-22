# ucs-web


<!--Initial Code of homepage.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dashboard - Unified Campus System</title>
    <style>
      body {
        background-image: url("giphy.gif");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        height: 100vh;
        margin: 0;
      }
    </style>
    <link rel="stylesheet" href="style.css" />
    <script
      src="https://kit.fontawesome.com/a076d05399.js"
      crossorigin="anonymous"
    ></script>
  </head>
  <body>
    <div class="dashboard-container">
      <!-- Sidebar -->
      <aside class="sidebar">
        <h2>Campus System</h2>
        <ul>
          <li>
            <a href="homepage.html"><i class="fas fa-home"></i> Home</a>
          </li>
          <li>
            <a href="dash.html"><i class="fas fa-home"></i> Dashboard</a>
          </li>
          <li>
            <a href="#"><i class="fas fa-utensils"></i> Canteen</a>
          </li>
          <li>
            <a href="#"><i class="fas fa-user-md"></i> Counseling</a>
          </li>
          <li>
            <a href="community.html"><i class="fas fa-users"></i> Community</a>
          </li>
          <li>
            <a href="index.html" class="logout"
              ><i class="fas fa-sign-out-alt"></i> Logout</a
            >
          </li>
        </ul>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <header>
          <h1>Welcome, User</h1>
          <button class="profile-btn">
            <i class="fas fa-user-circle"></i> Profile
          </button>
        </header>

        <!-- Dashboard Overview -->
        <section class="dashboard-overview">
          <div class="card">
            <h3>Total Students</h3>
            <p>1,500</p>
          </div>
          <div class="card">
            <h3>Active Orders</h3>
            <p>78</p>
          </div>
          <div class="card">
            <h3>Counseling Sessions</h3>
            <p>25</p>
          </div>
          <div class="card">
            <h3>Community Posts</h3>
            <p>320</p>
          </div>
        </section>

        <!-- Quick Actions -->
        <section class="quick-actions">
          <h2>Quick Actions</h2>
          <div class="actions">
            <button>Order Food</button>
            <button>Book Counseling</button>
            <button>Join Community</button>
          </div>
        </section>
      </main>
    </div>
  </body>
</html> 
