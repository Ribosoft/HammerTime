var indexUrl = window.location.href.indexOf("client_tests");
var testMode = (indexUrl !== -1);
if(testMode){   
    var urlLocation =  window.location.href.substr(0, indexUrl) + 'ribosoft/';
    var testEmailUser = "test@test.test";
}

function Env(type, target){
    //type is either "vivo" or "vitro"
    this.type = type;
    this.target = target;
}

function Request(
    seq,
    accessionNumber,
    foldShape,
    tempEnv,
    naEnv,
    mgEnv,
    oligoEnv,
    cutsites,
    targetRegion,
    targetEnv,
    vivoEnv,
    left_arm_min,
    right_arm_min,
    left_arm_max,
    right_arm_max,
    promoter,
    emailUser){
    this.id = '';
    this.sequence = seq;
    this.accessionNumber = accessionNumber;
    this.foldShape = foldShape;
    this.temperature = tempEnv;
    this.naC = naEnv;
    this.mgC = mgEnv;
    this.oligoC = oligoEnv;
    this.cutsites = cutsites;
    this.left_arm_min = left_arm_min;
    this.right_arm_min = right_arm_min;
    this.left_arm_max = left_arm_max;
    this.right_arm_max = right_arm_max;
    this.env = targetEnv? new Env(targetEnv, vivoEnv) : undefined;
    this.region = targetRegion;
    this.promoter = (promoter == "yes") ? 1 : 0;
    this.emailUser = testEmailUser || emailUser;
}

Request.prototype.submitRequest = function(callback){
    var data = JSON.stringify(this);
    var url = window.location.href.substr(0, window.location.href.indexOf("#"));
    $.ajax({
        type: "POST",
        url: (urlLocation || url)+"requests/",
        data: data,
	contentType: "application/json; charset=utf-8",
        success: function(data, status, xhr) {
	    callback(null, xhr.getResponseHeader("Location"));
        },
        error: function(jqXHR, textStatus, errorThrown) {
	    callback(new Error("Submitting request failed because "+errorThrown)); 
        }
    });
};

Request.prototype.updateRequest = function(callback){
    var data = JSON.stringify(this);
    var url = window.location.href.replace('processing', 'requests');
    $.ajax({
        type: "PUT",
        url: (urlLocation || url),
        data: data,
	contentType: "application/json; charset=utf-8",
        success: function(data, status, xhr) {
	    callback(null, data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
	    callback(new Error("Submitting request failed because "+errorThrown)); 
        }
    });
};

Request.getRequest = function(callback){
    url = window.location.href.replace('processing' , 'requests');
    $.ajax({
        type: "GET",
        url: url,
        data: {},
	contentType: "application/json; charset=utf-8",
        success: function(data, status, xhr) {
	    var response = data.request;
	    var request = new Request(
		response.sequence,
		response.accessionNumber,
		response.foldShape,
		response.temperature,
		response.naC,
		response.mgC,
		response.oligoC,
		response.cutsites,
		response.region,
		response.env.type,
		response.env.target,
		response.left_arm_min,
		response.right_arm_min,
		response.left_arm_max,
		response.right_arm_max,
		(response.promoter)? "yes" : "",
		response.emailUser
	    );
	    callback(null, request);
        },
        error: function(jqXHR, textStatus, errorThrown) {
	    callback(new Error("Getting request information failed because "+errorThrown)); 
        }
    });
}

Request.prototype.getRequestStatus = function(callback){
    $.ajax({
        type: "GET",
        url : window.location.href.replace('processing','requests') + '/status',
        data : {extraInfo: 'true'},
        success : function(data) {
	    callback(null, data);
        },
        dataType : "json",
	contentType: "application/json; charset=utf-8",
        error : function(err) {
	    callback(new Error("Server not responding"));
        }
    });
};


Request.prototype.extractData = function(obj){
    for(var i = 0; i < obj.length; ++i){
	this[obj[i].name] = obj[i].value;
    }

    var cutsites = [];
    for(var i = 0; i < obj.length; ++i) {
	if(obj[i].name == "cutsites")
	    cutsites.push(obj[i].value);
    }
    this.cutsites = cutsites;

    this.promoter = parseInt(this.promoter) == 1;

    if(this.env){
	var tmp = this.env;
	delete this.env;
    
	this.env = new Env(tmp, tmp =="vivo" ? this.envVivo: "");
	if(this.env.target == "other"){
	    this.env.target = this.otherEnv;
	    delete this.otherEnv;
	}
    }
    delete this.envVivo;
};


