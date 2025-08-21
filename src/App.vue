<template>
  <div id="app" class="min-h-screen flex flex-col bg-gray-50 text-gray-800">

    <!-- HEADER -->
    <header class="bg-white shadow-md py-4">
      <h1 class="text-2xl font-bold text-center text-indigo-600">
       SSO Authentication with Google and LinkedIn
      </h1>
    </header>

    <!-- MAIN CONTENT -->
    <main class="flex-grow flex flex-col items-center text-center px-4">
      <!-- Logo -->
      <img alt="Vue logo" src="./assets/logo.png" class="w-54 h-54 mb-6 mx-auto" />

      <!-- Title -->
      <h2 class="text-xl font-semibold mb-6 text-gray-700">
        Sign in to Continue
      </h2>

      <!-- Google Login -->
      <div>
        <button @click="loginWithGoogle" class="google-login-btn">
          <img src="./assets/google-icon.png" alt="Google Icon" class="google-icon" />
          Login with Google
        </button>
      </div>

      <!-- LinkedIn Login -->
      <div class="mt-4">
        <button @click="loginWithLinkedin" class="linkedin-login-btn">
          <img src="./assets/linkedin-icon.jpg" alt="LinkedIn Icon" class="linkedin-icon" />
          Login with LinkedIn
        </button>
      </div>
    </main>

    <!-- FOOTER -->
    <footer class="bg-gray-300 shadow-inner py-3 text-center text-sm text-blue-500">
      © 2025 • Secure Single Sign-On
    </footer>

    <!-- JSON Modals -->
    <JSONModal
      :visible="showGoogleModal"
      :jsonData="googleResponse"
      title="Google Response"
      @close="showGoogleModal = false"
    />

    <JSONModal
      :visible="showLinkedinModal"
      :jsonData="linkedinResponse"
      title="LinkedIn Response"
      @close="showLinkedinModal = false"
    />
  </div>
</template>

<script>
import JSONModal from './components/JSONModal.vue'
import { auth, provider } from './firebase_local';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export default {
  components: { JSONModal },
  data() {
    return {
      googleResponse: null,
      linkedinResponse: null,
      showGoogleModal: false,
      showLinkedinModal: false
    };
  },
  methods: {
    /** GOOGLE LOGIN */
    async loginWithGoogle() {
      try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("Google User:", user);

        this.googleResponse = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          access_token: token,
          email_verified: user.emailVerified,
          photo_url: user.photoURL,
          phone_number: user.phoneNumber,
        };
        this.showGoogleModal = true;
      } catch (error) {
        console.error("❌ Google Login Error:", error);
      }
    },

    /** LINKEDIN LOGIN */
    async loginWithLinkedin() {
      const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
      const redirectUri = import.meta.env.VITE_LINKEDIN_REDIRECT_URI;
      const state = "foobar"; 
      const scope = "openid profile email"; 

      const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${encodeURIComponent(scope)}`;

      const popup = window.open(authUrl, "LinkedIn Login", "width=600,height=600");

      const timer = setInterval(async () => {
        try {
          if (popup.location && popup.location.href.includes(redirectUri)) {
            clearInterval(timer);
            const urlParams = new URLSearchParams(popup.location.search);
            const code = urlParams.get("code");
            popup.close();

            const tokenResponse = await fetch('http://localhost:3000/linkedin/token', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ code })
            });

            const userProfile = await tokenResponse.json();
            this.linkedinResponse = userProfile;
            this.showLinkedinModal = true;
          }
        } catch (err) {
          // ignore CORS errors while popup is still open
        }
      }, 500);
    }
  }
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50; */
  margin-top: 10px; /* reduce from 60px */
}

main {
  padding: 120px;
}

.google-login-btn,
.linkedin-login-btn {
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 6px;
  transition: all 0.2s ease-in-out;
}

.google-login-btn:hover,
.linkedin-login-btn:hover {
  background-color: #f9f9f9;
  transform: translateY(-1px);
}

.google-icon,
.linkedin-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
</style>
