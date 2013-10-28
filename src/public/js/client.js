//NOTE: All the String methods were moved to client_utils.js
//FileLoader is defined in client_utils.js
//Candidate generation functions are moved to client_algo.js

/********* Step 1 **********/
var fileLoader = new FileLoader();
var request = new Request();
var seqInput = new SequenceInput($('#sequence-display')[0].value);
var seqAlert = new SequenceAlert($("#sequence_alert"));
function fetchInputAccessionNumber(){
    var accessionAlert = new accessionAlert($("#accession_alert"));
    accessionAlert.setState("Searching");
    var validator = new  AccNumberValidator($("#accession").find("input").val());
    validator.validate(
	function(result){
            if(setDisplay(result.toString())){
		$("#submit1").removeClass("disabled");              
            }
	    accessionAlert.setState("Success");
            request.accessionNumber = validator.getAccessionNumber();
	},
	function(error){
	    setDisplay("");
	    accessionAlert.setState("Failure");
	    request.accessionNumber = validator.getAccessionNumber();
	});
};

function setDisplay(str){
    var sequenceAlert = ;
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
    var input = seqInput.cleanInput(str);
    var validation = seqInput.validateInput(input);
    sequenceAlert.removeClass("invisible");
    validation.ok === false ?
	sequenceAlert.addClass("alert-error").removeClass("alert-success"):
	sequenceAlert.removeClass("alert-error").addClass("alert-success");      

    sequenceAlert.text(validation.error);
    
    return validation.ok;
}



var inputSequence;
function SubmitInput()
{
    inputSequence = CleanInput($('#sequence-display')[0].value);
    $("step1").addClass("invisible");
    $("step2").removeClass("visible");
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

    function fetchState(){
	$.ajax({
            type: "GET",
            url : window.location.href.replace('processing','status'),
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
    };

    var interval = setInterval(fetchState, 1000 * 15);
    fetchState();
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
    $('#submit_ACN').click(fetchInputAccessionNumber);
    $('#submit1').click(SubmitInput);

    var dropZone = document.getElementById('drop-zone');
    if (dropZone != null) {
        dropZone.addEventListener('dragover', FileLoader.handleDragOver, false);
        dropZone.addEventListener('drop', FileLoader.handleFileSelect, false);
    }

    $('#selectFileInput').change(FileLoader.handleFileBrowsed);
    //enable/disable submit button depending on state of sequence
    $('#sequence-display').bind('input propertychange', setSubmitButtonStatus);
    
    //Handles showing the help panel
    $(".icon-question-sign").click(showDesignHelp);
    
    if($(".progress").length > 0) {
        checkStatusResult();
    }

    $("input[name='env']").change(enableDisableDropdown);

    if($("#results").length >0) {
        $("#results").dataTable();
    }
};
