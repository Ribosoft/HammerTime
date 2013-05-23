function Complement( oligo )
{
	var res = new Array();
	for(var ii = 0; ii < oligo.length; ++ii)
	{
		var c = oligo[ii];
		switch(c)
		{
			case 'G':
				res.push('C');
				break;
			case 'C':
				res.push('G');
				break;
			case 'A':
				res.push('U');
				break;
			case 'U':
				res.push('A');
				break;
			default:
				res.push(c);
		}
	}
	return res.join('');
}

function Reverse( oligo )
{
	return oligo.split("").reverse().join("");
}

function ReverseComplement(oligo)
{
	return Complement(Reverse(oligo));
}

function Length (oligo)
{
	var res = 0;
	for(var ii = 0; ii < oligo.length; ++ii)
	{
		var c = oligo[ii];
		switch(c)
		{
			case 'G':
				res +=1;
				break;
			case 'C':
				res +=1;
				break;
			case 'A':
				res +=1;
				break;
			case 'U':
				res +=1;
				break;

		}
	}
	return res;
}