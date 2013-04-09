var data;

//Sequence selection mechanisms

//Fetch from database
function FetchAccessionNumberSequence()
{
    var sequence = $("#accession").find("textarea").val();
    //var url = "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id="+
            sequence+"&rettype=fasta&retmode=text";
    var url ="http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi";
    $.ajax({
          type: "GET",
          url : url,
          data : {
              'db': 'nuccore',
              'id' : sequence,
              'rettype' : 'fasta',
              'retmode' : 'text'
           },
          success : function(d){
                data = d;
                $("#sequenceDisplay")[0].value = d.toString();
          },
          error : function(jqXHR, textStatus, errorThrown ){
            switch(textStatus){
                case "error":
                    alert("errorThrown is "+errorThrown);
            }
          }
    });
}

//File drop
var fileLoader = {
    reader : new FileReader(),
    file : {
        name : ""
    },
    ReadFile : function(fileToRead){
        this.reader.readAsText(fileToRead);
        $('.head').text(this.file.name.substr(0, this.file.name.length - 4));
        this.reader.onload = this.LoadFile;
    },
    LoadFile: function (){
        var value = fileLoader.reader.result;
        $("#sequenceDisplay")[0].value = value;
    },
    handleFileSelect: function(evt){
        evt.stopPropagation();
        evt.preventDefault();

        files = evt.dataTransfer.files; // FileList object.

        // files is a FileList of File objects. List some properties.
        var file = files[0];
        fileLoader.ReadFile(file);
    },
    handleDragOver : function(evt){
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }
};


window.onload = function() {
    var button1 = document.getElementById("submit1");
    button1.addEventListener("click", nextStep, false);
    $('#submit_ACN').click(FetchAccessionNumberSequence);
    var dropZone = document.getElementById('drop-zone');
    dropZone.addEventListener('dragover', fileLoader.handleDragOver, false);
    dropZone.addEventListener('drop', fileLoader.handleFileSelect, false);
};

function nextStep() {
    var div_step1 = document.getElementById("step1");
    var div_step2 = document.getElementById("step2");
    div_step1.className += " hidden";
    div_step2.className = "step";
}


