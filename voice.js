	/*
	 * @name 	voice.js
	 * @author 	Jake Bown <jakebown@gmail.com>
	 * @url 	jakebown.com
	 * @github 	github.com/jakerb
	 */

	var speak = {

		getVoices:function() {
			var that = this;
			return speechSynthesis.getVoices();
		}, 

		setVoice:function($voice_name) {
			var that = this;
			that.voice = $voice_name;
			return that;
		},

		setPitch:function($pitch_percentage) {
			var that = this;
			that.pitch = $pitch_percentage;
			return that;
		},

		getPitch:function() {
			var that = this;
			return that.pitch;
		},

		setVolume:function($volume_percentage) {
			var that = this;
			that.volume = $volume_percentage;
			return that;
		},

		getVolume:function() {
			var that = this;
			return that.volume;
		},

		setRate:function($rate_percentage) {
			var that = this;
			that.rate = $rate_percentage;
			return that;
		},

		getRate:function() {
			var that = this;
			return that.rate;
		},

		_isset:function($variable) {
			return typeof($variable) != "undefined" && $variable !== null;
		},

		_utterObject:function($object) {
			var that = this;
				
			$object.forEach(function(props, index) {

				let announcer 	= new SpeechSynthesisUtterance();
				let delay 		= that._isset(props.delay) 		? props.delay : 0;
				let rate 		= that._isset(props.rate) 		? props.rate : that.getRate();
				let volume 		= that._isset(props.volume) 	? props.volume : that.getVolume();
				let pitch 		= that._isset(props.pitch) 		? props.pitch : that.getPitch();
				let callback 	= that._isset(props.callback) 	? props.callback : that.callback;
				let event 		= that._isset(props.event) 		? props.event : that.events[0];
				let voice 		= that._isset(props.voice) 		? props.voice : that.getVoice();
				let string 		= that._isset(props.text) 		? props.text : '';


				if(typeof callback == 'function') { 
					announcer[event] = callback;
				}

				that.setVoice(voice);

				announcer.pitch 	= pitch/100;
				announcer.rate 		= rate/100;
				announcer.volume 	= volume/100;
				announcer.voice 	= that.getVoice();
				announcer.text 		= string;

				announcer[event] = callback;

				setTimeout(function() {	
					window.speechSynthesis.speak(announcer);
				}, delay);
			});

			return that;

		},

		_utter:function($string, $callback, $event) {
			var that = this;
			
			let announcer 		= new SpeechSynthesisUtterance();

			announcer.pitch 	= that.getPitch()/100;
			announcer.rate 		= that.getRate()/100;
			announcer.volume 	= that.getVolume()/100;
			announcer.voice 	= that.getVoice();
			announcer.text 		= $string;

			if(typeof $callback == 'function') { 
				announcer[$event] = $callback;
			}

			window.speechSynthesis.speak(announcer);

			return that;
		},

		say:function($string, $callback, $event) {
			var that = this;

			if(!that.supported) {
				return false;
			}

			$event = typeof that.events[$event] !== 'undefined' ? $event : that.events[0];
			$callback = $callback || that.callback;


			if(typeof $string == 'object') {
				that._utterObject($string);
			} else {
				that._utter($string, $callback, $event);
			}
			

			return that;

		},

		loadVoiceListener:function() {
			var that = this;

			if(!that.supported) {
				return false;
			}

			var voices = that.getVoices();

			if (voices.length !== 0) {
				that.voices = voices;
			} else {
				setTimeout(function() {
					that.loadVoiceListener();
				}, 10);
			}
		},

		getVoice:function($voice_name) {
			var that = this;

			if(typeof that.voices == 'undefined') {
				return that.voice ? that.voice : false;
			}

			var chosen_voice = that.voice ? that.voice : that.voices[0];

			if(that.voice && !$voice_name) {
				$voice_name = that.voice;
			}

			that.voices.forEach(function(voice, index) {
				if(voice.name == $voice_name) {
					chosen_voice = voice;
				}
			});

			return chosen_voice;
		}



	};

	// Default variables.
	speak.supported 	= false;
	speak.voice 		= false;
	speak.pitch 		= 100;
	speak.volume 		= 100;
	speak.rate 			= 100;

	// Callback events.
	speak.events = [
		'onend',
		'onboundary',
		'onerror',
		'onmark',
		'onstart',
		'onpause'
	];

	// Default callback.
	speak.callback = function() {};

	// Is Speech Supported?
	if ('speechSynthesis' in window) {
		speak.supported = true;
		speak.loadVoiceListener();
	} else {
		console.warn('Voice is not compatible.');
	}