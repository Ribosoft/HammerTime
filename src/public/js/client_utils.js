function FileLoader() {}

FileLoader.readFile = function(fileToRead) {
    var reader = new FileReader();
		reader.readAsText(fileToRead);
		reader.onload = function() {
			setDisplay(reader.result);
		};
	}

FileLoader.handleFileBrowsed  = function(evt) {
		file = $('#selectFileInput')[0].files[0];
    FileLoader.readFile(file);
	}

FileLoader.handleFileSelect  = function(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		
		file = evt.dataTransfer.files[0]; // file object uploaded
		FileLoader.readFile(file);
	}  
FileLoader.handleDragOver = function(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
	}
  

//Add functionality to native string, cause it is limited
String.prototype.indexOfMultiple=function(Arr) 
{
	var indexs = new Array();
	//Make an array of the multiple first instances of Arr[ii]
	for(var ii = 0; ii < Arr.length ; ++ii)
	{
		indexs.push(this.indexOf(Arr[ii]));
	}
	
	var min = this.length;//The first instance of an element in *this cannot be at an index greater than length (e.g. this is a big number)
	for(var ii = 0; ii < indexs.length; ++ii)
	{
		if(indexs[ii] != -1 && indexs[ii] < min)
			min = indexs[ii];
	}
	if(min == this.length)
		min = -1;
	return min;
}

String.prototype.replaceAt=function(index,string, len) 
{
if(len == undefined)
	len = 1;

  return this.substr(0, index) + string + this.substr(index+len);

}

String.prototype.replaceAll = function(find,replace)
{
	return this.replace(new RegExp(find, 'g'), replace);
}


//pads left
String.prototype.PadLeft = function(padString, length) {
	var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
}
 
//pads right
String.prototype.PadRight = function(padString, length) {
	var str = this;
    while (str.length < length)
        str = str + padString;
    return str;
}