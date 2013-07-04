
function Fold(){}



var SFOLD_CALL_NO_CONSTRAINT = "sfold -o %OUTDIR% %SEQUENCEFILE%";
var SFOLD_CALL = "sfold -f %CONSTRAINT% -o %OUTDIR% %SEQUENCEFILE%";

/*Takes in file containing multiple sequences separated by an endline*/
Fold.SFold = function( sequenceFile, targetFolder , constraintFile, ReportObject )
{
	var sys = require('sys')
	var exec = require('child_process').exec;
	var command = '';
	if(constraintFile ==undefined)
	{
		command = SFOLD_CALL_NO_CONSTRAINT
		.replace('%OUTDIR%',targetFolder)
		.replace('%SEQUENCEFILE%',sequenceFile);
	}
	else
	{
		command = SFOLD_CALL_NO_CONSTRAINT
		.replace('%OUTDIR%',targetFolder)
		.replace('%SEQUENCEFILE%',sequenceFile)
		.replace('%CONSTRAINT%',constraintFile);
	}
	exec(command, 
		function/* CommandExecuteCallback*/( error, stdout, stderr )
		{
			if(error !== null)
			{
				Log("Could not call sfold with " + sequenceFile + "," + targetFolder + "constraintFile", "Fold.SFold" , 0); 
			}
			
			Log("stdout sfold " + command + ": " + stdout , "SFold", 3);
			Log("stderr sfold " + command + ": " + stderr, "SFold", 0 );

			ReportObject.FileCount =  ReportObject.FileCount - 1;
			ReportObject.ExecuteIfComplete();
		}
	);

}



Fold.UnaFold = function ( file, options)
{

}
