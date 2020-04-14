//
// Code is MIT licensed; see https://www.coronalabs.com/links/code/license
//

window.plugin_vk_direct_js = 
{
	showInviteBox: function() {
		VK.callMethod("showInviteBox");
	},

	showRequestBox: function(user_id, message, request_key) {
		VK.callMethod("showRequestBox", user_id, message, request_key);
	},

	showShareBox: function(message, attachments, target) {
		VK.callMethod("showShareBox", message, attachments, target);
	},

	showSettingsBox: function(settings) {
		VK.callMethod("showSettingsBox", settings);
	},

	showOrderBox: function(type, item) {
		VK.callMethod("showOrderBox", {type: type, item: item} );
	},

	showLeaderboardBox: function(user_result) {
		VK.callMethod("showLeaderboardBox", user_result);
	},

	api: function(methodName, params) {
		VK.api(methodName, params, function(response) {
			plugin_vk_direct_js.callback({ name:"vk", api:true, method: methodName, data: response })
		});
	},

	init: function(callback) {
		LuaReleaseFunction(this.callback);
		this.callback = null;
		if(LuaIsFunction(callback)) {
			this.callback = LuaCreateFunction(callback);
		}
		if (this.init_internal) {
			this.init_internal();
			this.init_internal = null;
		}
	},

	init_internal: function()
	{
		var script = document.createElement('script');
		script.setAttribute('src', 'https://vk.com/js/api/mobile_sdk.js');
		script.setAttribute('type', 'text/javascript');
		script.setAttribute('charset', 'utf-8');

		script.onerror = function()
		{
			plugin_vk_direct_js.callback({ name:"vk", method: 'init', status:"fail", data:{ message:"Network failure"} });
		};

		script.onload = function()
		{
			var initOK = function() {
				VK.addCallback('onInviteBoxDone', function(status, data)  {
					plugin_vk_direct_js.callback({ name:"vk", method: 'showInviteBox', status: status, data: data  })
				});

				VK.addCallback('onRequestBoxDone', function(status, data) {
					plugin_vk_direct_js.callback({ name:"vk", method: 'showRequestBox', status: status, data: data  })
				});

				VK.addCallback('onShareBoxDone', function(status, data) {
					plugin_vk_direct_js.callback({ name:"vk", method: 'showShareBox', status: status, data: data  })
				});

				VK.addCallback('onSettingsBoxDone', function(status, data) {
					plugin_vk_direct_js.callback({ name:"vk", method: 'showSettingsBox', status: status, data: data  })
				});

				VK.addCallback('onOrderBoxDone', function(status, data) {
					plugin_vk_direct_js.callback({ name:"vk", method: 'showOrderBox', status: status, data: data  })
				});

				plugin_vk_direct_js.callback({ name:"vk", method: 'init', status:"success" });
			};

			var initFail = function() {
				// API initialization failed 
				Module.print("VK Plugin Initialization failed! Make sure to run as a Direct Game, not in browser.");
				plugin_vk_direct_js.callback({ name:"vk", method: 'init', status:"fail", data:{ message:"VK Initialization Failed"} });
			};

			VK.init(initOK, initFail, '5.60');
		};
		document.head.appendChild(script);
	},
};
