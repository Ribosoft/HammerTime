//Add functionality to native string, cause it sucks
String.prototype.indexOfMultiple=function(Arr) 
{
	var indexs = new Array();
	//Make an array of the multiple first instances of Arr[ii]
	for(var ii = 0; ii < Arr.length ; ++ii)
	{
		indexs.push(this.indexOf(Arr[ii]));
	}
	
	var min = this.length;//The first instance of an element in *this cannot be at an index greater than length (e.g. this is a big number)
	for(var ii = 0; ii < indexs.length; ++ii)
	{
		if(indexs[ii] != -1 && indexs[ii] < min)
			min = indexs[ii];
	}
	return min;
}


//Fetch from database
function FetchAccessionNumberSequence()
{
	ClearErrors();
    var sequence = $("#accession").find("input").val();
    //var url = "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id="+
    //sequence + "&rettype=fasta&retmode=text";
    console.log("sequence accession # " + sequence);
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

//File drop
function FileLoader() {
    var reader = new FileReader();
    var file;
	var selfRef = this;
    this.readFile = function(fileToRead) {
		reader.readAsText(fileToRead);
		reader.onload = function() {
			loadInputToDisplay(reader.result);
		};
	}
    this.handleFileSelect = function(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		
		file = evt.dataTransfer.files[0]; // file object uploaded
		selfRef.readFile(file);
	}
    this.handleDragOver = function(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
	}
}

var fileLoader = new FileLoader();




function ValidateInput(input)
{
	var badInput = false;
	var Problems = '';
	var isRNA = true;
		
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
				break;
			}
		}
		fastaCommentStart = input.indexOfMultiple(['>' , ';']);
	} while(fastaCommentStart != -1 );
	//END FASTA
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
		$('#sequence-display').attr('style', "border-color: rgba(210, 30, 30, 0.8) ;box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(210, 30, 30, 0.6) ;outline: 0 none");
		console.log(validation.error);
		alert(validation.error);
	}
	else
	{
		$('#sequence-display').attr('style', "border-color: rgba(30, 240, 30, 0.8) ;box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(30, 240, 30, 0.6) ;outline: 0 none");
	}
}



window.onload = function() {
    var button1 = document.getElementById("submit1");
    $('#submit_ACN').click(FetchAccessionNumberSequence);
	$('#submit1').click(SubmitInput);
	
	
    var dropZone = document.getElementById('drop-zone');
    dropZone.addEventListener('dragover', fileLoader.handleDragOver, false);
    dropZone.addEventListener('drop', fileLoader.handleFileSelect, false);
};