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






<!-- Initial code for community.html -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Community - Unified Campus System</title>
    <link rel="stylesheet" href="style.css" />
    <script
      src="https://kit.fontawesome.com/a076d05399.js"
      crossorigin="anonymous"
    ></script>
  </head>
  <body background="giphy1.gif">
    <div class="community-container">
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
            <a href="community.html" class="active"
              ><i class="fas fa-users"></i> Community</a
            >
          </li>
          <li>
            <a href="index.html" class="logout"
              ><i class="fas fa-sign-out-alt"></i> Logout</a
            >
          </li>
        </ul>
      </aside>

      <!-- Main Content -->
      <main class="community-content">
        <header>
          <h1>Community Space</h1>
          <button class="profile-btn">
            <i class="fas fa-user-circle"></i> Profile
          </button>
        </header>

        <!-- Post Input Box -->
        <section class="post-box">
          <textarea
            placeholder="Share something with the community..."
          ></textarea>
          <button class="post-btn">Post</button>
        </section>

        <!-- Post Feed -->
        <section class="post-feed">
          <div class="post">
            <h3>Harry Thomas <span class="timestamp">2 hours ago</span></h3>
            <p>Excited to start the new semester! 🚀</p>
            <div class="comment-section">
              <input type="text" placeholder="Write a comment..." />
              <button class="comment-btn">Comment</button>
            </div>
          </div>

          <div class="post">
            <h3>Libin Babu <span class="timestamp">5 hours ago</span></h3>
            <p>Does anyone have notes for the Data Structures class?</p>
            <div class="comment-section">
              <input type="text" placeholder="Write a comment..." />
              <button class="comment-btn">Comment</button>
            </div>
          </div>

          <div class="post">
            <h3>
              Kevin Mathew Jacob <span class="timestamp">5 hours ago</span>
            </h3>
            <p>I'll share the notes for the Data Structures class</p>
            <div class="comment-section">
              <input type="text" placeholder="Write a comment..." />
              <button class="comment-btn">Comment</button>
            </div>
          </div>

          <div class="post">
            <h3>Jude Abi <span class="timestamp">5 hours ago</span></h3>
            <p>When's the exam?</p>
            <div class="comment-section">
              <input type="text" placeholder="Write a comment..." />
              <button class="comment-btn">Comment</button>
            </div>
          </div>
        </section>
      </main>
    </div>
    <script>
      document.addEventListener("DOMContentLoaded", function () {
        const posts = document.querySelectorAll(".post");

        function checkScroll() {
          posts.forEach((post) => {
            const rect = post.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
              post.classList.add("show");
            }
          });
        }

        window.addEventListener("scroll", checkScroll);
        checkScroll(); // Run on page load
      });
    </script>
  </body>
</html>




<!-- Styles -->

Main Content
.community-content {
    flex-grow: 1;
    /*padding: 20px;*/
    margin-left: 250px; /* Push the main content to the right */
    padding-left: 20px; /* Space from the sidebar */
}

/* Post Box */
.post-box {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    transform: scale(0.95);
    transition: 0.3s ease;
}

.post-box:hover {
    transform: scale(1);
}

.post-box textarea {
    width: 100%;
    height: 80px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
    font-size: 16px;
}

.post-btn {
    margin-top: 10px;
    padding: 10px;
    width: 100%;
    border: none;
    background-color: #3498db;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: 0.3s ease;
}

.post-btn:hover {
    background-color: #2980b9;
    transform: scale(1.05);
}

/* Post Feed */
.post-feed {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

/* Post Fade-in Effect */
.post {
    background-color: white;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out;
}

.post.show {
    opacity: 1;
    transform: translateY(0);
}

.post h3 {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
}

.timestamp {
    font-size: 14px;
    color: gray;
}

.post p {
    font-size: 16px;
    margin-top: 5px;
}

/* Comment Section */
.comment-section {
    margin-top: 10px;
    display: flex;
    gap: 10px;
}

.comment-section input {
    flex-grow: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: 0.3s ease;
}

.comment-section input:focus {
    border-color: #3498db;
    box-shadow: 0px 0px 8px rgba(52, 152, 219, 0.5);
}

.comment-btn {
    background-color: #27ae60;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s ease;
}

.comment-btn:hover {
    background-color: #535353;
    transform: scale(1.05);
}