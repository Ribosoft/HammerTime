
function RemoveAllValuesFromArray(arr,val)
{
	var index = arr.indexOf(val);
	while(index != -1)
	{
		arr.splice(index, 1);
		index = arr.indexOf(val);
	}
}

function QuickMelt(oligo)
{
	var nAT =0,nGC=0;
	for(var ii = 0; ii < oligo.length ; ++ii)
	{
		if(oligo[ii] == 'A' || oligo[ii] == 'U')
			nAT++;
		else if(oligo[ii] == 'G' || oligo[ii] == 'C')
			nGC++;
	}
	return nAT*2 +nGC*4;
}

function Candidate ( sequence , cataliticCoreStart,Id)
{
	this.Sequence = sequence;
	this.CataliticCoreStart = cataliticCoreStart;
	this.ID = Id;
	this.Structures = new Array();
	this.Fitness_Shape = 0;
	this.Fitness_Shape_dG = 0;
	this.Fitness_Target = 0;
	this.Fitness_Target_dG = 0;
	this.Fitness_Specificity = 0;
	this.Fitness_AnnealingT = 0;
	
}


function StructureInfo (minEnergy,maxEnergy,freq,LowestFreeEnergy)
{
	this.EnergyInterval = {'Min': minEnergy, 'Max' : maxEnergy};
	this.Frequency = freq;
	this.LowestFreeEnergy = LowestFreeEnergy;
	this.ConnectedPairs = new Array();
	this.Fitness = 0;
}


StructureInfo.prototype.AddPair = function ( left, right, type)
{
	this.ConnectedPairs.push({'left':left,'right':right,'type':type});
}

StructureInfo.prototype.Evaluate = function (cataliticCoreStartNode)
{
	//Find first pair of catalitic core
	var locOfCatPair = -1;
	var pairs = this.ConnectedPairs;
	for(var ii = 0; ii < pairs.length; ++ii)
	{
		if(pairs[ii].left==cataliticCoreStartNode)
		{locOfCatPair = ii;continue;}
	}
	//check if entire core is there
	var pass = true;
	if(locOfCatPair != -1)
	{
		//Connected to the right note
		if( pairs[locOfCatPair].right !=  (cataliticCoreStartNode + 11))
		{
			console.log("Cat core G node miss-connected");
			pass = false;
			
		}
		else
		{
			 //Check other nodes
			for(var ii = 1; ii < 4 ; ++ii)
			{
				//Next node should be connected to the right thing
				pass = (pairs[locOfCatPair+ii].left == cataliticCoreStartNode+ii) && (pairs[locOfCatPair+ii].right == cataliticCoreStartNode+11-ii)
				if(!pass)
				{
					console.log("Missformed core");
					break;
				}	
			}
			
		}
		
	}
	else
	{
		pass = false;
		console.log("Cat core G node missing");
	}
	
	if(!pass)
	{
		this.Fitness += 50;
	}

	//Exclude catalitic core pairs 
	var excludedPairs = new Array();
	for(var ii = 0;ii < pairs.length;++ii)// 
	{
	
		if(pairs[ii].left == cataliticCoreStartNode || pairs[ii].right == cataliticCoreStartNode
			|| pairs[ii].left == cataliticCoreStartNode + 1 || pairs[ii].right == cataliticCoreStartNode + 1
			|| pairs[ii].left == cataliticCoreStartNode + 2 || pairs[ii].right == cataliticCoreStartNode + 2
			|| pairs[ii].left == cataliticCoreStartNode + 3 || pairs[ii].right == cataliticCoreStartNode + 3
			)
			continue;
		excludedPairs.push(pairs[ii]);
	}
	
	var MeltOfContiniousPairs = new Array();
	
	for(var ii = 0; ii < excludedPairs.length ; ++ii)
	{
		var ContPair = ""; ContPair += excludedPairs[ii].type;
		var bump = false;
		var jj = ii + 1;
		for(; jj < excludedPairs.length ; ++jj)
		{
			if(excludedPairs[ii].left + 1 == excludedPairs[jj].left ||  excludedPairs[ii].left + 2 == excludedPairs[jj].left)
			{	
				ContPair += excludedPairs[jj].type;
				ii += 1;
			}
			else //Continuity broken
			{
				ii = jj - 1; //Pre-see increment
				break;
			}
		}
		
		var tMelt = QuickMelt(ContPair)
		//console.log(ContPair + " m: " + tMelt);
		MeltOfContiniousPairs.push(tMelt);
		this.Fitness += tMelt;
	}
	console.log("Fitness:" + this.Fitness);
	
	
}


function ParseUtilities(){}

ParseUtilities.ParseStructure = 
function (filePath,Struct)
{
	var data = fs.readFileSync(filePath, 'ascii');

	var splited = data.split('\n');
	//First to lines are header
	//node breakdown [0]=positon,[1]=nucleotide base, [2],[3]=prev,next, [4]=connected-to, [5]=node
	for(var ii = 0; ii < (splited.length - 1); ++ii) //-1 due to empty line at eof
	{
		var node = splited[ii].split(' ');
		RemoveAllValuesFromArray(node,'');
		//Skip non-connection strings
		if(node.length!=6)
			continue;
		var connectsTo = parseInt(node[4])
		if(connectsTo != 0)
		{
			Struct.AddPair(parseInt(node[0]),connectsTo,node[1]);
			//console.log(node.join(','));
		}
	}
	reading = false;
}

ParseUtilities.ParseStructuresSummary=
function(file)
{

	var StructureInfos = new Array();
	var data = fs.readFileSync(file, 'ascii');
	var splited = data.split('\n');
	console.log("Data lines:"+splited.length);
	for(var ii = 0; ii < (splited.length - 1); ++ii)//-1 due to empty line at eof
	{
		var struct = splited[ii].split(' ');
		RemoveAllValuesFromArray(struct,'');
		StructureInfos.push(new StructureInfo(parseFloat(struct[1]),parseFloat(struct[2]),parseFloat(struct[3]),parseFloat(struct[4])) );
		console.log(struct.join(','));
	}
	return StructureInfos;
}
fs = require('fs');
var Candidates = new Array();
for(var struct_num = 0; struct_num < 10; struct_num ++)
{
	console.log("Parsing " +struct_num +"th candidate ");
	var file_pattern_begin = 'GUC';
	var file_pattern_next = '\\structures\\';
	var file_pattern = file_pattern_begin + (struct_num).toString() + file_pattern_next;
	var file = file_pattern + '10structure_2.out';
	
	var Structs = ParseUtilities.ParseStructuresSummary(file);
	for(var ii = 1; ii <= 10; ++ii)
	{
		//TODO: Fix async op properly
		file = file_pattern + 'structure' +ii+ '.out';
		ParseUtilities.ParseStructure(file,Structs[ii-1]);
	}

	Candidates.push(Structs);
	
	console.log("\n\nFile " + file_pattern + " parsed\n\n********************************");
}
	var readline = require('readline');

	var rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout
	});

	var end = false;
Ask();
function Ask()
{
	console.log("*********************************\n\n");
	rl.question("Information for candidate,structure: ", 
	function(answer) 
	{
		var splited = answer.split(',');
		var ans = parseInt(splited[1]);
		var cand = parseInt(splited[0]);
		if(ans == -1 || isNaN(cand))
			end = true;
		
		if(end)
		{
			rl.close();
			console.log('exiting...'); 
		}
		else
		{
			console.log("*********************************\n\n");
			console.log("Candidate " + cand);
			if(!isNaN(ans))
			{
				console.log("Structure " + ans + ':');
				var s = Candidates[cand][ans]
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
				console.log("*********************************\n\n");
			}
			else
			{
				if(cand != -1)
				{
					var ss = Candidates[cand];
					
					for(var ii = 0; ii < ss.length;++ii)
					{
						console.log("Struct "+ ii + " freq: " + ss[ii].Frequency); 
						ss[ii].Evaluate(17);
					}
					console.log("*********************************\n\n");
				}
				else
				{
					console.log("Fitness for all candidates:");
					for(var jj = 0; jj < Candidates.length;++jj)
					{
						console.log("\tCandidate :" + (jj).toString());
						var CandFitness = 0 ;
						console.log("	**********   ");
						var ss = Candidates[jj];
						
						for(var ii = 0; ii < ss.length;++ii)
						{
							console.log("Struct "+ ii + " freq: " + ss[ii].Frequency); 
							ss[ii].Evaluate(17);
							CandFitness += ss[ii].Fitness * ss[ii].Frequency;
						}
						
						
						ss.OverallFitness = CandFitness; //Dyn add property
						console.log("	**********   ");
						console.log("\tOverall = " +  CandFitness.toFixed(2));
						console.log("	**********   ");
					}
					console.log("*********************************\n\n");
					console.log("*********************************\n\n");
				}
			}
			setTimeout(Ask,100);
		}
	});
}







