var data ;


//Sequence selection mechanisms
		
	//Fetch from database
	function FetchAccessionNumberSequence()
	{
		
		$.post("http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id="+$("#accession").find("textarea").val()+"&rettype=fasta&retmode=text").success
		( 
			function (d) 
			{ 
				data = d; 
				$("#sequenceDisplay")[0].value = d.toString();
				alert("Sequence found\n" + d);
				
			}
		);
	}

	//File drop
	  var reader;
	  function ReadFile(fileToRead)
	  {
		reader = new FileReader();
		reader.readAsText(fileToRead);
		$('.head').text(file.name.substr(0,file.name.length - 4));
		reader.onload = LoadFile;
	  }
  
  
	function LoadFile()
	{
		var value = reader.result;
		$("#sequenceDisplay")[0].value = value;
	}
	
	function handleFileSelect(evt) 
	{
		evt.stopPropagation();
		evt.preventDefault();

		files = evt.dataTransfer.files; // FileList object.

		// files is a FileList of File objects. List some properties.

		file = files[0];
		
		ReadFile(file);
	}
	
	function handleDragOver(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
	}
	  
  
window.onload = function() {
    var button1 = document.getElementById("submit1");
    button1.addEventListener("click",nextStep,false);
	$('#submit_ACN').click(FetchAccessionNumberSequence);
	var dropZone = document.getElementById('drop-zone');
	dropZone.addEventListener('dragover', handleDragOver, false);
	dropZone.addEventListener('drop', handleFileSelect, false);
	};

function nextStep() {
    var div_step1 = document.getElementById("step1");
    var div_step2 = document.getElementById("step2");
    div_step1.className+= " hidden";
    div_step2.className= "step";
}   


