Sometimes, you're really hungry and bored so you wrote a bot that posts images of food. Now Introducing: 
# Napolitan Twitter bot
Inspired by the Kagome spaghetti mascot [Napoli-tan](https://www.kagome.co.jp//campaign/naposta/napolitan/), This Twitter bot posts images of Japanese Naporitan(or Napolitan because L and R uses the same Katakana character in Japanese) Spaghetti hourly. Using the Google CSE Image Search API. So you can now have your favourite Japanese tomato sauce-filled spaghetti every hour!
## Features!

- Naporitan
- Naporitan
- Naporitan
- Naporitan
- Naporitan

## Running your own instance
If you, for some reason, want to host your own instance of this simple Naporitan bot. You can! I mean the code is on here after all!
### Prerequisites
 - Node.JS
 - Yarn Package Manager
 - Your own Google Custom Search Engine (CSE), along with it's ID and API key.
 - A Twitter Developer account, including the app and API key for said app.
 - A dotENV loader (Such as [Foreman](https://github.com/strongloop/node-foreman))
 - Git (if you didn't clone this by downloading it as a ZIP)
### Setup
After making sure you installed or have everything mentioned in the prerequisites, start by cloning this repository by typing this into your terminal
```
clone https://github.com/Cappuchino/napolitan-bot.git
```
Of course, you can skip installing Git and download this repo as a ZIP file and then extracting it somewhere.

Now, navigate your terminal to the repository folder. And download the Yarn packages by simply typing:
```
yarn
```
Wait for everything to download, and bada bing, bada boom. You have installed every Node.JS module required for this bot!

Now don't get ahead of yourself, the bot doesn't just magically know where your Twitter API key and your google CSE keys are. And now we are going to make it reconize them.

Make a file called `.env`, then put these things in it
```
TWITTER_CONSUMER_KEY=Your Twitter Consumer Key
TWITTER_CONSUMER_SECRET=Your Twitter Consumer Secret
TWITTER_ACCESS_TOKEN=Your Twitter access token
TWITTER_ACCESS_SECRET=Your Twitter access secret
CSE_ID=Your CSE Search Engine ID
CSE_API_KEY=Your CSE API key
```
Replace everything there with your own keys they gave you, obviously.

Now after that's done, all you have to do is run the thing!
Go to your terminal. Hopefully it's still up. If it's not just navigate to your repo folder again. And simply run the bot! by typing in:
```
yarn start
```
Hopefully if everything's properly set up, Your Naporitan bot is now up and running!

This bot is powered by twitter-node and [google-images](https://github.com/vadimdemedes/google-images).