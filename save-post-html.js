fs = require('fs')

const savePost = async (req, res) => {
    // https://nodejs.org/en/knowledge/file-system/how-to-write-files-in-nodejs/
    if (req.body.content) {
        fs.writeFile('./posts/first.html', req.body.content, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('twas written');
            }
        });
    }
}

module.exports = {
    savePost
}