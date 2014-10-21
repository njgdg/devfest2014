/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n */',
    // Task configuration.
    concat: {
      js: {
        src: ['temp/md5.min.js', 'devfest/lib/jquery-2.1.0.min.js', 'devfest/bs3/js/bootstrap.min.js','temp/sngame-<%= pkg.version %>.min.js'],
        dest: 'build/all.js'
      },
    },
    uglify: {
      js: {
        files:{
          'temp/sngame-<%=pkg.version%>.min.js' : 'devfest/sngame.js',
          'temp/md5.min.js' : 'devfest/lib/md5.js'
        }
      }
    },
    cssmin: {
      minify: {
        src: ['devfest/index.css'],
        dest: 'temp/index-<%=pkg.version%>.min.css'
      }
    },
    jshint: {
      options: {
        jshintrc : true
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src : ['devfest/**/*.js']
      }
    },
    processhtml: {
      dist: {
        files: {
          'build/index.html' : 'devfest/index.html'
        }
      }
    },
    watch: {
      livereload: {
        options: {livereload: true},
        files: ['devfest/**/*.js', 'devfest/index.html', 'devfest/**/*.less'],
        tasks: ['less:development']
      }
    },
    connect: {
      server:{
        options : {
          hostname : '*',
          port : 1377,
          debug : true,
          livereload : true
        }
      }
    },
    less: {
      development: {
        path : 'devfest/styles/',
        files: {
          "devfest/styles/style.css": "devfest/styles/style.less"
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit', 'concat', 'uglify']);
  grunt.registerTask('dev', ['connect', 'watch']);

  grunt.registerTask('build', ['uglify', 'cssmin', 'concat', 'processhtml']);
};