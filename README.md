[![Build Status](https://secure.travis-ci.org/pasupulaphani/angular-socialsharing.png?branch=master)](http://travis-ci.org/pasupulaphani/angular-socialsharing)
[![npm version](http://img.shields.io/npm/v/angular-socialsharing.svg)](https://npmjs.org/package/angular-socialsharing)
[![bower version](http://img.shields.io/bower/v/angular-socialsharing.svg)](https://npmjs.org/package/angular-socialsharing) [![Hex.pm](http://img.shields.io/hexpm/l/plug.svg)]()
[![Code Climate](https://codeclimate.com/github/pasupulaphani/angular-socialsharing/badges/gpa.svg)](https://codeclimate.com/github/pasupulaphani/angular-socialsharing)
[![Test Coverage](https://codeclimate.com/github/pasupulaphani/angular-socialsharing/badges/coverage.svg)](https://codeclimate.com/github/pasupulaphani/angular-socialsharing)

Angular Social Sharing
=========
> This is a small library that lets you share info and links on social networks. Currently [Facebook feed](https://developers.facebook.com/docs/sharing/reference/feed-dialog/v2.2) and [Twitter intents](https://dev.twitter.com/web/intents) are supported.

WHAT GOOD DOES THIS LIBRARY DO:
* Sharing URLs with (#)fragment identifier
* Ease things if u are using Facebook Feed Dialog
  - Facebook Feed Dialog vs. Share Link Dialog is explained [here](http://www.local-pc-guy.com/web-dev/facebook-feed-dialog-vs-share-link-dialog)

Demo
------
[Check it out](http://pasupulaphani.github.io/angular-socialsharing/#/demo)

Getting Started
-----
Install the library through bower or npm.
```js
bower install angular-socialsharing
```

Add it to your app dependency
```js
angular.module('myModule',['socialsharing'])
```

## Usage
```js
angular.module('myModule',['socialsharing'])
  .config(
    function($fbProvider, $twtProvider) {
      $fbProvider.init(APPID);
      $twtProvider.init()
        .trimText(true);
   })
  .controller('MyCtrl',
    function($fb, $twt) {
      $fb.feed({
        name: "Link name",
        description: "Awesome desc",
        caption: "mylink",
        link: "http://www.phaninder.com",
        picture: "http://static.phaninder.com/me.png"
      });
      $twt.intent('tweet', {
        text : 'Adventures at NodeCoptor',
        url  : 'http://www.phaninder.com/posts/adventures-at-nodecoptor/',
        hashtags : 'phaninder.com'
      });
    });
```


Share on Facebook
-----
This uses Facebook Feed Dialog to share/post. Feed Dialog lets you get very specific about how you want your share to appear.

##### Set up : Initialization required (if not already initialized)

Initializing will automatically loads Facebook SDK for JavaScript asynchronously if it hasn't been loaded.

Facebook Feed uses facebook API which requires us to provide a APPID. Register a facebook app and Configure the APPID in your application.

> Provider: **$fbProvider**
>> Method: **init**


```js
angular.module('myModule',['socialsharing']).config(
   function($fbProvider) {
       $fbProvider.init(APPID, {
           locale : myLocale,
           channel: myChannel
       });
   });
```


| Params  | Value    | Description        |  Mandatory  |
| ------- | -------- | -------------------|-------------|
| APPID   | Number   | Facebook app ID    |  Yes        |
| locale  | String   | Defaults to **en_US** if unspecified |  No |
| channel | String   | Defaults to **app/channel.html** if unspecified | No |


### Usage

This is a provider, it can be dependency injected to any angular service, factory, controller, provider ...

**$fb API** :

*Methods*: feed, parse

### $fb.feed

> Method : feed
>> Parameters : https://developers.facebook.com/docs/sharing/reference/feed-dialog/v2.2#jssdk

```js
angular.controller('MyCtrl',
    function($fb) {
.....
        $fb.feed({
            name: "Scientists Teach Chimpanzee To Conduct 3-Year Study On Primates",
            description: "Scientific community has hailed as a breakthrough achievement, zoologists have succeeded for the first time ever in training a chimpanzee to carry out a rigorous three-year study of primate behavior.",
            caption: "analyze in-depth data charts on chimpanzee behavior.",
            link: "http://www.theonion.com/articles/scientists-teach-chimpanzee-to-conduct-3year-study,29195/",
            picture: "http://o.onionstatic.com/images/17/17760/16x9/700.jpg?7494"
        });
.....
    });
```


##### Result
![alt tag](https://github.com/pasupulaphani/angular-socialsharing/blob/master/static/fbFeed.png?raw=true)

### $fb.parse

> Method : parse
This utility renders XFBML markup in a document. Useful when FB sdk fails to render share, like buttons on angular templates.

```js
angular.controller('MyCtrl',
    function($fb) {
.....
        $fb.parse(angular.element('#someId'));
.....
    });
```


##### Note
- It is good to ensure FB.init hasn't been already called before you initialize this.
- Using this doesn't disturb window variable FB created by the API. It will be accessible with window.FB and $window.FB (in angular)


Share on Twitter
-----
This uses Twitter web Intent to tweet, retweet, ... This lets you get very specific about how you want your share to appear.


##### Initialization required

Initializing will automatically loads Twitter sdk for JavaScript asynchronously if it hasn't been loaded.

##### Enable utilities (optional)

This library provides an optional functionality(utility) to trim text (if exceeds the tweet char limit 140).

These functionalities can be configured.

> Provider: **$twtProvider**
>> Method: **trimText**


```js
angular.module('myModule',['socialsharing']).config(
   function($twtProvider) {
       $twtProvider.init()
        .trimText(true);
   });
```


**trimText**:
- Disabled by default.
- Trims text if the share content exceeds 140 charecters.
- This appends the '...' to show that text has been trimmed.

*Shortening url* : [t.co](https://support.twitter.com/articles/109623), a twitter service automatically shortens url for you.

#### Usage

This is a provider, it can be dependency injected to any angular service, factory, controller, provider ...


**$twt API** :
> Methods : intent
>> Parameters :


| Params  | Value | Description                          |  Mandatory  | Default |
| ------- | ------| -------------------------------------|--------|--------|
| type    | String| [tweet\|retweet\|favourite\|user\|follow] | No | tweet |
| Params  | JSON  | Depends on the type. Refer: [Web Intents][], [Tweet Parameters][] | Yes | |

[Web Intents]: https://dev.twitter.com/web/intents
[Tweet Parameters]: https://dev.twitter.com/web/tweet-button/parameters

```js
angular.controller('MyCtrl',
    function($twt) {
.....
        $twt.intent('tweet', {
            text : 'Adventures at NodeCoptor',
            url  : 'http://www.phaninder.com/posts/adventures-at-nodecoptor/',
            hashtags : 'phaninder.com'
        });
.....
    });
```

##### Result
![alt tag](https://github.com/pasupulaphani/angular-socialsharing/blob/master/static/twtIntent.png?raw=true)

##### Note
- Using this doesn't disturb window variable twttr created by the API. It will be accessible with window.twttr and $window.twttr (in angular)

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Locations
- http://ngmodules.org/modules/angular-socialsharing
- http://pasupulaphani.github.io/angular-socialsharing/#/
- http://bower.io/search/?q=angular-socialsharing


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/pasupulaphani/angular-socialsharing/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
