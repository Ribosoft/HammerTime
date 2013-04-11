//Fetch from database
function FetchAccessionNumberSequence()
{
    var sequence = $("#accession").find("input").val();
    //var url = "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id="+
    //sequence + "&rettype=fasta&retmode=text";
    console.log("sequence accession # " + sequence);
    var url = "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi";
    $.ajax({
        type: "GET",
        url: url,
        data: {
            db: 'nuccore',
            'id': sequence,
            rettype: 'fasta',
            retmode: 'text'
        },
        success: function(d) {
            loadInputToDisplay(d.toString());
        },
        error: function(jqXHR, textStatus, errorThrown) {
            switch (textStatus) {
                case "error":
                    alert("errorThrown is " + errorThrown);
            }
        }
    });
}

function loadInputToDisplay(str){
    //TODO Add stuff to clean out input text
    $("#sequence-display")[0].value = str;
}

//File drop
var fileLoader = function() {
    var reader = new FileReader();
    var file;
    return {
        readFile: function(fileToRead) {
            reader.readAsText(fileToRead);
            $('.head').text(file.name.substr(0, file.name.length - 4));
            reader.onload = function() {
                loadInputToDisplay(reader.result);
            };
        },
        handleFileSelect: function(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            file = evt.dataTransfer.files[0]; // file object uploaded
            fileLoader.ReadFile(file);
        },
        handleDragOver: function(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
        }
    };
};

window.onload = function() {
    var button1 = document.getElementById("submit1");
    $('#submit_ACN').click(FetchAccessionNumberSequence);
    var dropZone = document.getElementById('drop-zone');
    dropZone.addEventListener('dragover', fileLoader.handleDragOver, false);
    dropZone.addEventListener('drop', fileLoader.handleFileSelect, false);
};