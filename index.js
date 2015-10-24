'use strict';

var request = require('request');
var Promise = require('bluebird');
var plantuml = require('./plantuml');


hexo.extend.tag.register('plantuml', function(args, content){
    return new Promise(function (resolve, reject) {
        var plantumlSvgUrl = plantuml.compress(content);
        request(plantumlSvgUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body)
            }
        })
    }).then(function (data) {
            return '<img src="data:image/svg+xml;utf8,'+encodeURIComponent(data)+'">';
        });

},{ends: true, async:true});
