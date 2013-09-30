var utils = require('./route_utils'),
mongoose = require('mongoose'),
request = require('request');

var Request = mongoose.model('Request');

module.exports = {
    createRequest : function(req, res, next) {
	function fetchAccession (accession, successCallback, errorCallback) {
	    request({
		uri: "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=re&id="+accession+"&rettype=fasta&retmode=text",
		method: "GET",
		followRedirect : false
	    }, function(err, res, body) {
		if(!err && res.statusCode == 200) {
		    var seq = body.split('\n');
		    seq.shift();
		    successCallback(seq.join(""));
		} else {
		    errorCallback(err);
		}
	    });
	};

	function checkAccession(sequence, accessionNumber, callback, next){
	    if (!sequence && !accessionNumber)
	    {
		utils.returnError(400, "No sequence was submitted.", next);
	    } 
	    else if(!sequence && accessionNumber) {
		fetchAccession(accessionNumber, function(seq) {
		    callback(sequence, accessionNumber);
		}, function(error){
		    utils.returnError(400, "Accession Number is invalid.", next);
		    accessionNumber = '';
		});
	    } 
	    else if (sequence && accessionNumber) {
		fetchAccession(accessionNumber, function(seq) {
		    if(sequence !== seq){
			utils.returnError(400, "Sequence and accession number do not match.", next);
			accessionNumber = '';
			sequence = '';
		    } else {
			callback(sequence, accessionNumber);
		    }
		}, function(error){
		    utils.returnError(400, "Accession Number is invalid.", next);
		    accessionNumber = '';
		});
	    } else {
		callback(sequence, '');
	    }
	};

	checkAccession(req.body.sequence,
		       req.body.accessionNumber,
		       function(seq, number) {
			   if(!seq) {
			       utils.returnError(400, "No sequence was submitted.", next);
			   } else {
			       var id = utils.generateUID();
			       var vivoEnv = (req.body.env.type === "vivo") ? req.body.env.target : '';
			       var region = utils.toTargetRegion(req.body.region);
			       Request.createRequest(id,
						     seq,
						     number,
						     req.body.foldShape,
						     parseInt(req.body.temperature),
						     parseInt(req.body.naC),
						     parseInt(req.body.mgC),
						     parseInt(req.body.oligoC),
						     req.body.cutsites,
						     region,
						     (req.body.env.type === "vivo"),
						     vivoEnv
						    ).save(
							utils.onSaveHandler(function(result) {
							    if(!result){
								utils.returnInternalError(next);
							    } else {
								res.location(req.protocol + "://"+ req.get('Host') + req.url + id);
								res.status(201);
								res.end();
							    }
							}),
							next);
			   }
		       }, next);
    },
    getRequest : function(req, res, next) {
	var uuid = req.params.id;
	Request.findOne({uuid: uuid}, function(err, result) {
            if (err)
		utils.returnInternalError(next);
	    else if(!result) {
		utils.returnError(404, "The request with id "+uuid+" does not exist", next);
            } else {
		var response = {
		    id: result.uuid,
		    sequence: result.sequence,
		    foldShape: result.foldShape,
		    temperature : result.tempEnv,
		    naC: result.naEnv,
		    mgC: result.mgEnv,
		    oligoC : result.oligoEnv,
		    cutsites : result.cutsites,
		    region: result.getRegion(),
		    env: result.getEnv()
		};
		if(result.accessionNumber)
		    response.accessionNumber = result.accessionNumber;
		res.json(200, response);
	    }
	});
    }
    
};
