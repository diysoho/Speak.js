![Stewie Griffin](https://media.giphy.com/media/HCK7W8Qb52ifS/giphy.gif)

# Speak.js
Allowing easy text to speech using Web Speech API. 
###### Speech Synthesis API is available on the following browsers: <br/> Edge 14+, Firefox 52+, Chrome 33+, Opera 27+,  Safari 7+, Chrome for Android 62, Samsung Internet 5, QQ Browser 1.2

### What does this do? 
This javascript plugin allows you to take advantage of the speech capabilities of a web browser to speak written text (text-to-speech) out loud, this can be used to add a spoken narrative to your web game, give a more immersive experience to your web-app, build your own assistant or add accessibility to your site.

### Setting Speak up in your Project
This plugin does **not** require jQuery in order to work, simply include `speak.js` in your html file(s).

### Parameters

You can set the following speech parameters in Speech.



| Parameter        | Type   | Default | Note |
| ---------------- |:------:|:-----:|--------|
| voice            | string | false | Use `getVoices()` to return a list of available voices. |
| pitch            | int    | 100   | This value is a percentage |
| rate             | int    | 100   | This value is a percentage |
| volume           | int    | 100   | This value is a percentage |

#### Set and Get Parameters

```javascript
  speak.setPitch(100);
  speak.getPitch(); //Returns 100;
  
  // You can also chain functions when setting like so:
  
  speak.setPitch(50).setRate(55).setVolume(60);
  
  speak.getVoices(); // Returns array.
  speak.setVoice('Daniel');
  
```

### Let's Talk

> say({string|object}, {function->callback}, {string->event}); 

```javascript
  //Voice available in Google Chrome, will default to first option in none supported browsers.
  speak.setVoice('Google UK English Female');
  speak.say('Hello World.');
  
  // Again, we can chain:
  speak.say('Hello World.').say('How are you?');
  
```

We can specify a callback on a particular event: <br/>`onend`, `onboundary`, `onerror`, `onmark`, `onstart` and `onpause`.

Let's say we wanted to add a class upon speaking we would do:

```javascript
  speak.say('I will now add a class to the body', function() { 
    $('body').addClass('new_class'); 
  }, 'onstart');
```

If we wanted to chain multiple speech outputs that has different voices, pitches, events and delays then we would pass an object to the `say()` function like so:

```javascript
speak.say(
  [
    {
      text: 'Two plus two is four, minus three is one quick maff.', 
      pitch: 5,
	  rate: 120, 
      voice: 'Alex',
      callback: function(e) { console.log(e); }, 
      event: 'onstart' 
    },
    {
      text: 'Take off your jacket, mans not hot.', 
      pitch: 100,
      volume: 60,
      delay: 3000, //ms
      voice: 'Google UK English Female',
      callback: function(e) { alert('Done!'); }, 
      event: 'onend' 
    }
  ]
);

```

## Fin.
If you like this repo then follow me on twitter @jakebown1


