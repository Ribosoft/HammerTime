function FileLoader(textField) {}

FileLoader.readFile = function(fileToRead) {
    var reader = new FileReader();
    reader.readAsText(fileToRead);
    reader.onload = function() {
	var input = reader.result;
	var validation = InputValidation.isInputValid(input);
	seqInput.setText(input);
	request.sequence = InputValidation.cleanInput(input);
	seqAlert.setState(validation);
        if(validation.ok){
	    submit1.enable();
        }
        request.accessionNumber = '';
    };
}

FileLoader.handleFileBrowsed  = function(evt) {
    file = $('#selectFileInput')[0].files[0];
    FileLoader.readFile(file);
}

String.prototype.endsWith = function(substr){
    return this.substring(this.indexOf(substr)) == substr;
};


String.prototype.indexOfMultiple=function(Arr) 
{
    var indexs = new Array();
    //Make an array of the multiple first instances of Arr[ii]
    for(var ii = 0; ii < Arr.length ; ++ii)
    {
	indexs.push(this.indexOf(Arr[ii]));
    }
    
    var min = this.length;
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

AccNumberValidator.prototype.validate = function(successCallback, errorCallback){
    var self = this;
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
	    self.isValid = true;
            successCallback(d);
        },
        error: function(jqXHR, textStatus, errorThrown) {
	    self.isValid = false;
            errorCallback(errorThrown);
        }
    });
}

AccNumberValidator.prototype.getValidAccessionNumber = function(){
    return this.isValid? this.accessionNumber : '';
}

AccNumberValidator.prototype.getAccessionNumber = function(){
    return this.accessionNumber;
}


function AccessionAlert(el){
    this.el = el;
}

//States: ["Searching", "Success", "Failure"]
AccessionAlert.prototype.setState = function(state){
    switch(state){
    case "Searching":
	this.el.removeClass("invisible alert-error alert-success");
	this.el.text("Searching NCBI database...");
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

AccessionAlert.prototype.hide = function(){
    this.el.addClass("invisible");
};


function InputValidation(){}

InputValidation.validateInput= function(input){
    var badInput = false;
    var Problems = '';
    var isRNA = true;
    if(input == "")
        return {"ok" : false , "error" : "Empty Input"};
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


InputValidation.cleanInput = function( input )
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

InputValidation.isInputValid = function(str){
    return InputValidation.validateInput(InputValidation.cleanInput(str));
};


function SequenceInput(el){
    this.el = el;
}

SequenceInput.prototype.isInputValid = function(){
    return InputValidation.isInputValid(this.el.value);
};

SequenceInput.prototype.setText = function(text){
    this.el.value = text;
};

SequenceInput.prototype.getText = function(){
    return this.el.value;
};


SequenceInput.prototype.emptyText = function(){
    this.el.value = "";
};


function SequenceAlert(el){
    this.el = el;
}

//state = {"ok": "true/false" , "error" : "<str>"}
SequenceAlert.prototype.setState = function(state){
    this.el.removeClass("invisible");
    if(state.ok === false){
	this.el.addClass("alert-error").removeClass("alert-success");	
    }
    else {
	this.el.removeClass("alert-error").addClass("alert-success");
    }
    this.el.text(state.error);
};

SequenceAlert.prototype.hide = function(){
    this.el.addClass("invisible");
    this.el.removeClass("alert-error alert-success");
};

SequenceAlert.prototype.show = function(){
    this.el.removeClass("invisible");
};


function Button(el){
    this.el = el;
}

Button.prototype.click = function(callback){
    this.el.click(callback);
}

Button.prototype.disable = function(){
    this.el.addClass("disabled");
}

Button.prototype.enable = function(){
    this.el.removeClass("disabled");
};

function DesignContent(formEl, iconEls, designHelpEl) {
    this.mapHelp = {
	'region' : "Region describes the specific region in the sequence which will be targetted by the Hammerhead Ribozyme",
	'env' : "The target environment is either in-vivo or in-vitro",
	'envProperties' : "These parameters describe the environment of operation of the Hammerhead Ribozyme",
	'cutsites' : "Cutsites represent a sequence of DNA which will be targeted by the Hammerhead Ribozyme",
	'shape' : "Wishbone is a U-shaped form, while basic is a non-wishbon form",
	'advanced-arm' : "These parameters relate to the length of each arm strand on the Ribozyme",
	'advanced-promoter' : "T7 promoter"
    };
    this.designForm = formEl;
    this.questionIcons = iconEls;
    this.designHelp = designHelpEl;
}

DesignContent.prototype.showDesignHelp = function(event){
    var elem = $(event.target);
    if(!elem.attr('expanded'))
    {
	this.designHelp.removeClass("invisible");
	var css1 = this.designForm.css('width');
	var css2 = this.questionIcons.css('margin-right');
	elem.attr('expanded', css1+';' + css2 );
        this.designForm.animate({'width':'50%'},250);
	this.questionIcons.animate({'margin-right':'0%'},250);
	this.designForm.addClass("pressed");
	$(elem).popover();
    }
    else
    {
	this.designHelp.addClass("invisible");
	var css = elem.attr('expanded').split(';');
	elem.attr('expanded','');
	this.designForm.removeClass("pressed");
	this.designForm.animate({'width':css[0]},250);
	this.questionIcons.animate({'margin-right':css[1]},250);
    }
}

function SmartDropdown(el){
    this.el = el;
}

SmartDropdown.prototype.setState = function(currentState, disable){
    disable?
	this.el.prop("disabled", currentState):
	this.el.prop("disabled", !currentState);
}

function TypeaheadInput(id){
    this.id = id;
    var input = this.input = completely(document.getElementById(id));
    var fetch = this.fetchOptions;
    this.input.onChange = function(text){
	if(text){
	    fetch(text, function(err, options){
		if(!err){
		    input.options = options;
		    input.repaint();
		}
	    });
	}
    };
}

TypeaheadInput.fetchOptions = function(query, callback){
        $.ajax({
        type: "GET",
        url: "http://blast.ncbi.nlm.nih.gov/portal/utils/autocomp.fcgi?dict=taxids_sg&q="+query,
        data: {},
        success: function(str) {
	    var regex = new RegExp("^(.*)Array\((.*)\, \d\);$");
	    if(str.match(regex)){
		console.log( str.match(regex) );
	    }
            callback(null, str);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            callback(errorThrown);
        }
    });    
};


function SmartFieldSet(el, elHelp, elRow){
    this.el = el;
    this.elHelp = elHelp;
    this.elRow = elRow;
}

SmartFieldSet.prototype.setState = function(show){
    if(!show){
	this.el.addClass("invisible");
	this.elHelp.addClass("invisible");
	this.elRow.addClass("invisible");
    }
}
	

function SummaryTable(){}

SummaryTable.prototype.setTableData = function(data){
    if(data.env.target){
	$("#vivoEnvRow").removeClass("invisible");
    }
    $("#seqLength").text(data.sequence.length + " nucleotides");
    $("#targetRegion").text(data.region);
    $("#targetEnv").text("In-"+data.env.type);
    $("#vivoEnv").text(data.env.target);
    $("#tempEnv").text(data.temperature);
    $("#naEnv").text(data.naC);
    $("#mgEnv").text(data.mgC);
    $("#oligoEnv").text(data.oligoC);
    $("#cutsites").text(data.cutsites.join(", "));
    $("#foldShape").text(data.foldShape);
    $("#promoter").text(data.promoter ? "Yes" : "No");
    $("#leftArm").text("Between "+ data.left_arm_min + " and "+data.left_arm_max);
    $("#rightArm").text("Between "+ data.right_arm_min + " and "+data.right_arm_max);
}

function BackPressHandler(){}

BackPressHandler.handler = function(event){
    if(!$("#step2").hasClass("invisible"))
	;
};

function ProgressBar(el, elText, request){
    this.el = el;
    this.elText = elText;
    this.request = request;
    this.timeSoFar = 0; //in min
    this.now = new Date();
}

ProgressBar.prototype.update = function(duration){
    this.elText.text(duration + " minutes"); 
    this.timeSoFar += (this.now - new Date()) / (1000 * 60);
    var percentage = this.timeSoFar / (this.timeSoFar + duration);
    this.el.css('width',(percentage+1)+"%");
    this.now = new Date();
}

function StateReporter(el){
    this.el = el
};

// str is a '\n'-separated string
StateReporter.prototype.updateState = function(str){
    var stateLog = str;
    while(stateLog.indexOf('\n') != -1)
    {
        stateLog = stateLog.replace('\n','</div><br><div class="state-log">');
    }
    this.el.html('<div class="state-log">' + stateLog + '</div>' );
}

function ResultsPanel(el){
    this.el = el;
};

ResultsPanel.prototype.updatePanel = function(status){
    if(status == "Processed") {
        this.el.removeClass("invisible");
    }
}

function EmailReporter(panel1, panel2, alert){
    this.panel1 = panel1;
    this.panel2 = panel2;
    this.alert = new SequenceAlert(alert);
}

EmailReporter.prototype.submit = function(value){
    this.alert.hide();
    if(!value)
    {
	this.alert.setState({ok: false, error:"Email Input is empty."});
	this.alert.show();
	return;
    }
    var self = this;
    Request.getRequest(function(err, request){
	if(err){
	    self.alert.setState({ok: false, error:"Could not reach the server. Please try again later."});
	    self.alert.show();
	}
	else{
	    request.emailUser = value;
	    request.updateRequest(function(err, request){
		if(err) {
		    self.alert.setState({ok: false, error:"Could not reach the server. Please try again later."});
		    self.alert.show();
		}
		else {
		    self.panel1.addClass("invisible");
		    self.panel2.removeClass("invisible");
		}
	    });
	}
    });
}

