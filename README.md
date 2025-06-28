User Profile Form

A complete multi-step user profile update form built with HTML, CSS, and JavaScript, powered by Node.js, Express, and MongoDB.

📟 Features

Upload profile photo with preview (max 2MB, JPG/PNG)

Check username availability (live)

Password strength indicator

Profession-based fields (dynamic company input)

Country → State → City cascading dropdown

Newsletter subscription option

Final step summary before submit

Stores data in MongoDB users collection

⚙️ How to Run This Project

Make sure you have Node.js, npm, and MongoDB installed.

1. 📁 Clone the Repository

git clone https://github.com/Kanhaiya-tasker/user-profile-form.git
cd user-profile-form

2. 🚀 Start the Backend Server

cd server
npm install
node app.js

Server will run at:🔗 http://localhost:5000

You should see:Server running at http://localhost:5000MongoDB connected

3. 🌐 Open Frontend (Client)

Go back to root folder:

cd ..

Then, open index.html in your browser manuallyor use the Live Server extension in VS Code.

4. 📄 View Submitted Data in MongoDB

Open MongoDB Compass or your preferred MongoDB client.

Connect using:mongodb://localhost:27017

Go to:

Database: user-profile-form
Collection: users

You will find the saved data after form submission.

🥪 Testing

Try filling out the form in the browser. After clicking Submit, a popup will show “Profile saved successfully” if all validations pass and backend is working.

👨‍💻 Author

Made by Kanhaiya Kumar
