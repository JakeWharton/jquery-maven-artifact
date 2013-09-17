jQuery Maven Artifact Plugin
============================

jQuery plugin which fetches the latest version of a Maven artifact from the central repos.



Examples
--------

Fetching latest version:

```javascript
$.fn.artifactVersion({
  'groupId': 'com.squareup',
  'artifactId': 'otto'
}, function(version, url) {
  $('.download').attr('href', url);
  $('.version').text('Version ' + version);
});
```

Fetching newest versions:

```javascript
$.fn.artifactVersions({
  'groupId': 'com.squareup.spoon',
  'artifactId': 'spoon-client'
}, function(versions) {
  $.each(versions, function() {
    $('.versions').append(
      $('&lt;li>').append(
        $('&lt;a>').attr('href', this.url).text(this.name)
      )
    );
  });
});
```

Fetching specific classifier:

```javascript
$.fn.artifactVersion({
  'groupId': 'com.squareup.okhttp',
  'artifactId': 'okhttp',
  'classifier': 'jar-with-dependencies'
}, function(version, url) {
  $('.download').attr('href', url);
  $('.version').text('Version ' + version);
});
```

Fetching specific packaging:

```javascript
$.fn.artifactVersion({
  'groupId': 'net.simonvt.messagebar',
  'artifactId': 'messagebar',
  'packaging': 'aar'
}, function(version, url) {
  $('.download').attr('href', url);
  $('.version').text('Version ' + version);
});
```



Compilation
-----------

Generating the minified version requires the `uglifyjs` binary to be on your PATH. You
can install this from `npm` if you have node.js on your system.

Running `make.sh` will minify the latest javascript.

If you are submitting a pull request, please be sure to run this script and include the
changes in your commit first.



License
-------

    Copyright 2013 Jake Wharton

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
