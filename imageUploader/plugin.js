CKEDITOR.plugins.add( 'imageCustomUploader', {
    init: function( editor ) {
        var fileDialog = $('<input type="file">');
        
        fileDialog.on('change', function (e) {
            var fileTools = CKEDITOR.fileTools, uploadUrl = fileTools.getUploadUrl( editor.config, 'image' );
            var loader = editor.uploadRepository.create(e.target.files[0]);
            
            loader.upload(uploadUrl);
            loader.on('uploaded', function(evt) {
                var ele = editor.document.createElement('img');
                ele.setAttribute('src', evt.sender.url);
                editor.insertElement(ele);
                fileDialog[0].value = "";
            })
            fileTools.bindNotifications(editor, loader);
        })
        editor.ui.addButton( 'Image', {
            label: 'Insert Image',
            command: 'openDialog',
            toolbar: 'insert'
        });
        editor.addCommand('openDialog', {
            exec: function(editor) {
                fileDialog.click();
            }
        })
    }
});