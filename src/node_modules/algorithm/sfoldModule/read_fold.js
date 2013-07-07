var CATALITIC_CORES =
[
	//Normal
	[
		{'left':0,'right':11,'type':'G'},
		{'left':1,'right':10,'type':'U'},
		{'left':2,'right':9,'type':'C'},
		{'left':3,'right':8,'type':'C'},
		{'left':4,'right':-1,'type':'G'}, //Not connected
		{'left':5,'right':-1,'type':'U'},
		{'left':6,'right':-1,'type':'G'},
		{'left':7,'right':-1,'type':'A'}, //End not connected
		{'left':8,'right':3,'type':'G'},
		{'left':9,'right':2,'type':'G'},
		{'left':10,'right':1,'type':'A'},
		{'left':11,'right':0,'type':'C'}
	]
	//Whishbone
];


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

function Candidate ( sequence , cataliticCoreStart, Id, coreType)
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
	this.CataliticCoreType = coreType;
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

StructureInfo.prototype.Evaluate = function (cataliticCoreStartNode, catCoreType)
{
	//Find first pair of catalitic core
	var pairs = this.ConnectedPairs;
	this._evaluateCataliticCore(cataliticCoreStartNode,catCoreType);

	//Exclude catalitic core pairs and non-conecting pairs
	var excludedPairs = this._getPairsNotInCataliticCore(cataliticCoreStartNode,catCoreType);
	
	var MeltOfContiniousPairs = new Array(); //Just for debug of individual melt Ts
	
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

//Returns a list with only non-catalitic core pairs that are linked
StructureInfo.prototype._getPairsNotInCataliticCore = function(cataliticCoreStartNode,catCoreType)
{
	var catCoreStruct = CATALITIC_CORES[catCoreType];
	var res  = new Array(); //ExcludedPairs means pairs that are NOT cat Pairs
	var pairs = this.ConnectedPairs;
	var coreIndex = 0;
	for(var ii = 0;ii < pairs.length;++ii)// 
	{
		var isCatCorePair = false
		for(var jj = 0; jj < catCoreStruct.length; ++jj)
		{
			if(pairs[ii].left == catCoreStruct[jj].left + cataliticCoreStartNode && pairs[ii].right == (catCoreStruct[jj].right == -1 ? -1 :(catCoreStruct[jj].right + cataliticCoreStartNode )))
			{
				isCatCorePair = true;
				break;
			}
		}
		// console.log('\tPair ' + pairs[ii].left  + ',' + pairs[ii].right  + ' is ' + isCatCorePair + ' cat core pair');
		var isTruePair = pairs[ii].right != -1;
		if(!isCatCorePair && isTruePair)
			res.push(pairs[ii]);
		
	}
	return res;
}


StructureInfo.prototype._evaluateCataliticCore = function( catCoreStartNode,catCoreType )
{
	//Find first pair of catalitic core
	var locOfCatPair = -1;
	var pairs = this.ConnectedPairs;
	var coreStruct = CATALITIC_CORES[catCoreType];
	for(var ii = 0; ii < pairs.length; ++ii)
	{
		if(pairs[ii].left==catCoreStartNode)
		{locOfCatPair = ii;break;}
	}
	//check if entire core is there
	var pass = true;
	if(locOfCatPair != -1)
	{
		var coreIndex = 0;
		var pairIndex = locOfCatPair;
		while (coreIndex < coreStruct.length && pairIndex < pairs.length)
		{
			if( pairs[pairIndex].right != (coreStruct[coreIndex].right == -1 ? -1 :(catCoreStartNode + coreStruct[coreIndex].right))
			|| pairs[pairIndex].left != catCoreStartNode + coreStruct[coreIndex].left )				
			{
				console.log('The node '+ pairs[pairIndex].left + ' of the catalictic core node ' + coreIndex + ' is not properly connected. ');

				pass = false;
				break;
			}

			coreIndex++;
			pairIndex++;

		}

		
	}
	else
	{
		//The first pair was missing
		pass = false;
		console.log("Cat core G node missing");
	}
	
	if(!pass)
	{
		this.Fitness += 50;
	}
}

function ParseUtilities(){}


//Parses structurex.out containing GCG connect info of the pairs.
// File is read as [Node3]	[NodeBase]	[NodeBefore]	[NodeAfter]  [NodeConnectedTo]	[NodeIndex]
// NodeConnectedTo is zero if it is free
// Takes in the structure, which it modifies to add the pairs
// from site, it is structureX.out
// From local, 10structure.out
// TODO: change for new one file type
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
		if(connectsTo != 0) //If the value is zero, it is not connected to anything
		{
			Struct.AddPair(parseInt(node[0]),connectsTo,node[1]);
			//console.log(node.join(','));
		}
		else
		{
			Struct.AddPair(parseInt(node[0]),-1,node[1])
		}
	}
	reading = false;
}


// Parses the summary of the structures that contains 
// minimum free energy and max free energy, and frequency.
// Returns an array of StructureInfo containing the data
// Generally 10structure_2.out
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

//	var newCandidate = new Candidate( sequence , cataliticCoreStart, Id, coreType)

// Summarizes the sFold results into an array of candidates
ParseUtilities.ParseSFoldResults = function (directory)
{

	if(directory == undefined)
		directory = '';
	else
		directory += '\\';
		
	//Pattern is location\\ID\\structures\\10structure.out (and 10structure_2.out)
	//TODO: Find ID
	var file_pattern_begin = directory + 'GUC';
	var file_pattern_end = '\\structures\\';
	fs = require('fs');
	var Candidates = new Array();
	for(var struct_num = 0; struct_num < 10; struct_num ++)
	{
		
		console.log("Parsing " +struct_num +"th candidate ");

		var file_pattern = file_pattern_begin + (struct_num).toString() + file_pattern_end;
		var file = file_pattern + '10structure_2.out';
		
		var Structs = ParseUtilities.ParseStructuresSummary(file);
		for(var ii = 1; ii <= 10; ++ii) //Structure files are 1 based, arrays are zero based.
		{
			//TODO: Fix async op properly
			file = file_pattern + 'structure' +ii+ '.out';
			ParseUtilities.ParseStructure(file,Structs[ii-1]);
		}
		
		
		Candidates.push(Structs);
		
		console.log("\n\nFile " + file_pattern + " parsed\n\n********************************");
	}
	return Candidates;
}
	
	var Candidates = ParseUtilities.ParseSFoldResults();
	
	
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
						ss[ii].Evaluate(17,0);//Try normal core type
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
							ss[ii].Evaluate(17,0);
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







