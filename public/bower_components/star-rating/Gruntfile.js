module.exports = function(grunt) {

    grunt.initConfig({
        'connect': {
            demo: {
                options: {
                    open: true,
                    keepalive: true
                }
            }
        },
        'gh-pages': {
            options: {
                clone: 'bower_components/my-repo'
            },
            src: [
                'bower_components/**/*',
                '!bower_components/my-repo/**/*',
<<<<<<< HEAD
                'demo/*', 'src/*', 'index.html'
=======
                'demo/*', 'src/**/*', 'index.html'
>>>>>>> f34c6624e7e49efd6b5926b09f587b0a146f9079
            ]
        },
        'replace': {
            example: {
                src: ['src/**/*.html'],
                dest: 'dist/',
                replacements: [{
                    from: 'bower_components',
                    to: '..'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-text-replace');

    grunt.registerTask('build',  ['replace']);
    grunt.registerTask('deploy', ['gh-pages']);
    grunt.registerTask('server', ['connect']);

};
