/**
 * jQuery Maven Artifact Plugin
 *
 * Version: 2.0.0
 * Author: Jake Wharton
 * License: Apache 2.0
 */
(function($) {
  var defaults = {
    'packaging': 'jar'
  };

  function downloadUrl(config, version) {
    var groupPath = config.groupId.replace(/\./g, '/');
    var url = 'https://repo1.maven.org/maven2/' + groupPath + '/' + config.artifactId + '/' + version + '/' + config.artifactId + '-' + version;
    if (typeof(config.classifier) !== 'undefined') {
      url += '-' + config.classifier;
    }
    url += '.' + config.packaging;
    return url;
  }

  function queryBuilder(config) {
    var propertiesToQuery = {
      'groupId': 'g',
      'artifactId': 'a',
      'packaging': 'p',
      'classifier': 'l'
    };
    var query = '';
    for (var property in propertiesToQuery) {
      if (propertiesToQuery.hasOwnProperty(property) && config.hasOwnProperty(property)) {
        if (query !== '') {
          query += '+AND+';
        }
        query += propertiesToQuery[property] + ':"' + config[property] + '"';
      }
    }
    return query;
  }

  $.fn.artifactVersion = function(config, callback) {
    if (typeof(config) === 'undefined') {
      alert('Error: config object is required.');
      return;
    }
    if (typeof(callback) === 'undefined') {
      alert('Error: callback function required.');
      return;
    }
    var config = $.extend({}, defaults, config);

    var url = 'https://search.maven.org/solrsearch/select/?q=' + queryBuilder(config) + '&wt=json&json.wrf=?';
    $.getJSON(url, function(response) {
      var versions = response.response.docs;
      if (versions.length == 0) {
        return;
      }

      var version = versions[0].latestVersion || versions[0].v;
      var versionUrl = downloadUrl(config, version);
      callback(version, versionUrl);
    });
  };

  $.fn.artifactVersions = function(config, callback) {
    if (typeof(config) === 'undefined') {
      alert('Error: config object is required.');
      return;
    }
    if (typeof(callback) === 'undefined') {
      alert('Error: callback function required.');
      return;
    }
    var config = $.extend({}, defaults, config);

    var url = 'https://search.maven.org/solrsearch/select/?q=' + queryBuilder(config) + '&wt=json&rows=10&core=gav&json.wrf=?';
    $.getJSON(url, function(response) {
      var versions = response.response.docs;
      if (versions.length == 0) {
        return;
      }
      versions.sort(function(o1, o2) {
        return o1.v > o2.v ? -1 : 1;
      });
      var newVersions = [];
      for (var i = 0; i < versions.length; i++) {
        var version = versions[i].v;
        newVersions.push({
          name: version,
          url: downloadUrl(config, version)
        });
      }
      callback(newVersions);
    });
  }
})(jQuery);
