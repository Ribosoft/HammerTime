
function RemoveAllValuesFromArray(arr,val)
{
	var index = arr.indexOf(val);
	while(index != -1)
	{
		arr.splice(index, 1);
		index = arr.indexOf(val);
	}
}

function StructureInfo (minEnergy,maxEnergy,freq,LowestFreeEnergy)
{
	this.EnergyInterval = {'Min': minEnergy, 'Max' : maxEnergy};
	this.Frequency = freq;
	this.LowestFreeEnergy = LowestFreeEnergy;
	this.ConnectedPairs = new Array();
}


StructureInfo.prototype.AddPair = function ( left, right, type)
{
	this.ConnectedPairs.push({'left':left,'right':right,'type':type});
}
var StructureInfos = new Array();

function cb_structFile(err,data,Struct)
{
	if(err)
	{
		console.log(err);
		return;
	}
	var splited = data.split('\n');
	//First to lines are header
	//node breakdown [0]=positon,[1]=nucleotide base, [2],[3]=prev,next, [4]=connected-to, [5]=node
	for(var ii = 0; ii < (splited.length - 1); ++ii) //-1 due to empty line at eof
	{
		var node = splited[ii].split(' ');
		RemoveAllValuesFromArray(node,'');
		var connectsTo = parseInt(node[4])
		if(connectsTo != 0)
		{
			Struct.AddPair(parseInt(node[0]),connectsTo,node[1]);
			console.log(node.join(','));
		}
	}
	reading = false;
}

function cb_infoFile(err,data)
{
	if(err)
	{
		console.log(err);
		return;
	}
	var splited = data.split('\n');
	console.log("Data lines:"+splited.length);
	for(var ii = 0; ii < (splited.length - 1); ++ii)//-1 due to empty line at eof
	{
		var struct = splited[ii].split(' ');
		RemoveAllValuesFromArray(struct,'');
		StructureInfos.push(new StructureInfo(parseFloat(struct[1]),parseFloat(struct[2]),parseFloat(struct[3]),parseFloat(struct[4])) );
		console.log(struct.join(','));
	}
	reading = false;
}
var file_pattern = 'GUC3\\Srna\\6751\\structures\\';
var file = file_pattern + '10structure_2.out';


fs = require('fs');
var reading = true;
var r = fs.readFileSync(file, 'ascii');
cb_infoFile(null, r);
console.log("Info file with length: " + StructureInfos.length);
for(var ii = 1; ii <= 10; ++ii)
{
	//TODO: Fix async op properly
	file = file_pattern + 'structure' +ii+ '.out';
	r = fs.readFileSync(file, 'ascii');
	cb_structFile(null, r,StructureInfos[ii-1]);
}

var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var end = false;

console.log("Good");
Ask();
function Ask()
{
	rl.question("Information for structure: ", 
	function(answer) 
	{
		var ans = parseInt(answer);
		if(ans == -1)
			end = true;
		
		if(end)
			rl.close();
		else
		{
			console.log("Structure " + answer + ':');
			var s = StructureInfos[ans]
			console.log("Frequency:" + s.Frequency);
			console.log("Connections");
			var cg = 0;
			var au = 0;
			for(var ii = 0; ii < s.ConnectedPairs.length;++ii)
			{
				console.log(s.ConnectedPairs[ii]);
				var t = s.ConnectedPairs[ii].type ;
				if(t == 'C' || t == 'G')
					cg++;
				else
					au++;
			}
			cg = cg/2;
			au = au/2;
			console.log("GC total connections: " + cg);
			console.log("AU total connections: " + au);
			setTimeout(Ask,100);
		}
	});
}





