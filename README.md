# 🚀 Google Auth Vue App

This is a simple Vue.js application that demonstrates how to integrate **Google Sign-In authentication using Firebase**. It uses `signInWithPopup` to authenticate users via Google and retrieve their basic profile information.

---

## 📦 Tech Stack

- **Vue.js 2/3**
- **Firebase Authentication**
- **Google OAuth**
- **JavaScript**

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/google-auth.git
cd google-auth
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Firebase

- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a project (if not already)
- Enable **Authentication > Sign-in Method > Google**
- Copy your Firebase config object

Replace the config in `App.vue`:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  ...
};
```

### 4. Run the Application

```bash
npm run serve
```

Visit `http://localhost:8080` to see the app running.

---

## 📸 Features

- Google Sign-In using popup method
- Firebase Authentication integration
- Retrieves and logs user data
- Error handling for auth failures

---

## 📁 Project Structure

```
google-auth/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── App.vue
│   └── main.js
├── package.json
└── README.md
```

---

## 🧪 Demo Output

On successful login, the console logs:

```
User signed in: {
  displayName: "User Name",
  email: "user@example.com",
  UID:"1247...",
  Access Token:"Access_Token_for_login"
  ...
}
```

---

## 📃 License

MIT
