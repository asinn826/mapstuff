var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

// run with http://localhost:8081/scrape

app.get('/scrape', function(req, res){

var apartments = [];
    // for (var j = 10; j <= 28; j++) {
        var pageUrl = 'https://www.apartments.com/under-1700/?bb=q92xj44ptQu_qiQ'; //'http://www.apartments.com/' + j + '/?bb=2zslnzr5tQvm5lhI';
    	request(pageUrl, function(error, response, html) {

        	if (!error) {
                var $ = cheerio.load(html);

                var name, address, website;

                // console.log($);
                $('.placardContainer').filter(function() {
                    var data = $(this);
                    for (var i = 0; i < data.children().length; i++) {
                        var apartmentJson = {name : "", address : "", website : ""};
                        console.log('---------------------------------------------------------------------------------');
                        try {
                            // Name
                            console.log(data.children()[i].children[1].children[1].children[0].data);
                            apartmentJson.name = data.children()[i].children[1].children[1].children[0].data;
                            // Address
                            console.log(data.children()[i].children[1].children[5].attribs.title);
                            apartmentJson.address = data.children()[i].children[1].children[5].attribs.title;
                            // Link
                            console.log(data.children()[i].attribs['data-url']);
                            apartmentJson.website = data.children()[i].attribs['data-url'];
                        } catch (e) {}
                        apartments.push(apartmentJson);
                    }
                });

                // to write an output file
                fs.writeFile('output.json', JSON.stringify(apartments, null, 4), function(err) {
                    console.log("written successfully!");
                });
    	    }
    	});
    // }



});

app.listen('8081');

console.log('Magic happens on port 8081');

exports = module.exports = app;