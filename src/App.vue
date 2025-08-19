<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>Welcome to Aptitudo App</h1>
    <button @click="loginWithGoogle" class="google-login-btn">
      <img src="./assets/google-icon.png" alt="Google Icon" class="google-icon" />
      Login with Google
    </button>
    <button @click="loginWithLinkedin" class="linkedin-login-btn">
      <img src="./assets/linkedin-icon.jpg" alt="LinkedIn Icon" class="linkedin-icon" />
      Login with LinkedIn
    </button>
  </div>
</template>

<script>
import { auth, provider } from './firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

provider.setCustomParameters({
  'login_hint': 'Candidate',
  'redirect_url': 'select_account'
});
console.log("🔧 Provider Details:", provider);

export default {
  name: 'App',
  methods: {
    async loginWithGoogle() {
      try {
        const result = await signInWithPopup(auth, provider);
        console.log("🔐 Sign-in result:", result);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("✅ User signed in:", user);
        console.log("🔐 User Credentials:", credential);
        console.log("🔐 Access Token for login:", token);
      } catch (error) {
        console.error("❌ Error signing in:", error);
        // Handle Errors here.
        const errorCode = error.code;
        console.error("Error Code:", errorCode);
        const errorMessage = error.message; 
        console.error("Error Message:", errorMessage);
        // The email of the user's account used.
        const email = error.email;
        console.error("User Email:", email);
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error("Credential from Error:", credential);
        // ...
          }
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
