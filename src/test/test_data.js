module.exports = {
    smallSequence : {
	request : {
	    sequence : 'ATGC',
	    foldShape : 'Basic',
	    temperature : 37,
	    naC: 150,
	    mgC: 0,
	    oligoC: 0,
	    cutsites: ['GUC'],
	    region: ['5\''],
	    left_arm_min : 3,
	    left_arm_max : 8,
	    right_arm_min : 3,
	    right_arm_max : 8,
	    emailUser : '',
	    organization : '',
	    promoter : false,
	    specificity : "hybrid",
	    env: {
		type: 'vitro',
		target: ''
	    }
	},
	results : {},
	duration : {
	    remainingDuration : 234,
	    unit: 'min'
	},
	newRequest: {
	    sequence : 'ATGC',
	    foldShape : 'Basic',
	    temperature : 37,
	    naC: 150,
	    mgC: 0,
	    oligoC: 0,
	    cutsites: ['GUC'],
	    region: ['5\'', 'ORF'],
	    left_arm_min : 3,
	    left_arm_max : 8,
	    right_arm_min : 3,
	    right_arm_max : 8,
	    emailUser : 'test@test.test',
	    promoter: 0,
	    specificity : "cleavage",
	    env: {
		type: 'vitro',
		target: ''
	    }
	}
    },
    sequenceWithAcc : {
	request : {
	    sequence : 'TTTGAGGTCAAGCCAGAGAAGAGGTGGCAACACATCAGCATGATGCATGTGAAGATCATCAGGGAGCACATCTTGGCCCACATCCAACACGAGGTCGACTTCCTCTTCTGCATGGATGTAGACCAGGTCTTCCAAGACAATTTTGGGGTGGACACCCTAGGCCAGTCAGTGGATCAGCTACAGCCCTGGTGGTACAAGGCAGATCCTGAGGACTTTACCTAGGAAAGGCAGAAAGAGTCAGCAGCATGCATTCCATTTGGCCAGGGGGATTTTTATTACCACACAGCCATGTTTGGAGGAACACCCATTCAGGTTCTCAACATCCCCCAGGAGTGCTTTAAAGGAATCCTCCTGGAAAAGAAAAATGACAT',
	    accessionNumber : 'M73307',
	    foldShape : 'Basic',
	    temperature : 37,
	    naC: 150,
	    mgC: 0,
	    oligoC: 0,
	    cutsites: ['GUC'],
	    region: ['3\''],
	    left_arm_min : 3,
	    left_arm_max : 8,
	    right_arm_min : 3,
	    right_arm_max : 8,
	    emailUser : '',
	    promoter : false,
	    specificity : "hybrid",
	    env: {
		type: 'vitro',
		target: ''
	    }
	}
    },
    noTarget : {
	request : {
	    sequence : 'TTTA',
	    foldShape : 'Basic',
	    temperature : 37,
	    naC: 150,
	    mgC: 0,
	    oligoC: 0,
	    cutsites: ['GUC'],
	    left_arm_min : 3,
	    left_arm_max : 8,
	    right_arm_min : 3,
	    right_arm_max : 8,
	    emailUser : '',
	    promoter : false,
	    specificity : "hybrid",
	    env: {
		type: 'vitro',
		target: ''
	    }
	}
    },
    threeCutsites : {
	request : {
	    sequence : 'TTTA',
	    foldShape : 'Basic',
	    temperature : 37,
	    naC: 150,
	    mgC: 0,
	    oligoC: 0,
	    cutsites: ['GUC', 'AUC', 'CUC'],
	    left_arm_min : 3,
	    left_arm_max : 8,
	    right_arm_min : 3,
	    right_arm_max : 8,
	    emailUser : '',
	    promoter : false,
	    specificity : "hybrid",
	    env: {
		type: 'vitro',
		target: ''
	    }
	}
    },
    sequenceWithWrongAcc : {
	request : {
	    sequence : 'TTTGAGGTCAAGCCAGAGAAGAGGTGGCAACACATCAGCATGATGCATGTGAAGATCATCAGGGAGCACATCTTGGCCCACATCCAACACGAGGTCGACTTCCTCTTCTGCATGGATGTAGACCAGGTCTTCCAAGACAATTTTGGGGTGGACACCCTAGGCCAGTCAGTGGATCAGCTACAGCCCTGGTGGTACAAGGCAGATCCTGAGGACTTTACCTAGGAAAGGCAGAAAGAGTCAGCAGCATGCATTCCATTTGGCCAGGGGGATTTTTATTACCACACAGCCATGTTTGGAGGAACACCCATTCAGGTTCTCAACATCCCCCAGGAGTGCTTTAAAGGAATCCTCCTGGAAAAGAAAAATGACAT',
	    accessionNumber : 'M73306',
	    foldShape : 'Basic',
	    temperature : 37,
	    naC: 150,
	    mgC: 0,
	    oligoC: 0,
	    cutsites: ['GUC'],
	    region: ['ORF'],
	    left_arm_min : 3,
	    left_arm_max : 8,
	    right_arm_min : 3,
	    right_arm_max : 8,
	    promoter : false,
	    emailUser : '',
	    specificity : "hybrid",
	    env: {
		type: 'vitro',
		target: ''
	    }
	}
    },
    noData : {
	request : {
	    foldShape : 'Basic',
	    temperature : 37,
	    naC: 150,
	    mgC: 0,
	    oligoC: 0,
	    cutsites: ['GUC'],
	    region: ['3\'','ORF'],
	    left_arm_min : 3,
	    left_arm_max : 8,
	    right_arm_min : 3,
	    right_arm_max : 8,
	    emailUser : '',
	    promoter : false,
	    specificity : "hybrid",
	    env: {
		type: 'vitro',
		target: ''
	    }
	}
    },
    accessionNumberOnly : {
	request : {
	    accessionNumber : 'M73307',
	    foldShape : 'Basic',
	    temperature : 37,
	    naC: 150,
	    mgC: 0,
	    oligoC: 0,
	    cutsites: ['GUC'],
	    region: ['5\''],
	    left_arm_min : 3,
	    left_arm_max : 8,
	    right_arm_min : 3,
	    promoter : false,
	    right_arm_max : 8,
	    emailUser : '',
	    specificity : "cleavage",
	    env: {
		type: 'vitro',
		target: ''
	    }
	}
    },
    wrongAcc : {
	request : {
	    accessionNumber : 'A3323',
	    foldShape : 'Basic',
	    temperature : 37,
	    naC: 150,
	    mgC: 0,
	    oligoC: 0,
	    promoter : false,
	    cutsites: ['GUC'],
	    region: ['5\''],
	    left_arm_min : 3,
	    left_arm_max : 8,
	    right_arm_min : 3,
	    right_arm_max : 8,
	    specificity : "hybrid",
	    emailUser : '',
	    env: {
		type: 'vitro',
		target: ''
	    }
	}
    },
    emailData : {
	request : {
	    accessionNumber : 'M73307',
	    foldShape : 'Basic',
	    temperature : 37,
	    naC: 150,
	    mgC: 0,
	    oligoC: 0,
	    promoter : false,
	    cutsites: ['GUC'],
	    region: ['5\''],
	    left_arm_min : 3,
	    left_arm_max : 8,
	    right_arm_min : 3,
	    right_arm_max : 8,
	    specificity : "cleavage",
	    emailUser : 'user@example.org',
	    organization : 'Concordia University',
	    env: {
		type: 'vitro',
		target: ''
	    }
	}
    }
};
