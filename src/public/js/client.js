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


//NOTE: All the String methods were moved to client_utils.js

//FileLoader is defined in client_utils.js
var fileLoader = new FileLoader();

//Fetch from database
function FetchAccessionNumberSequence()
{
	ClearErrors();
    var sequence = $("#accession").find("input").val();
    var url = "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi";
    $.ajax({
        type: "GET",
        url: url,
        data: {
            db: 'nuccore',
            'id': sequence,
            rettype: 'fasta',
            retmode: 'text'
        },
        success: function(d) {
            loadInputToDisplay(d.toString());
        },
        error: function(jqXHR, textStatus, errorThrown) {
            switch (textStatus) {
                case "error":
                    alert("errorThrown is " + errorThrown);
            }
        }
    });
}

function loadInputToDisplay(str){
    //TODO Add stuff to clean out input text
    $("#sequence-display")[0].value = str;
}


function ValidateInput(input)
{
	var badInput = false;
	var Problems = '';
	var isRNA = true;
	
	if(input == "")
		return {"ok" : false , "error" : "Empty Input: Is your FASTA comment terminated by a new line?"};
	
		
	for(var ii = 0; ii < input.length; ++ii)
	{
		if(input[ii] ==' ' || input[ii] =='\n')
			continue;
		if(input[ii] != 'T' && input[ii] != 'U' && input[ii] != 'G' && input[ii] != 'C' && input[ii] != 'A')
		{
			Problems = "Unrecognized nucleotide: " + input[ii];
			badInput = true;
			break;
			
		}
	}
	
	if(badInput)
		return {"ok" : false , "error" :Problems};
		
		for(var ii = 0; ii < input.length; ++ii)
	{
		if(input[ii] ==' ')
			continue;
		if(input[ii] == 'T')
		{
			isRNA = false;
			break;
		}
	}
	for(var ii = 0; ii < input.length; ++ii)
	{
		if(input[ii] ==' ' || input[ii] == '\n')
			continue;
		if((isRNA && input[ii] =='T') || (!isRNA && input[ii] == 'U'))
		{
			console.log("@" + ii + ":" + input[ii]);
			Problems = "Inconsistent input (T and U): Check that your input is either DNA or RNA";
			badInput = true;
			break;
		}
	}
	
	if(badInput)
		return {"ok" : false , "error" :Problems};
	
	console.log("All ok");
	return {"ok" : true, "error" : Problems };
	
}

function ClearErrors()
{
	$('#sequence-display').attr('style', "");
}

/**
* Formats input from FASTA / other formats into plain string
*	
*/

function CleanInput( input )
{
	//FASTA
	input = input.toUpperCase();
	input = input.trim();
	var fastaCommentStart = input.indexOfMultiple(['>' , ';']);
	do
	{
		
		if(fastaCommentStart != -1 )
		{
			var endofFastaComment =  input.indexOf('\n');
			if(endofFastaComment > fastaCommentStart)
			{
				if( endofFastaComment != -1 )
				{
					input = input.substr( input.indexOf('\n') + 1);
				}
			}
			else //This means the comment is not terminated by a new-line. The entire thing is garbage. The validator will scream
			{ //Or is preceeded by a line break, which means it is not proper FASTA
				input = "";
				break;
			}
		}
		fastaCommentStart = input.indexOfMultiple(['>' , ';']);
	} while(fastaCommentStart != -1 );
	//END FASTA
	
	input = input.replace(/[ \t\r\n]+/g, '');//This removes all white-space from the returned string
	console.log(input);
	return input;
}


function SubmitInput()
{
	ClearErrors();
	var input = $('#sequence-display')[0].value;
	input = CleanInput(input);
	var validation = ValidateInput(input);
	if(validation.ok === false)
	{
                //TODO clean up this to use CSS classes
		$('#sequence-display').attr('style', "border-color: rgba(210, 30, 30, 0.8) ;box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(210, 30, 30, 0.6) ;outline: 0 none");
		console.log(validation.error);
		alert(validation.error);
	}
	else
	{
                //TODO clean up this to use CSS classes
		$('#sequence-display').attr('style', "border-color: rgba(30, 240, 30, 0.8) ;box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(30, 240, 30, 0.6) ;outline: 0 none");
		var csites = FindCutsites (input);
		var candidates = CreateCandidates(input, csites);
		ShowCandidatesAndAnnealing(candidates);
                $.ajax({
                    type: "POST",
                    url: window.location.href+"design",
                    data: {
                        sequence: input
                    },
                    success: function(data) {
                        //data contains the id of the request
                        window.location.href = window.location.href+"design/"+data.id;
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        switch (textStatus) {
                            case "error":
                                alert("errorThrown is " + errorThrown+" with status "+textStatus);
                        }
                    }
                });
         }
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

window.onload = function() {
    $('#submit_ACN').click(FetchAccessionNumberSequence);
    $('#submit1').click(SubmitInput);
	
	
    var dropZone = document.getElementById('drop-zone');
    dropZone.addEventListener('dragover', fileLoader.handleDragOver, false);
    dropZone.addEventListener('drop', fileLoader.handleFileSelect, false);
};