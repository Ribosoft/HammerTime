//TODO this file is becoming a mess, clean it up using the method explained here: 
//  http://viget.com/inspire/extending-paul-irishs-comprehensive-dom-ready-execution


//NOTE: All the String methods were moved to client_utils.js
//FileLoader is defined in client_utils.js
//Candidate generation functions are moved to client_algo.js
var fileLoader = new FileLoader();

var accessionNumber = '';
function FetchAccessionNumberSequence()
{
    var accessionAlert = $("#accession_alert");
    accessionAlert.removeClass("invisible alert-error alert-success");
    accessionAlert.text("Searching our database...");
    var sequence = $("#accession").find("input").val();

    $.ajax({
        type: "GET",
        url: "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi",
        data: {
            db: 'nuccore',
            'id': sequence,
            rettype: 'fasta',
            retmode: 'text'
        },
        success: function(d) {
            if( setDisplay(d.toString())){
               $("#submit1").removeClass("disabled");              
            }
            accessionAlert.addClass("alert-success");
            accessionAlert.text("Sequence found!");
            accessionNumber = sequence;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            setDisplay("");
            accessionAlert.removeClass("alert-success");
            accessionAlert.addClass("alert-error");
            accessionAlert.text("No results found for this accession number")
            accessionNumber = '';
        }
    });
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

    return {"ok" : true, "error" : "All OK!" };
	
}

function setDisplay(str){
    var sequenceAlert = $("#sequence_alert");
    $("#submit1").addClass("disabled");
    sequenceAlert.addClass("invisible");
    sequenceAlert.removeClass("alert-error");
    
    $("#sequence-display")[0].value = str;
    if(str !== ""){
        return validateAndAlert(str);
    }
}

function validateAndAlert(str){
    var sequenceAlert = $("#sequence_alert");
    var input = CleanInput(str);
    var validation = ValidateInput(input);
    sequenceAlert.removeClass("invisible");
    if(validation.ok === false){
      sequenceAlert.addClass("alert-error").removeClass("alert-success");
    }
    else{
      sequenceAlert.removeClass("alert-error").addClass("alert-success");      
    }
    sequenceAlert.text(validation.error);
    
    return validation.ok;
}

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
    return input;
}


function SubmitInput()
{
    var input = CleanInput($('#sequence-display')[0].value);
    $.ajax({
        type: "POST",
        url: window.location.href+"design",
        data: {
            sequence: input,
            accessionNumber : accessionNumber
        },
        success: function(data) {
            window.location.href = window.location.href+"design/"+data.id;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $("#sequence_alert").addClass("alert-error").removeClass("alert-success");
            $("#sequence_alert").text("Service currently unavailable. Please try again later.")
        }
    });
}

function setSubmitButtonStatus(){
    validateAndAlert($('#sequence-display')[0].value)?
            $("#submit1").removeClass("disabled"):
            $("#submit1").addClass("disabled");
}

function showDesignHelp(e){
        $(".icon-question-sign").off('click');
	var elem = $(this);
        setTimeout(function(){
            $(".icon-question-sign").click(showDesignHelp);
        },300);
	if(elem.attr('expanded')== '' || elem.attr('expanded')== undefined)
	{
		var css1 = $('#design-form').css('width');
		var css2 = $('#design-form i').css('margin-right');
		elem.attr('expanded', css1+';' + css2 );
                $('#design-form i').animate({'margin-right':'0%'},250);
                $('#design-form').animate({'width':'50%'},250);
	}
	else
	{
		var css = elem.attr('expanded').split(';');
		elem.attr('expanded','');
		$('#design-form').animate({'width':css[0]},250);
		$('#design-form i').animate({'margin-right':css[1]},250);
	}
	
}

function checkStatusResult() {
    var countErrors = 0;
    var interval = setInterval(function(){
        $.ajax({
            type: "GET",
            url : window.location.href,
            data : {},
            success : function(data) {
                var stateLog = data.state;
                while(stateLog.indexOf('\n') != -1)
                {
                  stateLog = stateLog.replace('\n','</div><br><div class="state-log">');
                }
                $(".resultsButton").next().html('<div class="state-log">' + stateLog + '</div>' );
                if(data.finished) {
                    $(".resultsButton").removeClass("invisible");
                    clearInterval(interval);
                }
            },
            dataType : "json",
            error : function(err) {
              countErrors += 1;
              if(countErrors > 3) {
                  clearInterval(interval);
                  alert("Server seems to be inaccessible. Please try again later");
              }
            }
        });
    }, 1000 * 15);
};


function enableDisableDropdown()
{
    var state = this.checked;
    if(this.defaultValue === 'vitro')
        $("select[name='envVivo']").prop("disabled", state);
    else
        $("select[name='envVivo']").prop("disabled", !state);
}




window.onload = function() {
    $('#submit_ACN').click(FetchAccessionNumberSequence);
    $('#submit1').click(SubmitInput);
    var dropZone = document.getElementById('drop-zone');
    dropZone.addEventListener('dragover', FileLoader.handleDragOver, false);
    dropZone.addEventListener('drop', FileLoader.handleFileSelect, false);

    $('#selectFileInput').change(FileLoader.handleFileBrowsed);
    //enable/disable submit button depending on state of sequence
    $('#sequence-display').bind('input propertychange', setSubmitButtonStatus);
    
    //Handles showing the help panel
    $(".icon-question-sign").click(showDesignHelp);
    
    if($(".progress").length > 0) {
        checkStatusResult();
    }

    $("input[name='env']").change(enableDisableDropdown);
};