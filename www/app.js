// For any third party dependencies, like jQuery, place them in the lib folder.
// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.

requirejs.config({
    baseUrl: 'www/lib',
    paths: {
        app: '../app',
        jquery: ["https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min",
            'jquery'],
        swal: ['https://unpkg.com/sweetalert/dist/sweetalert.min'],
        methods: 'methods',
        json: 'json',
    }
});
// Start loading the main app file.

requirejs(['app/main']);