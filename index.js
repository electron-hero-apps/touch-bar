/*jshint esversion: 6 */
/*jshint asi: true */
const path = require("path");

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
    TouchBarGroup,
	TouchBarSlider,
	TouchBarScrubber,
	TouchBarSegmentedControl,
	TouchBarPopover
} = TouchBar
const {
	systemPreferences
} = require('electron').remote

let currentWindow

const button1 = new TouchBarButton({
	label: 'One',
	icon: path.join(__dirname , "close_x.png"),
	iconPosition: 'left'

})

const authButton = new TouchBarButton({
	label: 'Authorize',
	click: function(){
		systemPreferences.promptTouchID('To get consent for a Security-Gated Thing').then(success => {
		  console.log('You have successfully authenticated with Touch ID!')
		}).catch(err => {
		  console.log(err)
		})
	}
})

const segmentedTouchBar = new TouchBarButton({
	label: 'Segmented',
	click: function(){

		const seg = new TouchBar({
			items: [
				esc,
				new TouchBarLabel({label:'Travel Mode', textColor:'#00FDFF'}),
				segmentedControl
			]
		})
		currentWindow.setTouchBar(seg);
	}
})


const button3 = new TouchBarButton({
	label: 'Three'
})

const button4 = new TouchBarButton({
	label: 'One'
})

const esc = new TouchBarButton({
	label: 'Esc',
	click: function(){
		currentWindow.setTouchBar(mainTouchBar);
	}

})

// const popoverTouchBar = new TouchBar({
// 	escapeItem: esc,
// 	items:[
// 		button2, button3, button4
// 	]
// })

const colorPicker = new TouchBarColorPicker({
	change: (val) => {
		console.log('color pick');
		console.log(val);
	}
})

let slider1 = new TouchBarSlider({
	label: "Volume",
	change: function(val){
		console.log('something changed')
		slider1.label = val.toString();
	}
})
let slider2 = new TouchBarSlider({
	label: "Volume",
	change: function(val){
		console.log('something changed')
		slider2.label = val.toString();
	}
})
let slider3 = new TouchBarSlider({
	label: "Volume",
	change: function(val){
		console.log('something changed')
		slider3.label = val.toString();
	}
})

// const popoverTouchBar = new TouchBarPopover({
// 	showCloseButton: true,
// 	label: 'Click Me',
// 	items:[
// 		button2, button3, button4
// 	]
// })

const adjustVolume = new TouchBarButton({
	label: 'Volume',
	click: function(){

		const volumeControl = new TouchBar({
			items: [
				esc,
				slider1,
				slider2,
				slider3
			]
		})

		currentWindow.setTouchBar(volumeControl);
	}
})


const popover1 = new TouchBarButton({
	label: "pop 1",
	click: function(){
		let currentWindow = remote.getCurrentWindow();
		currentWindow.setTouchBar(touchBarPopover);
	}
})




const segmentedControl = new TouchBarSegmentedControl({
	segments: [{
		label: "Walk",
		// icon: path.join(__dirname , "close_x.png")
	},{
		label: "Drive",
		// icon: path.join(__dirname , "close_x.png")
	},{
		label: "Transit",
		// icon: path.join(__dirname , "close_x.png")
	}]
});

const mainTouchBar = new TouchBar({
	escapeItem: esc,
    items: [
		button1,
		adjustVolume,
		colorPicker,
		authButton,
		segmentedTouchBar,
		new TouchBarPopover({
			label:'Popover',
			showCloseButton:true,
			items: new TouchBar({
				items: [
					new TouchBarButton({ label: 'pop1' }),
					new TouchBarButton({ label: 'pop2' }),
					segmentedControl
				]
			})
		})

	]
})

// const topLevelGroup = new TouchBarGroup({
// 	items:[
//        button1
//     ]
// })



setTimeout(function() {
	currentWindow = remote.getCurrentWindow();
	console.log('before touch');
	currentWindow.setTouchBar(mainTouchBar);
}, 1000)
