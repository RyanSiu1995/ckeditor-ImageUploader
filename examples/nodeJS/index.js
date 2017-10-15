var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	}
})
var upload = multer({storage:storage});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static('./'));

app.post('/imageURL', upload.any(), function(req, res) {
	res.send({
		"uploaded": 1,
		"fileName": req.files[0].filename,
		"url": req.files[0].path
	})
})

app.listen(8888, function() {
	console.log('Server is running on port 8888')
})