'use strict';

hexo.extend.tag.register('plantuml', function(args, content){
        var plantuml = require('./plantuml');
        content = plantuml.compress(content);
        return "<img  src="+content+">";
},{ends: true});
