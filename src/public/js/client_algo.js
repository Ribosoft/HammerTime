var GLOBAL_PARAMETERS = 
{
	"left_arm_min" : 8,
	"right_arm_min" : 8,
	"left_arm_max" : 10,
	"right_arm_max" : 10,
	"Mg_ion_mM": 1,
	"salt_ion_mM":150, //[Na]+[K]
	"oligomer_nM":200
}

function FindCutsites( seq )
{
	var loc = new Array();
	res = -1;
	do
	{
            res = seq.indexOf("GUC", res + 1);
            if(res !== -1)
                    loc.push(res);
	}
	while (res !== -1);
	return loc;
}

function PrintSequenceWithCutSitesHighlited(seq,cutSites)
{
	var htmlInsert ="";
	var last = 0;
	for(var ii = 0; ii < cutSites.length; ++ii)
	{
		htmlInsert += seq.substr(last, cutSites[ii]);
		htmlInsert += "<b><span class='cut-site'>GUC</span></b>";
		last = cutSites[ii]+3;
	}
	htmlInsert+= seq.substr (last);
	$('.displayUpdate').html( htmlInsert );
}

var cc;
function CreateCandidates (seq, cutSites)
{
	var Candidates = new Array();
	//Per cutsite
	//Load params
	var lamin = GLOBAL_PARAMETERS.left_arm_min;
	var ramin = GLOBAL_PARAMETERS.right_arm_min;
	var lamax = GLOBAL_PARAMETERS.left_arm_max;
	var ramax = GLOBAL_PARAMETERS.right_arm_max;
	
	for(var ii = 0 ; ii < cutSites.length;++ii)
	{
		var firstCutsiteCands = new Array();
		for(var jj = lamin; jj < lamax; ++jj)
		{
			var start = cutSites[ii] - jj;
			if(start < 0)
				continue;
			for(var kk = ramin; kk < ramax; ++kk)
			{
				var end = cutSites[ii]+3+kk;
				var length = end - start;
				if(end >= seq.length)
					continue;
				firstCutsiteCands.push({"seq" : seq.substr(start,length), "cut":(jj+2)});
				
			}
		}
		Candidates.push(firstCutsiteCands);
	}
	cc = Candidates;
	return Candidates;
}

function ShowCandidatesAndAnnealing(cands)
{
	var res = "";
	var consRes = "";
	for(var ii = 0; ii < cands.length; ++ii)
	{
		res += "<p>Cut site number " + ii + "</p>";
		consRes += "Cut site number " + ii + "\n";
		for(var jj = 0; jj < cands[ii].length; ++jj)
		{
			var currentSeq = cands[ii][jj].seq;
			console.log(currentSeq);
			var c_pos = cands[ii][jj].cut;
			currentSeq = currentSeq.substr(0,c_pos)+currentSeq.substr(c_pos+1,currentSeq.length-c_pos-1);//REMOVE non-annealing C from comupation
			console.log(currentSeq);
			var computationalResult = tm_Base_Stacking(cands[ii][jj].seq.replaceAll('U','T'),GLOBAL_PARAMETERS.oligomer_mM,GLOBAL_PARAMETERS.salt_ion_mM,GLOBAL_PARAMETERS.Mg_ion_mM);
			res += "<p>\t"+cands[ii][jj].seq + "\t"+ computationalResult+'</p>';
			consRes += "\t"+cands[ii][jj].seq + "\t"+ computationalResult+'\n';
		}
	}
	console.log(consRes)
	$('.displayUpdate').html(res);
}


function DecompressObjectTableIntoObjectArray(table)
{
    var properties = table[0];
    var result = new Array();
    for (var ii = 1 ; ii < table.length; ++ii)
    {
        var obj = new Object();
        for (var jj = 0; jj < properties.length; ++jj)
        {
            obj[properties[jj]] = table[ii][jj];
        }
        result.push(obj);
    }
    return result;
}


function DecompressCandidates(candidates)
{
    candidates = DecompressObjectTableIntoObjectArray(candidates);
    for (var ii = 0; ii < candidates.length ; ++ii)
    {
        var structuresFold = candidates[ii].StructuresSFold;
        candidates[ii].StructuresSFold = DecompressObjectTableIntoObjectArray(structuresFold);
    }
    return candidates;
}

function DecompressRequest(request)
{
    for (var ii = 0; ii < request.CutsiteTypesCandidateContainer.length; ++ii)
    {
        var cutsiteType = request.CutsiteTypesCandidateContainer[ii];
        for (var jj = 0; jj < cutsiteType.Cutsites.length; ++jj)
        {
            var cutsite = cutsiteType.Cutsites[jj];
            var candidates = cutsite.Candidates;
            var decompressedCandidates = DecompressCandidates(candidates);
            cutsite.Candidates = decompressedCandidates;
        }
    }
}

function FindUTRBoundaries(ondone)
{
  $.ajax(
  {
    type: "GET",
    url: "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi",
    data: {
      db: 'nuccore',
      'id': request.accessionNumber,
      retmode: 'text'
      },
    success: function(d) {
        alert(d);
        clack = d;
        var ThreeUTRInfo = clack.indexOf("3'UTR");
        var FiveUTRInfo = clack.indexOf("5'UTR");
        var ORFInfo = clack.indexOf("cdregion");
        var clock = 0;
        var cluck = 0;
        if( request.region == "3'" && (ThreeUTRInfo != -1 ) )
        {

          //This monster grabs the "from x,    to y" right after the tag found
          var cleck =  clack.substr(clack.indexOf("from",ThreeUTRInfo), clack.indexOf ( "," ,clack.indexOf( "to" ,ThreeUTRInfo) ) -clack.indexOf("from",ThreeUTRInfo)) ;
          var click = cleck.split(","); //This small thing splits it into "from" and "to"
          clock = parseInt(click[0].substr(4)) ;// trim from
          cluck = parseInt(click[1].trim().substr(2) ) ; // get to
          request.sequence = request.sequence.substr(clock, cluck - clock +1 );
        
        }
        else if ( ORFInfo != -1)
        {
          //This monster grabs the "from x,    to y" right after the tag found
          var cleck =  clack.substr(clack.indexOf("from",ORFInfo), clack.indexOf ( "," ,clack.indexOf( "to" ,ORFInfo) ) - clack.indexOf("from",ORFInfo)) ;
          var click = cleck.split(","); //This small thing splits it into "from" and "to"
          clock = parseInt(click[0].substr(4)) ;// trim from
          cluck = parseInt(click[1].trim().substr(2) ) ; // get to

          if( request.region == "ORF")
            request.sequence = request.sequence.substr(clock, cluck - clock +1);
          else if( request.region == "3'")
            request.sequence = request.sequence.substr(cluck);
          else if (request.region =="5'")
            request.sequence = request.sequence.substr(0,clock);
        }
        else
        {
          alert("WARNING: Genbank is not providing info about the UTR. Grabbing full sequence instead.");
        }
        ondone(true);
      },
      error: function(jqXHR, textStatus, errorThrown)
      {
        alert("Could not access Genbank for UTR info. Error: " + errorThrown + "; Code: "+ textStatus);
        ondone(false);
      }
  }
  ); 
}

