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
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('default',['concat']);
};