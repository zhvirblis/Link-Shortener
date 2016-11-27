module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			dist: {
				src: [
					'public/javascripts/*.js'
				],
				dest: 'public/javascripts/build.js'
			}
		},
		uglify: {
			build: {
				src: 'public/javascripts/build.js',
				dest: 'public/javascripts/build.min.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('default', ['concat', 'uglify']);
};