const img = require('free-google-image-search')
module.exports = {
    function(){
        img.default.searchImage('napolitan')
        .then((res) => {
            console.log(res); // URLs
            return(res)
        })
    }
}