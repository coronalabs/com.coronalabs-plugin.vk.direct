local lib

local platform = system.getInfo("platform")
if platform == 'html5' then
	lib = require "plugin_vk_direct_js"
else
	local Library = require "CoronaLibrary"

	-- Create stub library for simulator
	lib = Library:new{ name='plugin.vk.direct', publisherId='com.coronalabs' }
	-- Default implementations
	local function defaultFunction()
		print( "WARNING: The '" .. lib.name .. "' library is not available on this platform." )
	end

	lib.showInviteBox = defaultFunction
	lib.showRequestBox = defaultFunction
	lib.showShareBox = defaultFunction
	lib.showSettingsBox = defaultFunction
	lib.showOrderBox = defaultFunction
	lib.showLeaderboardBox = defaultFunction
	lib.api = defaultFunction
	lib.addEventListener = defaultFunction
	lib.init = defaultFunction
end

-- Return an instance
return lib