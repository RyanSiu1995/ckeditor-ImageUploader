CKEDITOR.plugins.add( 'imageCustomUploader', {
    init: function( editor ) {
        var fileDialog = $('<input type="file">');
        
        fileDialog.on('change', function (e) {
            var fileTools = CKEDITOR.fileTools,
                uploadUrl = fileTools.getUploadUrl( editor.config, 'image' ),
                file = e.target.files[0],
                loader = editor.uploadRepository.create(file),
                reader = new FileReader(),
                img;
            
            // verify
            if (!/image/i.test(file.type)) {
                editor.showNotification( 'Please select the correct picture format.', 'warning' );
                return false
            }
            
            loader.upload(uploadUrl);

            // preview image
            reader.readAsDataURL(e.target.files[0]);

            reader.onload = function (e) {
                img = editor.document.createElement('img');
                img.setAttribute('src', e.target.result);
                img.setStyle('opacity', 0.3);
                editor.insertElement(img);
            }

            loader.on('uploaded', function(evt) {
                editor.widgets.initOn(img, 'image', {
                    src: evt.sender.url
                });

                img.setStyle('opacity', 1);
            });

            loader.on('error', function() {
                img.remove()
            });

            fileTools.bindNotifications(editor, loader);
            
            // empty input
            fileDialog[0].value = "";
        });

        editor.ui.addButton( 'Image', {
            label: 'Insert Image',
            command: 'openDialog',
            toolbar: 'insert'
        });

        editor.addCommand('openDialog', {
            exec: function(editor) {
                fileDialog.click();
            }
        });
    }
});
