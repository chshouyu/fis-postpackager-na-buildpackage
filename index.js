var path = require('path');

// 得到20150312083056这种时间格式
var getCurrtentDateTime = function() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var hour = d.getHours();
    var min = d.getMinutes();
    var sec = d.getSeconds();

    return ret = [year, month, day, hour, min, sec].join('~').replace(/~(\d)(?!\d)/g, '0$1').replace(/~/g, '');
};

var defaults = {
    id: +new Date(),
    version: '0.0.' + getCurrtentDateTime()
};

var extend = function(source, target) {

    var dupSource = fis.util.clone(source);

    for (var key in dupSource) {
        if (target && target[key]) {
            dupSource[key] = target[key];
        }
    }
    return dupSource;
};

var type = function(obj) {
    return Object.prototype.toString.call(obj).match(/^\[object\s(.+)\]$/)[1].toLowerCase();
};

var htmlPageFile = /^\/page\/(.+)\.html$/;

module.exports = function(ret, conf, settings, opt) {

    var config = extend(defaults, settings);
    var m;
    config.pages = [];
    
    fis.util.map(ret.src, function(subpath, file) {
        
        if (m = htmlPageFile.exec(subpath)) {
            if (!settings.ignoreFile || (type(settings.ignoreFile) === 'regexp' && !settings.ignoreFile.test(subpath))) {
                config.pages.push({
                    name: m[1],
                    file: subpath,
                    login: false
                });
            }
        }
    });

    fis.util.write(path.join(fis.project.getProjectPath(), opt.dest, 'config.json'), JSON.stringify(config, null, 4), 'utf8', false);    
};