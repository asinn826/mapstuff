var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

var url = 'http://www.apartments.com/?bb=2zslnzr5tQvm5lhI';
// page 2-28 look like: http://www.apartments.com/2/?bb=2zslnzr5tQvm5lhI

	request(url, function(error, response, html) {

    	if (!error) {
            var $ = cheerio.load(html);

            var name, address, website;
            var json = {title : "", address : "", website : ""};

            console.log($);
            $('placardContainer').filter(function() {
                var data = $(this);
                // console.log(data);
            });

            // to write an output file
            // fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {
            //     console.log("written successfully!");
            // });
	    }
	});



});

app.listen('8081');

console.log('Magic happens on port 8081');

exports = module.exports = app;