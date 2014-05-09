module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    app: {
      src: "src",
      dist: "dist",
      temp: ".temp",
    },

    clean: {
      dist: [
        "<%= app.dist %>/"
      ],
    },

    uglify: {
      vendor: {
        options: {
          report: "min",
          preserveComments: false,
          mangle: false
        },
        files: [{
          expand: true,
          cwd: "js/",
          src: ["**/*.js"],
          dest: "js/",
          ext: ".min.js"
        }]
      }
    },

    connect: {
      options: {
        port: 9999,
        protocol: "http",
        hostname: "localhost",
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            "/"
          ]
        }
      }
    },

    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },
      // less: {
      //   options: {
      //     livereload: false
      //   },
      //   files: [
      //     "<%= app.src %>/less/**/*.less",
      //   ],
      //   tasks: ["less:dev"]
      // },
      css: {
        options: {
          livereload: true
        },
        files: [
          "css/**/*.css"
        ]
      },
      livereload: {
        options: {
          livereload: "<%= connect.options.livereload %>"
        },
        files: [
          "index.html",
          "images/**/*.{png,jpg,jpeg,gif,webp,svg}"
        ]
      }
    },
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-ngmin");
  grunt.loadNpmTasks("grunt-newer");
  grunt.loadNpmTasks("grunt-concurrent");
  grunt.loadNpmTasks("grunt-docular");
};
