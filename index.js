'use strict';

var request = require('request');
var Promise = require('bluebird');
var plantuml = require('./plantuml');
var assign = require('object-assign');

hexo.config.tag_plantuml = assign({
    type:'static', // static | dynamic
    format: 'svg' // svn | png
}, hexo.config.tag_plantuml);

hexo.extend.tag.register('plantuml', function(args, content){
    return new Promise(function (resolve, reject) {
        var plantumlSvgUrl = plantuml.compress(content);
        if(hexo.config.tag_plantuml.type==='static') {
            request(plantumlSvgUrl, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve('<img src="data:image/svg+xml;utf8,'+encodeURIComponent(body)+'">');

                }
            });
        } else {
            resolve('<img src="'+plantumlSvgUrl+'">');
        }
    }).then(function (data) {
            return data;
        });

},{ends: true, async:true});
