var req = new Request('ATGC',
		      '',
		      'Basic',
		      37,
		      150,
		      0,
		      0,
		      ['GUC'],
		      '5\'',
		      'vitro',
		      '',
		      3,
		      3,
		      8,
		      8,
		      '');


var submitRequestWrapper = function(request){
    var res;
    request.submitRequest(function(err, data){
	res = data;
    });

    var count = 0;
    var interval = setInterval(function(){
	count++;
	if(res || count > 30){
	    clearInterval(interval);
	    return res;
	}
    },100);
};


var test_Model = new UnitTest(submitRequestWrapper);
test_Model.AddNewCase( [req], "http[s]?://(.*)/ribosoft/requests/(\w){4}" );
console.log( matchesRegex(test_Model) );
