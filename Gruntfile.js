module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			dist: {
				src: [
					'public/javascripts/*.js'
				],
				dest: 'public/javascripts/build/script.js'
			}
		},
		uglify: {
			build: {
				src: 'public/javascripts/build/script.js',
				dest: 'public/javascripts/build/script.min.js'
			}
		},
		watch: {
    		scripts: {
        	files: ['public/javascripts/*.js'],
        	tasks: ['concat', 'uglify'],
       		options: {
            		spawn: false
       			 }
    		}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['concat', 'uglify']);
};