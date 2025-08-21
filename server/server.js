import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path'

//dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
const app = express();

app.use(cors());
app.use(express.json()); // parse JSON body

// LinkedIn OAuth token exchange
app.post('/linkedin/token', async (req, res) => {
  try {
    const { code } = req.body;

    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
      client_id: process.env.LINKEDIN_CLIENT_ID,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET
    });

    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params
    });

    const tokenData = await tokenResponse.json();
    // res.json(tokenData);

    if (!tokenData.access_token) {
      return res.status(400).json({ error: 'Failed to get access token', details: tokenData });
    }

     // Step 3: Fetch user profile using access token
    const userResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Cache-Control': 'no-cache',
      }
    });


    const userData = await userResponse.json();

    res.json(userData);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Token exchange failed' });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Backend running on port ${process.env.PORT || 3000}`);
});
