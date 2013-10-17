var app = require(process.cwd()+'/app').app,
    request = require('supertest'),
    should = require('should'),
    mongoose = require('mongoose');
    
var Request = mongoose.model('Request');

function errorHandler(err, done){
    if(err)
	done(err)
}

describe('API: /design', function(){
    it('POST /design with sequence only', function(done) {
        var sequence = 'ATGC'
        request(app).post('/ribosoft/design')
                .send({
                    sequence: sequence
                })
                .expect(200)
                .end(function(err, res) {
		    errorHandler(err, done);
                    var body = res.body;
                    body.should.have.property('id').with .lengthOf(4);
                    Request.findOne({uuid: body.id}, function(err, result) {
			errorHandler(err, done);
                        sequence.should.equal(result.sequence);
                        done();
                    });
                });
    });

    it('POST /design with sequence and accessionNumber', function(done) {
        var accessionNumber = 'M73307';
        var sequence = 'TTTGAGGTCAAGCCAGAGAAGAGGTGGCAACACATCAGCATGATGCATGTGAAGATCATCAGGGAGCACA\
                        TCTTGGCCCACATCCAACACGAGGTCGACTTCCTCTTCTGCATGGATGTAGACCAGGTCTTCCAAGACAA\
                        TTTTGGGGTGGACACCCTAGGCCAGTCAGTGGATCAGCTACAGCCCTGGTGGTACAAGGCAGATCCTGAG\
                        GACTTTACCTAGGAAAGGCAGAAAGAGTCAGCAGCATGCATTCCATTTGGCCAGGGGGATTTTTATTACC\
                        ACACAGCCATGTTTGGAGGAACACCCATTCAGGTTCTCAACATCCCCCAGGAGTGCTTTAAAGGAATCCT\
                        CCTGGAAAAGAAAAATGACAT';
        request(app).post('/ribosoft/design')
                .send({
                    sequence: sequence,
                    accessionNumber: accessionNumber
                })
                .expect(200)
                .end(function(err, res) {
		    errorHandler(err, done);
                    var body = res.body;
                    body.should.have.property('id').with .lengthOf(4);
                    Request.findOne({uuid: body.id}, function(err, result) {
			errorHandler(err, done);
                        sequence.should.equal(result.sequence);
                        accessionNumber.should.equal(result.accessionNumber);
                        done();
                    });
                });
    });

    it('POST /design, POST /summary', function(done) {
        var sequence = 'ATGC'
        request(app).post('/ribosoft/design')
            .send({
                sequence: sequence
            })
            .expect(200)
	    .end(function(err, res) {
		errorHandler(err, done);
                var body = res.body;
                body.should.have.property('id').with .lengthOf(4);
                Request.findOne({uuid: body.id}, function(result) {
		    var id = body.id;
                    sequence.should.equal(result.sequence);
                    request(app).post('/ribosoft/summary/'+id)
		    .send({
			region: '5',
			env: 'vitro',
			temperature: '37',
			naC: '150',
			mgC: '0',
			oligoC: '200',
			cutsites: 'GUC',
			foldShape: 'Basic'
		    })
		    .expect(200)
		    .end(function(err, res) {
			errorHandler(err, done);
			console.log('res'+res);
			done();
		    });
                });
            });
    });

});
