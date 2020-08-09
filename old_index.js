/*jshint esversion: 6 */
/*jshint asi: true */

const {
	remote
} = require('electron');
const {
	app,
	BrowserWindow,
	TouchBar
} = require('electron').remote
const {
	TouchBarLabel,
	TouchBarButton,
	TouchBarSpacer,
	TouchBarColorPicker,
	TouchBarSlider,
	TouchBarScrubber
} = TouchBar
const {
	systemPreferences
} = require('electron').remote


// const scrubber1 = new ScrubberItem({
// 	label: "One"
// })
// const scrubber2 = new ScrubberItem({
// 	label: "Two"
// })
// const scrubber3 = new ScrubberItem({
// 	label: "Three"
// })

const scrubber = new TouchBarScrubber({
    selectedStyle: 'outline',
    showArrowButtons: 'true',
    select: function(index){
		console.log('selected a scrubber item')
        console.log(index);
    },
    mode: 'fixed',
	items: [{
		label: "One"
	}, {
		label: "Two"
	}, {
		label: "Three"
	}]
})



const colorPicker = new TouchBarColorPicker({
	change: (val) => {
		console.log('color pick');
		console.log(val);
	}
})

const closeSlider = new TouchBarButton({
	label: 'Close',
	click: () => {}
})

const slider = new TouchBarSlider({
	label: "Select Value",
	change: (val) => {
		console.log('slider change');
		console.log(val);
	}
})


const touchBar = new TouchBar({
	items: [
		colorPicker,
		//     closeSlider,
		//     slider
		scrubber
	]
})


//console.log(touchBar)


setTimeout(function() {
	let currentWindow = remote.getCurrentWindow();
	console.log('before touch');
	currentWindow.setTouchBar(touchBar);


	//     systemPreferences.promptTouchID('To get consent for a Security-Gated Thing').then(success => {
	//       console.log('You have successfully authenticated with Touch ID!')
	//     }).catch(err => {
	//       console.log(err)
	//     })    



}, 1000)