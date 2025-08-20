<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1 class="text-2xl font-bold mb-4">Welcome to Aptitudo App</h1>
    
    <!-- Google Login -->
    <div>
      <button @click="loginWithGoogle" class="google-login-btn">
        Login with Google
      </button>
    </div>

    <!-- LinkedIn Login -->
    <div class="mt-4">
      <button @click="loginWithLinkedin" class="linkedin-login-btn">
        Login with LinkedIn
      </button>
    </div>

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
import { auth, provider } from './firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export default {
  //name: 'App',
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

        this.googleResponse = JSON.stringify({
          user: user.uid,
          // token: credential,
          token
        }, null, 2);

        console.log("✅ Google Response:", this.googleResponse);
      } catch (error) {
        console.error("❌ Google Login Error:", error);
      }
    },

    /** LINKEDIN LOGIN */
    async loginWithLinkedin() {
      const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
      const redirectUri = import.meta.env.VITE_LINKEDIN_REDIRECT_URI;
      // const clientSecret = import.meta.env.VITE_LINKEDIN_CLIENT_SECRET;
      const state = "foobar"; // random string for CSRF protection
      const scope = "openid profile email"; // adjust as needed

      const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${encodeURIComponent(scope)}`;

      // open popup window
      const popup = window.open(authUrl, "LinkedIn Login", "width=600,height=600");

      // check popup response
      const timer = setInterval(async () => {
        try {
          if (popup.location && popup.location.href.includes(redirectUri)) {
            clearInterval(timer);
            const urlParams = new URLSearchParams(popup.location.search);
            const code = urlParams.get("code");
            const returnedState = urlParams.get("state");
            console.log("🔑 LinkedIn State:", returnedState);
            popup.close();

            console.log("🔑 LinkedIn Code:", code);

           
            // Step 2: Send code to backend to get access token
            const tokenResponse = await fetch('http://localhost:3000/linkedin/token', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ code })
            });
            // const tokenData = await tokenResponse.json();
            // console.log('📦 LinkedIn Token:', tokenData);


            // Step 3: Fetch user profile
           const userProfile = await tokenResponse.json();
            console.log('👤 LinkedIn Profile:', userProfile);
            this.linkedinResponse = JSON.stringify(userProfile, null, 2);
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.google-login-btn {
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 4px;
}
.linkedin-login-btn {
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 4px;
}
.google-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.linkedin-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
</style>
