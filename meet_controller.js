chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	var icon = chrome.runtime.getURL('mute.png'); // default icon for notification
	var message = 'Could not locate Mute control in Google Meeting.'; // default notification message

	// find mute or unmute button on this Meeting page. only one of these will exist at a time
	const muteButton = document.querySelector("[aria-label*='Turn off microphone']");
	const unmuteButton = document.querySelector("[aria-label*='Turn on microphone']");

	// function for muting
	const mute = () => {
		const btn = muteButton;
		if (btn !== null) {
			btn.click();
			message = 'Microphone is OFF';
			icon = chrome.runtime.getURL('mute.png');
			sendResponse({
				notification: {
					type: 'basic',
					iconUrl: icon,
					title: message,
					message: ''
				}
			});
		} else {
			//send empty response
			sendResponse({});
		}
	};

	const unmute = () => {
		const btn = unmuteButton;
		if (btn !== null) {
			btn.click();
			message = 'Microphone is ON';
			icon = chrome.runtime.getURL('unmute.png');
			sendResponse({
				notification: {
					type: 'basic',
					iconUrl: icon,
					title: message,
					message: ''
				}
			});
		} else {
			//send empty response
			sendResponse({});
		}
	};

	if (request.command === 'toggle') {
		if (muteButton !== null) {
			// if the mute button exists, then the Mic is currently unmuted.
			mute();
		} else {
			// ... and vice-versa.
			unmute();
		}
	}
});
