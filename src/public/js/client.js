function FetchAccessionNumberSequence()
{
	
	$.post("http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id="+$("#accession").find("textarea").val()+"&rettype=fasta&retmode=text");
}

window.onload = function() {
    var button1 = document.getElementById("submit1");
    button1.addEventListener("click",nextStep,false);
	$('#submit_ACN').click(FetchAccessionNumberSequence);
	};

function nextStep() {
    var div_step1 = document.getElementById("step1");
    var div_step2 = document.getElementById("step2");
    div_step1.className+= " hidden";
    div_step2.className= "step";
}   


