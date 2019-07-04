//load dotENV
require('dotenv').config()

//load Twit using the keys from dotENV
var Twitter = require('twitter');
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_SECRET
});
//load Google Images API
const googleimg = require('google-images')
var img = new googleimg(process.env.CSE_ID, process.env.CSE_API_KEY)
//node-schedules
var schedule = require('node-schedule');
//load image downloader
const download = require('image-downloader')

//the thing
const start = async function(){
    let image = await fetchImage('Naporitan')
    var j = schedule.scheduleJob('00 * * * *', function(){
        const options = {
            url: image.url,
            dest: './temp.png'                  // Save to /path/to/dest/image.jpg
          }
           
          download.image(options)
            .then(({ filename, image }) => {
              console.log('File saved to', filename)
            })
            .catch((err) => {
              console.error(err)
            })
            // Load your image
            var data = require('fs').readFileSync('temp.png');
    
            // Make post request on media endpoint. Pass file data as media parameter
            client.post('media/upload', {media: data}, function(error, media, response) {
                console.log(error)
            
              if (!error) {
            
                // If successful, a media object will be returned.
                console.log(media);
            
                // Lets tweet it
                var status = {
                  status: 'Hourly Napolitan',
                  media_ids: media.media_id_string // Pass the media id string
                }
            
                client.post('statuses/update', status, function(error, tweet, response) {
                    console.log(error)
                  if (!error) {
                    console.log(tweet);
                    console.log(error)
                  }
                });
            
              }
            });
      });
}

//tweet now (test only)
const now = async function(){
    console.log('Started! waiting for :00!')
    let image = await fetchImage('Naporitan')
    const options = {
        url: await image.url,
        dest: './temp.png'                  // Save to /path/to/dest/image.jpg
      }
       
      download.image(options)
        .then(({ filename, image }) => {
          console.log('File saved to', filename)
        })
        .catch((err) => {
          console.error(err)
        })
        // Load your image
        var data = require('fs').readFileSync('temp.png');

        // Make post request on media endpoint. Pass file data as media parameter
        client.post('media/upload', {media: data}, function(error, media, response) {
            console.log(error)
        
          if (!error) {
        
            // If successful, a media object will be returned.
            console.log(media);
        
            // Lets tweet it
            var status = {
              status: 'Hourly Napolitan',
              media_ids: media.media_id_string // Pass the media id string
            }
        
            client.post('statuses/update', status, function(error, tweet, response) {
                console.log(error)
              if (!error) {
                console.log(tweet);
                console.log(error)
              }
            });
        
          }
        });
}

//img fetch
const fetchImage =  async function(query) {
    return new Promise((resolve, reject) => {
        img.search(query).then((images) => {
            return resolve(images[Math.round(Math.random() * images.length)]);
        }).catch((error) => reject(error));
    });
};

const imgtest = async function(){
    let image = await fetchImage('Naporitan')
    console.debug(image)
    console.debug(`URL: ${await image.url}`)
    return;
} 


//cmd arguments
var args = process.argv.slice(2);
if(arg = undefined){
    console.log('No arguments included. Starting bot as normal.');
}
else{
    console.log(`Parsing argument "${arg}"...`)
}
switch(args[0]){
    case undefined:
        start()
        break;
    case 'start':
        console.log("Starting Napolitan bot by Cappuchino...")
        start()
        break;
    case 'now':
        now()
    case 'imgtest':
        console.log('Testing Google Images...')
        imgtest()
        break;
    default:
        if(args = undefined) console.log('No Arguments detected...')
        else console.log(`Argument: ${args}`)
        console.log("Starting Napolitan bot by Cappuchino...")
        start()
        break;
}