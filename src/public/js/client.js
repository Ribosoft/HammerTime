//NOTE: All the String methods were moved to client_utils.js
//FileLoader is defined in client_utils.js
//Candidate generation functions are moved to client_algo.js

/********* Step 0 **********/
function finishStep0(){
    $("#step0").addClass("invisible");
    $("#step1").removeClass("invisible");
}

/********* Step 1 **********/

var request = new Request();
var seqInput = new SequenceInput($('#sequence-display')[0]);
var fileLoader = new FileLoader();
var seqAlert = new SequenceAlert($("#sequence_alert"),$("#sequence_alert"));
var submit1 = new Button($("#submit1"));
var searchAccession = new Button($('#submit_ACN'));
var accessionAlert = new AccessionAlert($("#accession_alert"));

function fetchInputAccessionNumber(){
    var validator = new  AccNumberValidator($("#accession").val());
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
    $("#step1").addClass("invisible");
    accessionAlert.hide();
    seqAlert.hide();
    seqInput.emptyText();
    fieldSet.setState(!!request.accessionNumber);
    request.originalSequence = request.sequence;
    $("#step2").removeClass("invisible");
    $(".section-collapse").click(ToggleVisibilityClick);
    $(".section-expand").click(ToggleVisibilityClick);
    //Default value needs to be set when refreshing page
    $("#envVivo").val("mouse");
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
var fieldSet = new SmartFieldSet($("fieldset[name='region']"), $("#region-help"), $("#targetRegionRow"));
var summary = new SummaryTable();
var designAlert = new SequenceAlert($("#designAlert"),$("#designAlert2"));

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

function dropdownListen(event){
    if(this.value == "other"){
	$(".otherEnv").removeClass("invisible");
    }
    else
	$(".otherEnv").addClass("invisible");
};


/* The functions below are taken from https://bitbucket.org/gbelmonte/jsutilities */
function _toggleVisibility( target )
{
    var now = target.next().css('display');
    var speed = target.attr('speed');
    if(now != 'none')
    {
        target.removeClass('section-collapse')
        target.addClass('section-expand');
	$("#arm-help").addClass("invisible");
	$("#promoter-help").addClass("invisible");
        target.next().hide( speed == undefined? 0 : parseInt(speed));
      //  target.html(target.html().replaceAll('-','+'));
    }
    else
    {
        target.addClass('section-collapse')
        target.removeClass('section-expand');
        $("#arm-help").removeClass("invisible");
	$("#promoter-help").removeClass("invisible");
	target.next().show( speed == undefined? 0 : parseInt(speed));
       // target.html(target.html().replaceAll('\\+','-')); // plus is a regex expression reserved character. we must escape it
    }
}

/*
  For events bound with OnClick or onclick attributes
*/
function ToggleVisibilityOnClick(e)
{
    var target = $(e);
    _toggleVisibility(target);
}

/*
  For events bound with jQuery $().click()
*/
function ToggleVisibilityClick(e)
{
    var target = $(e.target);
    _toggleVisibility(target);
}


function finishStep2(event)
{
    var data = $("#design-form").serializeArray();
    request.extractData(data);
    if(request.accessionNumber && !request.region) {
	designAlert.setState({ok:false, error:"You must specify the target region when using the accession number"});
    }
    else if(!request.env || (request.env.type == "vivo" && !request.env.target)){
	designAlert.setState({ok:false, error:"You must specify the target environment and target organism (if in-vivo)"});
    } else { // All ok
    designAlert.hide();
    designAlert.setState({ok:true, error:"Searching for UTR..."});
    summary.setTableData(request);
    $("body").css("cursor","wait");
    $("#submit").css("cursor","wait");
    request.sequence = request.originalSequence;
    if( request.accessionNumber == undefined || request.accessionNumber == "") 
    {
      $("body").removeAttr("style");
      $("#submit").removeAttr("style");
      designAlert.hide();
      $("#step2").addClass("invisible");
      $("#step3").removeClass("invisible");
    }
    else
    {
      FindUTRBoundaries( function findingDone(e) 
        {
          if (e)
          {
            $("#step2").addClass("invisible");
            $("#step3").removeClass("invisible");
          }
          $("body").removeAttr("style");
          $("#submit").removeAttr("style");
          designAlert.hide();
        }
      );
    }
    }
}

/******* Step 3 ********/
var submit3 = new Button($("#submit3"));
var back3 = new Button($("#back3"));
var submissionAlert = new SequenceAlert($("#submitAlert"),$("#submitAlert2"));

function finishStep3(){
    submissionAlert.hide();
    request.submitRequest(function(err, location){
	if(err){
	    submissionAlert.setState({ok:false, error:""+err});
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
var emailReporter = new EmailReporter(
    $("#input-email"),
    $("#confirmation-email"),
    $("#emailAlert"));


function updatePage() {
    var countErrors = 0;
    var timeoutInterval = 1000 * 60 * 1;
    request.getRequestStatus(function(err, data){
	if(!err){
	    var remainingMin = data.duration.remainingDuration * 1000 * 60;
	    timeoutInterval = remainingMin / 10;
	    progressBar.update(data.duration.remainingDuration);

	    console.log( "State of request = "+data.state );
//	    stateReporter.updateState(data.state);
	    resultsPanel.updatePanel(data.status);
	} else {
	    countErrors +=1;
	    if(countErrors > 3)
		clearTimeout(timeout);
	}
	var timeout = setTimeout(updatePage, timeoutInterval);
	if(data && data.duration.remainingDuration == 0)
	    clearTimeout(timeout);
    });
};

function finishStep4(){
    window.location.replace(window.location.href.replace('processing','results'));
};



window.onload = function() {
    $("#start_now").click(finishStep0);

    if($("#step1").length){
	//Step1
	submit1.click(finishStep1);
	searchAccession.click(fetchInputAccessionNumber);
	seqInput.emptyText();
	$('#selectFileInput').change(FileLoader.handleFileBrowsed);
	$('#sequence-display').bind('input propertychange', setSubmitButtonStatus);
	
	//Step2
	submit2.click(finishStep2);
	$(".icon-question-sign").click(handleQuestionClick);
	$("input[name='env']").change(enableDisableDropdown);
	$("#envVivo").change(dropdownListen);


	//Step3
	submit3.click(finishStep3);
	back3.click(function(){
	    window.location.hash = "#step2";
	});
    }
    
    if($(".progress").length > 0) {
	updatePage();
	submit4.click(finishStep4);
	$("#emailSubmit").click(function(){
	    emailReporter.submit($("#emailInput").val());
	});
    }

    if($("#results").length > 0) {
        $("#results").dataTable();
	$("#results tr").click(showExtraInfo);
	$("td.specificity-entry").click(showAlertOffTarget);
    }

    _toggleVisibility($("fieldset[name^=advanced] > legend"));
};

var showAlertOffTarget = function(ev){
    var target = $(ev.target);
    try{
        var inx = target.attr('info').split(',');
        var offtar_hits = results.CutsiteTypesCandidateContainer[parseInt(inx[0])].Cutsites[parseInt(inx[1])].OfftargetLocations ;
    var marr = new Array();
  for(var kk = 0 ; kk < offtar_hits.length ; ++kk)
{
  var offtarHit = offtar_hits[kk].split(',');
  offtarHit[0] =  "Gene: <a href='http://www.ncbi.nlm.nih.gov/nuccore/"+offtarHit[0]+"'>" +offtarHit[0] +"</a>";
  offtarHit[1] =  "Percent Match: "+offtarHit[1];
  offtarHit[2] =  "Location at Gene: "+offtarHit[2].substr(1);
  marr.push( offtarHit.join("&nbsp;&nbsp;&nbsp;") );
}
  
  $("#print").html(marr.join('<br>'));
	ev.stopPropagation();
	$("#offtargetModal").modal();
    }
    catch (err) {
	console.error(err);
    }
};

var showExtraInfo = function(ev){
    var target = $(ev.currentTarget.children[6]);
    var indexes = target.attr('info').split(',').map(function(el){
	return parseInt(el);
    });
    var candidate = results.CutsiteTypesCandidateContainer[indexes[0]].Cutsites[indexes[1]].Candidates[indexes[2]];
    $("#sequence").html(GetDisplayHtmlForCandidate (candidate , false ));
    document.getElementById("download-link").href="data:text/plain,"+candidate.Sequence;
    $("#resultModal").modal();
};


var replayStep1 = function(){
    $("#step2").addClass("invisible");
    $("#step1").removeClass("invisible");
};

var replayStep2 = function(){
    $("#step3").addClass("invisible");
    $("#step2").removeClass("invisible");
};

var replayStep0 = function(){
    $("#step1").addClass("invisible");
    $("#step0").removeClass("invisible");
};

window.onhashchange = function(event){
    var stepBack = function(oldURL, newURL){
	return newURL < oldURL;
    };

    if(stepBack(event.oldURL, event.newURL)){
	if(event.newURL.endsWith("#step1"))
	    replayStep1();
	else if(event.newURL.endsWith("#step2"))
	    replayStep2();
	else if(event.newURL.endsWith("ribosoft/"))
	    replayStep0();
    }
}
