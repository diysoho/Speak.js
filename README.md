![Stewie Griffin](https://media.giphy.com/media/HCK7W8Qb52ifS/giphy.gif)

# Speak.js
Allowing easy text to speech using Web Speech API. 
###### Speech Synthesis API is available on the following browsers: <br/> Edge 14+, Firefox 52+, Chrome 33+, Opera 27+,  Safari 7+, Chrome for Android 62, Samsung Internet 5, QQ Browser 1.2

### What does this do? 
This javascript plugin allows you to take advantage of the speech capabilities of a web browser to speak written text (text-to-speech) out loud, this can be used to add a spoken narrative to your web game, give a more immersive experience to your web-app, build your own assistant or add accessibility to your site.

### Setting Speak up in your Project
This plugin does **not** require jQuery in order to work, simply include `speak.js` in your html file(s).

### Let's Talk

You can set the following speech parameters in Speech.



| Parameter        | Type   | Default | Note |
| ---------------- |:------:|:-----:|--------|
| voice            | string | false | Use `getVoices()` to return a list of available voices. |
| pitch            | int    | 100   | This value is a percentage |
| rate             | int    | 100   | This value is a percentage |
| volume           | int    | 100   | This value is a percentage |

#### Set and Get

```javascript
  speak.setPitch(100);
  speak.getPitch(); //Returns 100;
  
  // You can also chain function when setting like so:
  
  speak.setPitch(50).setRate(55).setVolume(60);
  
```
