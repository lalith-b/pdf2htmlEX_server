#Introduction

A system that will accept a multipart form upload and load execute a pdf2htmlEX executable, 
to convert a pdf to an html document.


## Usage

    $>shjs server.js

## Specification

When the user picks a file from their computer and the form is submitted, the
upload begins. While uploading, the status text paragraph should be updating
with the current percentage complete at least once every 2 seconds. While
uploading, the user should be able to enter text into the title text field.

When the upload completes, the pdf2htmlEX executable is triggered and
the status text should display the path on the server to the saved file, 
and the current value of the title text field should be posted to the server. 
The response to the form post request should display both the title and the path 
to the file.


## Installation Notes

* Step 1 
	* Install Macports		-	for mac 
	* Install yum,apt-get etc 	-	for linux	   
* Step 2 	
 *  Install GCC > 4.4.6 and above
 *  Select GCC 4.7(preffered)  and above using	 - $sudo port select --list gcc
                                                 
* Step 3 : Install CMake,make,pkg-config
* Step 4 : Install poppler 0.20.4 +
* Step 5 : Install fontforge
* Step 6 : Install pdftohtmlEX		
* Step 7 : After Compilation test completely for pdf-html conversion.


## Dependancies

[**Shell.js**](https://github.com/arturadib/shelljs)

[**formidable.js**](https://github.com/felixge/node-formidable)

[**paperboy.js**](https://github.com/felixge/node-paperboy)

[**pdf2htmlEX and its dependancies**](https://github.com/coolwanglu/pdf2htmlEX)


## FAQ's

* Incase your compiler doesnt support round function, Edit the round code in text.cc in pdf2htmlEX to create a function like below.

    int round(double number){
    	return (number >= 0) ? (int)(number + 0.5) : (int)(number - 0.5);
    }

* To select the preferred gcc,

  * Use $sudo port select -list gcc
  * $sudo port select -set gcc

## Copyrights

(The MIT License)

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

## Contact

* Lalith Balasubramanian <lalith87@gmail.com>
  * Suggestions and questions are **welcome**. 
  * Please use the **latest master branch**.