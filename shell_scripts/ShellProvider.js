/*
Copyright (c) 2012 Lalith Balasubramanian (ICRL)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var shell = require('shelljs');
var fs = require('fs'); 
// import the settings file to configure environment
var SETTINGS = fs.readFileSync('./config/settings.json');
	SETTINGS = JSON.parse(SETTINGS);

ShellProvider = function() {

};

ShellProvider.prototype.get_files = function (callback){

	  var outArray = shell.exec('ls '+SETTINGS.output_folder);
	  outArray.output = outArray.output.split("\n");
	  
	  for(i=0;i<outArray.output.length;i++)
	  if(outArray.output[i]!=null && outArray.output[i]!="" && outArray.output[i].indexOf(".html") != -1 || outArray.output[i].indexOf(".zip") != -1){
 	  	  	outArray.output[i] = 'http://'+SETTINGS.host+':'+SETTINGS.port+'/output/'+outArray.output[i];
	  } else{
		    outArray.output.pop();
	  }
	  
	  if(outArray.code == 0){
		  callback(JSON.stringify({"status":"success","description":outArray}))
	  } else{
		  callback(JSON.stringify({"status": "error","description":outArray}))
	  }
  
}

ShellProvider.prototype.execute_conversion = function(files,callback){
      var path     = files['file']['path'],
          filename = files['file']['filename'],
          mime     = files['file']['mime'];
     
	  
      var conversion_params = ""; 
      var split_page_option = 0;    
      for(i=0;i<SETTINGS.conversion_params.length;i++){
      	  conversion_params += " "+SETTINGS.conversion_params[i];
      	  if(SETTINGS.conversion_params[i] == "--split-pages 1")
      	  split_page_option = 1;
      }

      console.log("Output conversion_params "+conversion_params);
      
      // Install Path + creates a folder by name data/filename(in regex).pdf == execute path
      var execute_path = SETTINGS.install_path+path;  
      var status;  
      
      if(split_page_option==0)  {
		  status = shell.exec('pdf2htmlEX '+execute_path+' --dest-dir '+SETTINGS.output_folder+' '+conversion_params);
      	  var regex_filePath = path.split("/");
		  regex_filePath = regex_filePath[regex_filePath.length-1]; 
		  var source_dir = SETTINGS.output_folder+regex_filePath.replace(".pdf",".html");
		  var dest_dir = SETTINGS.output_folder+filename.replace(".pdf",".html");			  
		  var move_status = shell.exec('mv '+source_dir+' '+dest_dir);
      }else if(split_page_option==1){
   		  shell.rm('-rf',SETTINGS.output_folder+'/'+filename.replace(".pdf",".*"));         		     		        
      	  status = shell.exec('pdf2htmlEX '+execute_path+' --dest-dir '+SETTINGS.output_folder+'/'+filename.replace(".pdf","")+' '+conversion_params);
   		  shell.exec('cd '+SETTINGS.output_folder+' && zip -9 -r '+filename.replace(".pdf",".zip")+' '+filename.replace(".pdf",""));    
   		  console.log('Zipping files -- '+'cd '+SETTINGS.output_folder+' && zip -9 -r '+filename.replace(".pdf",".zip")+' '+filename.replace(".pdf",""));  
		  //clean up the mess
   		  shell.rm('-rf',SETTINGS.output_folder+'/'+filename.replace(".pdf",""));         		     		  
      }
	  
	  
	  shell.rm('-rf',SETTINGS.install_path+'/data/*');
	  
	  if(status.code == 0){
		  console.log("\n\nSuccessful Conversion\n");
		  callback(JSON.stringify({"status":"success","conversion_description":status.output}))		  
	  }else{
		  callback(JSON.stringify({"status":"failed","description":status.output}))
	  }
    
}

exports.ShellProvider = ShellProvider;