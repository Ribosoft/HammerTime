//NOTE: All the String methods were moved to client_utils.js
//FileLoader is defined in client_utils.js
//Candidate generation functions are moved to client_algo.js

/********* Step 1 **********/

var request = new Request();
var seqInput = new SequenceInput($('#sequence-display')[0]);
var fileLoader = new FileLoader();
var seqAlert = new SequenceAlert($("#sequence_alert"));
var submit1 = new Button($("#submit1"));
var searchAccession = new Button($('#submit_ACN'));

function fetchInputAccessionNumber(){
    var accessionAlert = new AccessionAlert($("#accession_alert"));
    var validator = new  AccNumberValidator($("#accession").find("input").val());
    //If accesionNumber is empty
    if(!validator.getAccessionNumber()){
	return;
    }
    accessionAlert.setState("Searching");
    submit1.disable();
    seqAlert.hide();
    validator.validate(
	function(result){
	    var input = result.toString();
	    var validation = InputValidation.isInputValid(input);
	    seqInput.setText(input);
	    //Setting request.sequence
	    request.sequence = InputValidation.cleanInput(input);
	    seqAlert.setState(validation);
            if(validation.ok){
		submit1.enable();
            }
	    accessionAlert.setState("Success");
	    //Setting request.sequence
            request.accessionNumber = validator.getValidAccessionNumber();
	},
	function(error){
	    accessionAlert.setState("Failure");
	    //Setting request.sequence
	    request.accessionNumber = validator.getValidAccessionNumber();
	});
};

function finishStep1()
{
    $(".jumbotron").addClass("invisible");
    $("#step1").addClass("invisible");
    $("#step2").removeClass("invisible");
}

function setSubmitButtonStatus(){
    var validation = seqInput.isInputValid();
    seqAlert.setState(validation);
    if(validation.ok){
	submit1.enable();
	//Setting request.sequence
	request.sequence = InputValidation.cleanInput(seqInput.getText());
    } else {
	submit1.disable();
	request.sequence = '';
    }
}


/****** Step 2 **********/
var designContent = new DesignContent(
    $('#design-form'),
    $(".icon-question-sign"),
    $(".design-help")
);

var submit2 = new Button($("#submit2"));
var dropdown = new SmartDropdown($("select[name='envVivo']"));
var fieldSet = new SmartFieldSet(
    $("fieldset[name='region']"),
    request.accessionNumber
);
var summary = new SummaryTable();

function handleQuestionClick(event){
    $(".icon-question-sign").off('click');
	designContent.showDesignHelp(event);
	setTimeout(function(){
            $(".icon-question-sign").click(handleQuestionClick);
	},300);
}

function enableDisableDropdown()
{
    dropdown.setState(this.checked, this.defaultValue === 'vitro');
}

function finishStep2(event)
{
    event.preventDefault();
    var data = $("#design-form").serializeArray();
    request.extractData(data);
    summary.setTableData(request);
    
    $("#step2").addClass("invisible");
    $("#step3").removeClass("invisible");
}

/******* Step 3 ********/
var submit3 = new Button($("#submit3"));
var submissionAlert = new SequenceAlert($("#submitAlert"));

function finishStep3(){
    submissionAlert.hide();
    request.submitRequest(function(err, location){
	if(err){
	    submissionAlert.setState({ok:"false", error:""+err});
	    submissionAlert.show();
	}
	else {
	    window.location.replace(location.replace('requests','processing'));
	}
    });
};


/******* Step 4 *********/
var progressBar = new ProgressBar($(".bar"), $("#timeLeft"), request);
var stateReporter = new StateReporter($(".resultsButton").next());
var resultsPanel = new ResultsPanel($(".resultsButton"));
var submit4 = new Button($("#submit4"));

function updatePage() {
    var countErrors = 0;
    var timeoutInterval = 1000 * 60 * 1;
    request.getRequestStatus(function(err, data){
	if(!err){
	    var remainingMin = data.duration.remainingDuration * 1000 * 60;
	    timeoutInterval = remainingMin / 10;
	    progressBar.update(data.duration.remainingDuration);
	    stateReporter.updateState(data.state);
	    resultsPanel.updatePanel(data.status);
	} else {
	    countErrors +=1;
	    if(countErrors > 3)
		clearTimeout(timeout);
	}
	var timeout = setTimeout(updatePage, timeoutInterval);
    });
};

function finishStep4(){
    window.location.replace(window.location.replace('processing','results'));
};


window.onload = function() {
    if($("#step1").length){
	//Step1
	searchAccession.click(fetchInputAccessionNumber);
	submit1.click(finishStep1);
	seqInput.emptyText();
	$('#selectFileInput').change(FileLoader.handleFileBrowsed);
	$('#sequence-display').bind('input propertychange', setSubmitButtonStatus);
	
	//Step2
	$(".icon-question-sign").click(handleQuestionClick);
	$("input[name='env']").change(enableDisableDropdown);
	submit2.click(finishStep2);

	//Step3
	submit3.click(finishStep3);
    }
    
    if($(".progress").length > 0) {
//        checkStatusResult();
	updatePage();
	submit4.click(finishStep4);
    }

    $("input[name='env']").change(enableDisableDropdown);

    if($("#results").length >0) {
        $("#results").dataTable();
    }
};

window.onbeforeunload = function(){
//TODO
};
