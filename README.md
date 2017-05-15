Image Uploader without File Browser for CKEditor
=================================================
This is a simple plugin that replaces the built-in
image function in CKEditor. This plugin tries to 
build CKEditor's image function in Microsoft Word 
style. You can save the image directly to your server 
without CKFinder or other file browser. 

Installation and Configuration
-------------------------------------------------
### Front-end configuration
Clone the folder into the plugin folder in CKEditor.
Then, activate the plugins by adding extraPlugins
either in the following way.
#### In-Page
```javascript
CKEDITOR.replace( 'editor1', {
  extraPlugins: 'imageUploader'
});
``` 
#### In config.js
```javascript
CKEDITOR.editorConfig(function(config) {
  config.extraPlugins = 'imageUploader';
};
``` 

After activating the plugin, you need to specify the
URL to your server for handling the upload request.
```javascript
CKEDITOR.editorConfig(function(config) {
  config.uploadUrl = 'TO/YOUR/PATH';
};
```

The plugins will automatically replace the built-in
image function. 

### Back-end configuration
You need to handle the request in server and send
back the typical upload response.

Here is the sample code for NodeJS server.
```javascript
var multer = require('multer');
upload = multer({ storage: destination });

router.post('TO/YOUR/PATH', upload.any(), function(req, res) {
	// Some operation
	res.send({
		"uploaded": 1,
    	"fileName": "IMAGE.PNG",
    	"url": "PATH/TO/IMAGE"
	})
})
```

Support
----------------------------------------------------
If you have any questions, please contact me.

License
----------------------------------------------------
This plugin is licensed under the MIT license: 
http://en.wikipedia.org/wiki/MIT_License

Copyright © 2017 by Ryan Siu

