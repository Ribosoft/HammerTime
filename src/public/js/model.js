var indexUrl = window.location.href.indexOf("client_tests");
var testMode = (indexUrl !== -1);
if(testMode){   
    var urlLocation = window.location.href.substr(0, indexUrl) + 'ribosoft/';
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
    this.env = new Env(targetEnv, vivoEnv);
    this.region = targetRegion;
    this.emailUser = testEmailUser || emailUser;
}

Request.prototype.submitRequest = function(callback){
    var data = JSON.stringify(this);
    $.ajax({
        type: "POST",
        url: (urlLocation || window.location.href)+"requests/",
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
