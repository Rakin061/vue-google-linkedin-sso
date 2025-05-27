<!-- eslint-disable no-unused-vars -->
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>Welcome to Aptitudo App</h1>
    <button @click="loginWithGoogle">Login with Google</button>
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
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // eslint-disable-next-line no-unused-vars
        const token = credential.accessToken;
        const user = result.user;
        console.log("✅ User signed in:", user);
        console.log("🔐 User Credentials:", credential);
        console.log("🔐 Access Token for login:", token);
      } catch (error) {
        console.error("❌ Error signing in:", error.message);
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
button {
  padding: 10px 20px;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
}
</style>
