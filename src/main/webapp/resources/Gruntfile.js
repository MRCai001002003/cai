module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        htmlmin: {
            options: {
                //删除HTML注释
                removeComments: true,
                //删除<script>和<style>标签内的HTML注释
                removeCommentsFromCDATA: true,
                //删除文档树中文本节点的空白。不会影响重大的空白，比如在SCRIPT,STYLE,PRE或TEXTAREA等元素内容。
                collapseWhitespace: true,
                //删除布尔属性
                collapseBooleanAttributes: true,
                //删除属性的引号，当安全的情况下。
                removeAttributeQuotes: true,
                //删除多余的属性，像type="text/javascript"@@@请勿开启。
                removeRedundantAttributes: false,
                //用短的HTML5的<!DOCTYPE html>代替doctype
                useShortDoctype: true,
                //删除空（或空白）属性
                removeEmptyAttributes: true,
                //一些元素允许省略标签，像</td>
                removeOptionalTags: true
            },
            tpl: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.html'],
                    dest: 'dist/',
                    ext: '.html'
                }]
            }
        },
        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: './src/library/',
                    src: '**/*',
                    dest: './dist/library/'
                }]
            }
        },
        requirejs: {
            compile: {
                options: {
                    paths: {
                        'jquery': 'empty:',
                        'angular': 'empty:',
                        'ui.tree': 'empty:',
                        'ui.router': 'empty:',
                        'angular.animate': 'empty:',
                        'bootstrap': 'empty:',
                        'jquery.validate': 'empty:'
                    },
                    shim: {
                        'angular': {
                            deps: ['jquery'],
                            exports: 'angular'
                        },
                        'ui.router': ['angular'],
                        'ui.tree': ['angular'],
                        'angular.animate': ['angular'],
                        'bootstrap': ['jquery'],
                        'angular.validate': ['angular'],
                        'jquery.validate': ['jquery']
                    },
                    baseUrl: './',
                    dir: 'dist',
                    appDir: 'src',
                    keepBuildDir: true,
                    modules: [{
                        name: 'editor'
                    },{
                        name: 'render'
                    }],
                    fileExclusionRegExp: /^library/
                }
            },
            build: {
                options: {
                    paths: {
                        'jquery': 'library/jquery/dist/jquery.min',
                        'angular': 'library/angular/angular.min',
                        'ui.router': 'library/angular-ui-router/release/angular-ui-router.min',
                        'angular.animate': 'library/angular-animate/angular-animate.min',
                        'ui.tree': 'library/angular-ui-tree/dist/angular-ui-tree.min',
                        'bootstrap': 'library/bootstrap/dist/js/bootstrap.min',
                        'jquery.validate': 'library/jquery-validation/dist/jquery.validate.min'
                    },
                    shim: {
                        'angular': {
                            deps: ['jquery'],
                            exports: 'angular'
                        },
                        'ui.router': ['angular'],
                        'ui.tree': ['angular'],
                        'angular.animate': ['angular'],
                        'bootstrap': ['jquery'],
                        'angular.validate': ['angular'],
                        'jquery.validate': ['jquery']
                    },
                    onBuildWrite: function(moduleName, path, contents) {
                        return contents.replace(/src\//g, 'dist/');
                    },
                    keepBuildDir: true,
                    include: ['src/app'],
                    out: 'dist/app.js'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');


    grunt.registerTask('default', ['requirejs:compile'])
    grunt.registerTask('build', ['requirejs:build', 'htmlmin'])
}
