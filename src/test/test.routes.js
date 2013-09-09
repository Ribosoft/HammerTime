var app = require(process.cwd()+'/app').app,
    request = require('supertest'),
    should = require('should'),
    mongoose = require('mongoose');
    
var Request = mongoose.model('Request');

describe('/design', function(){
    it('POST /design with sequence only', function(done) {
        var sequence = 'ATGC'
        request(app).post('/ribosoft/design')
                .send({
                    sequence: sequence
                })
                .expect(200)
                .end(function(err, res) {
                    if (err)
                        return done(err);
                    var body = res.body;
                    body.should.have.property('id').with .lengthOf(4);
                    Request.findOne({uuid: body.id}, function(err, result) {
                        if (err)
                            done(err);
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
                    if (err)
                        return done(err);
                    var body = res.body;
                    body.should.have.property('id').with .lengthOf(4);
                    Request.findOne({uuid: body.id}, function(err, result) {
                        if (err)
                            done(err);
                        sequence.should.equal(result.sequence);
                        accessionNumber.should.equal(result.accessionNumber);
                        done();
                    });
                });
    });
});
