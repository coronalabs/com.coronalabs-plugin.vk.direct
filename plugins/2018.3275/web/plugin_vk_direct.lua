-- Code is MIT licensed; see https://www.coronalabs.com/links/code/license
---------------------------------------------------------------------------------------

local lib

local platform = system.getInfo("platform")
if platform == 'html5' then
	return require "plugin_vk_direct_js"
else
	lib = {}
	setmetatable( lib, {__index = function( t, k )
		return function() 
			print( "WARNING: Placeholder is called for " .. k )
		end
	end} )

end

-- Return an instance
return lib