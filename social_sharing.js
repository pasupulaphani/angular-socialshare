
angular.module('socialSharing', [])


function loadSdkAsync(id, src) {
    // Load the SDK asynchronously
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
            console.warn("Skipping: Resource with id: " + id + " exists")
        }
        js = d.createElement(s);
        js.id = id;
        js.src = src;
        js.async = true;
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', id));
}