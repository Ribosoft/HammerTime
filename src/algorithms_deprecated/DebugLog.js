var LOG_LEVEL = 0;// 0: Only super important stuff
					// 30: Everything
function Log(message, module, level)
{
	if(level < LOG_LEVEL)
		console.log(module+": "+ message);
}


