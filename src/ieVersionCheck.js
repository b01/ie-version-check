/**
 * Get the version of IE and set it as a property 'ie' on the window.
 * NOTE: MUST BE RUN in <head></head> of HTML document.
 *
 * Uses a combination of IE JavaScript Conditional compilation and
 * feature detection to determine the clients' version of IE
 * otherwise null.
 * This must set an object in global space because of conditional
 * compilations nature. See: Microsoft Developer Network
 * <http://msdn.microsoft.com/> for more on "cc_on Statement (JavaScript)"
 *
 * @example:
 *  ie.versionCheck();
 *  if ( window.ie.version > 0 && window.ie.version < 10 ) { ... }
 *
 * @author Khalifah Shabazz <http://www.kshabazz.net/>
 */
function IEVersionCheck()
{
	var bits = null,
		version = -1,
		versionTemp = null,
		winAt = null;

	// Run IE special conditional comment to detect IE.
	/*@cc_on
	if ( @_win32 || @_win64 )
	{
		if ( @_win32 )
		{
			winAt = @_win32;
			bits = 32;
		}
		else if ( @_win64 )
		{
			winAt = @_win64;
			bits = 64;
		}

		if ( typeof document.documentMode != "undefined" )
		{
			version = document.documentMode;
		}
		else if ( typeof document.compatMode != "undefined" && document.compatMode == "CSS1Compat" )
		{
			version = 7;
		}
		else if ( typeof @_jscript_version != "undefined" )
		{
			if ( @_jscript_version == 5.6 )
			{
				version = 6;
			}
			else if ( @_jscript_version < 5.6 && @_jscript_version > 3.9 )
			{
				version = 5;
			}
			else if ( @_jscript_version < 4 )
			{
				version = 3;
			}
		}
	 }
	 @*/

	// Conditional comments were dropped in IE 11.
	// Try to parse the User Agent string.
	if ( version === -1 )
	{
		versionTemp = /Trident\/([^;]+); .*rv:([^)]+)/.exec(navigator.userAgent);
		if ( versionTemp !== null && versionTemp.length > 2 )
		{
			version = versionTemp[2];
		}
	}

	/**
	 * Get browser bits.
	 * @access privileged
	 * @returns {int|null}
	 */
	this.getBits = function ()
	{
		return bits;
	};

	/**
	 * Get IE Version number, -1 when IE not detected.
	 * @access privileged
	 * @returns {number}
	 */
	this.getVersion = function ()
	{
		return version;
	};

	/**
	 * Get Windows
	 * @access privileged
	 * @returns {int|null}
	 */
	this.getWinAt = function ()
	{
		return winAt;
	};

	return this;
}

// Export node module.
if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
	module.exports = IEVersionCheck;
}