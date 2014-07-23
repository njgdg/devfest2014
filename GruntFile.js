module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n */',
    
    processhtml: {
      dist: {
        files: {
          'build/index.html': 'src/index.html',
          'build/about.html': 'src/about.html',
          'build/guests.html': 'src/guests.html',
          'build/join.html': 'src/join.html',
          'build/schedule.html': 'src/schedule.html'
        }
      }
    },
    copy: {
      main: {
        files : [
          {expand : true, src : ['img/**', 'style/**', 'script/**'], cwd : 'src/',dest : 'build/'}
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build', ['copy', 'processhtml']);
};