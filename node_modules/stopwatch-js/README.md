stopwatch-js - monitor time for javascript
======================================================================
## Features
*   Both support client javascript and Node.js.
*   Easy To Use.

## Install for Node.js
```bash
$ npm install stopwatch-js
```

## Usage
```js
<!-- for javascript in browser -->
<script type="text/javascript" src="stopwatch-js.js"></script>
    <script type="text/javascript">
	var stopWatch = new StopWatch();

	stopWatch.start();
	setTimeout(function(){
		stopWatch.stop();
		console.log(stopWatch.duration());
	},3000);
	</script>
	
	//#############################
	//in Node.js
	var StopWatch = require('stopwatch-js'),
	 stopWatch = new StopWatch();
	 stopWatch.start();
	 setTimeout(function(){
		stopWatch.stop();
		console.log('duration : ' + stopWatch.duration());
	},3000);

```
## License

(The MIT License)

Copyright (c) 2011-2012 sk &lt;skkmvp@hotmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
