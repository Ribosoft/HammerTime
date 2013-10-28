function FileLoader() {}

FileLoader.readFile = function(fileToRead) {
    var reader = new FileReader();
    reader.readAsText(fileToRead);
    reader.onload = function() {
	setDisplay(reader.result);
    };
}

FileLoader.handleFileBrowsed  = function(evt) {
    file = $('#selectFileInput')[0].files[0];
    FileLoader.readFile(file);
}

FileLoader.handleFileSelect  = function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    
    file = evt.dataTransfer.files[0]; // file object uploaded
    FileLoader.readFile(file);
}

FileLoader.handleDragOver = function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}


//Add functionality to native string, cause it is limited
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
    if(min == this.length)
	min = -1;
    return min;
}

String.prototype.replaceAt=function(index, string, len) 
{
    if(len == undefined)
	len = 1;

    return this.substr(0, index) + string + this.substr(index+len);

}

String.prototype.replaceAll = function(find,replace)
{
    return this.replace(new RegExp(find, 'g'), replace);
}


//pads left
String.prototype.PadLeft = function(padString, length) {
    var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
}

//pads right
String.prototype.PadRight = function(padString, length) {
    var str = this;
    while (str.length < length)
        str = str + padString;
    return str;
}

function AccNumberValidator(accessionNumber){
    this.accessionNumber = accessionNumber;
    this.isValid = false;
}

AccNumberValidator.prototype.validate = function(successCallback, errorCallkack){
        $.ajax({
        type: "GET",
        url: "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi",
        data: {
            db: 'nuccore',
            'id': this.accessionNumber,
            rettype: 'fasta',
            retmode: 'text'
        },
        success: function(d) {
	    this.isValid = true;
            successCallback(d);
        },
        error: function(jqXHR, textStatus, errorThrown) {
	    this.isValid = false;
            errorCallback(errorThrown);
        }
    });
}

AccessionNumberValidator.prototype.getAccessionNumber(){
    return this.isValid? this.accessionNumber : '';
}

function AccessionAlert(el){
    this.el = el;
}

//States: ["Searching", "Success", "Failure"]
AccessionAlert.prototype.setState = function(state){
    switch(state){
    case "Searching":
	this.el.removeClass("invisible alert-error alert-success");
	this.el.text("Searching our database...");
	break;
    case "Success":
	this.el.addClass("alert-success");
        this.el.text("Sequence found!");
	break;
    case "Failure":
	this.el.removeClass("alert-success");
	this.el.addClass("alert-error");
	this.el.text("No results found for this accession number");
	break;
    default:
	this.el.removeClass();
	this.el.text("");
    }
}

function SequenceInput(el){
    this.el = el;
}

SequenceInput.prototype.validateInput= function(input){
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

    return {"ok" : true, "error" : "All OK!" };
}

SequenceInput.prototype.cleanInput = function( input )
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
    return input;
}

SequenceInput.prototype.setText = 

function SequenceAlert(el){
    this.el = el;
}

//States = ["Error", "Success"]
SequenceAlert.prototype.setSuccess = function(state){
    if( state == "Error"){
	
    }
    else if(state == "Success"){
    }
};

