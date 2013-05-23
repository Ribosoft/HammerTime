
function StructureInfo (minEnergy,maxEnergy,freq,LowestFreeEnergy)
{

}

function callback_file_processed(err,data)
{
	if(err)
	{
		console.log(err);
		return;
	}
	console.log (data);
}
file = 'GUC3\\Srna\\6751\\structures\\10structure_2.out'


fs = require('fs');
fs.readFile(file, 'ascii', callback_file_processed);

console.log("Good");



