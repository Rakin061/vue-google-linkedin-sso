# 🚀 Demo Application for SSO Authentication in Vue.js

This is a Vue.js application that demonstrates **Single Sign-On (SSO) authentication using Google (Firebase) and LinkedIn OAuth2**. Users can log in via Google or LinkedIn and see their profile data displayed in a JSON modal.

---

## 📦 Tech Stack

- **Frontend:** Vue.js 3, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Authentication:** Firebase (Google) & LinkedIn OAuth2
- **Languages:** JavaScript (ES Modules)

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/google-auth.git
cd vue-google-linkedin-sso
```
### 2 Install Dpendencies (Fronetend/Vue.js)
```bash
npm install
```
### 2 Install Dpendencies (Backend/Node.js/Express)
```bash
cd server
npm install
```
### 3. Configure Firebase (Google Auth)
1. Go to [Firebase Console](https://console.firebase.google.com/u/0/)
2. Create a project (if not already)
3. Enable Authentication → Sign-in Method → Google
4. Copy your Firebase config object and replace the values in src/firebase.js:
```bash
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
}
```
### 4. Configure LinkedIn OAuth
1. Go to [LinkedIn Developer Portal](https://www.linkedin.com/developers/)
2. Create a new OAuth 2.0 Application
3. Set the Redirect URI: `{your_local_ip}/linkedin/callback`
4. Copy the Client ID and Client Secret
5. Add environment variables in .env (fronend) and server/.env (backend):
```bash
#Frontend
VITE_LINKEDIN_CLIENT_ID=your_client_id
VITE_LINKEDIN_CLIENT_SECRET=your_client_secret
VITE_LINKEDIN_REDIRECT_URI=your_redirect_url

#Backend
LINKEDIN_CLIENT_ID= your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret
LINKEDIN_REDIRECT_URI=your_redirect_url

```
### 5. Run the Application
```bash
#backend
cd backend
node server.js

#frontend
cd ..
npm run dev

```
Visit: http://localhost:9090 / {http://{your_ip}:9090}

### 📸 Features

- Google Sign-In using Firebase Authentication
- LinkedIn OAuth2 login via Node.js backend
- Collapsible JSON response display in modal
- Copy response to clipboard
- Responsive design with Tailwind CSS
- Professional landing page with SSO buttons
- Error handling for both Google and LinkedIn authentication

### 📁 Project Structure
```
google-linkedin-auth/
│
├── frontend/                # Vue.js frontend
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── App.vue
│   │   ├── JSONModal.vue
│   │   ├── JSONTree.vue
│   │   ├── firebase.js
│   │   └── main.js
│   ├── package.json
│   └── vite.config.js
│
├── backend/                 # Node.js / Express backend
│   ├── server.js
│   ├── package.json
│   └── routes/
│       └── linkedin.js
│
└── README.md
```
### 🧪 Demo Output
```bash
#Google Sing-in
{
  uid: "N1f6GKjSNCNU47jDrfr0cpoPoNA3",
  name: "Salman Rakin",
  email: "salmankaderrakin@gmail.com",
  access_token: "ya29A0AS3H6Nye-faT5whHyVmqV3QjyqwgVYJ2tFxxy5Rw9VJ8WSbrGS8Gl-1MmTuhp3HVzTIKq2_UfULPPo_dUReWoHwBCXKCEU3I0tNvzxFAOW-jMZvS1UlypXVGGcFsHMgrvppQzKjnBNy6tVbE-HqJ0P7TGqRAWmZN3Z2j9D-Z0e6LdkrpEMWtWdD-rQUde-pdaUnvd5rCaCgYKAd8SARQSFQHGX2MiOq4tb7MFi6kdkmC6emVedw0207",
  email_verified: true,
  photo_url: "https://lh3.googleusercontent.com/a/ACg8ocJHNYcIh-d07Uzxpg7YnpF2AtFGcS7hmAX6K253NpeADdzTycsSVA=s96-c",
  phone_number: null
}

#LinkedIn Login
{
  sub: "o_eDBBVxaQ",
  email_verified: true,
  name: "Salman Rakin",
  locale: {
    country: "US",
    language: "en"
  },
  given_name: "Salman",
  family_name: "Rakin",
  email: "salmankaderrakin@gmail.com",
  picture: "https://media.licdn.com/dms/image/v2/D5603AQEi75dMIeRcBA/profile-displayphoto-scale_100_100/B56Ze7PEOIHUAc-/0/1751192978976?e=1758758400&v=beta&t=fThyzfDTuMhzSB_8d0QCkjHbxc_NQdHsRdpWttLTN8o"
}

```
The JSON responses are displayed in a collapsible modal with syntax highlighting and a copy button.

### Useful Links 
- [Firebase Documentation](https://firebase.google.com/docs/auth/web/google-signin)
- [LinkedIn Developer Docs](https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?tabs=HTTPS1)

### ⚙️ Environment Variables

- Frontend: .env with VITE_ prefix
- Backend: .env for secure LinkedIn secrets
- Never commit .env files containing keys to Git

### 📃 License

This project is open-source under the MIT License. Feel free to fork, modify, and distribute freely.