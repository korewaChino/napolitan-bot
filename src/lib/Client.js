const twitter = require("twitter");
const googleImages = require("google-images");
const schedular = require("node-schedule");
const { readFileSync, unlinkSync } = require("fs");
const download = require("image-downloader");
const EventEmitter = require("events");
const path = require("path");

class Client extends EventEmitter {
	constructor() {
		super();

		/**
		 * Twitter client
		 */
		this.twitter = new twitter({
			consumer_key: process.env.TWITTER_CONSUMER_KEY,
			consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
			access_token_key: process.env.TWITTER_ACCESS_TOKEN,
			access_token_secret: process.env.TWITTER_ACCESS_SECRET
		});

		this.google = new googleImages(process.env.CSE_ID, process.env.CSE_API_KEY);

    this.time = process.env.TIME_STRING || "00 * * * * *";

		this.on("IMAGE_DOWNLOADED", async () => {
      const file = await readFileSync(path.join(__dirname, "..", "out", "temp.png"));
      if (!file) return console.log("WARNING No image found!");
      await this.post(file);
      await unlinkSync(path.join(__dirname, "..", "out", "temp.png"));
    });
	}


  start() {
    schedular.scheduleJob(this.time, () => {
			this.fetchImage("Naporitan").then((image) => {
        if (!image || !image.url) return;
				download.image({ url: image.url, dest: path.join(__dirname, "..", "out", "temp.png") }).then(() => {
					this.emit("IMAGE_DOWNLOADED");
				});
			});
		});
  }

	/**
	 *
	 * @param {any} image - Image to post
	 */
	async post(image) {
		this.twitter.post("media/upload", { media: image }, (error, data, res) => {
			const status = {
				status: "Hourly Napolitan",
				media_ids: data.media_id_string
			};
			this.twitter.post("statuses/update", status, (err, data, response) => {
        if (err) return console.error(err);
        console.log("posted!");
			});
		});
	}

	/**
	 *
	 * @param {String} query - Image to search for
	 */
	async fetchImage(query) {
		return new Promise((resolve, reject) => {
			this.google
				.search(query)
				.then((images) => {
					return resolve(images[Math.round(Math.random() * images.length)]);
				})
				.catch((error) => reject(error));
		});
	}
}

module.exports = Client;