const links = [];
const casper = require('casper').create({
    verbose: true,
    logLevel: 'debug'
});

function getLinks() {
    const links = document.querySelectorAll('a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}

casper.start('https://rpp.rpdata.com/rpp/login.html', function() {
   // Wait for the page to be loaded
   this.waitForSelector('form[action="j_spring_security_check"]');
});

casper.then(function() {
    // fill the login form and submit
    this.fill('form[action="j_spring_security_check"]', { j_username: 'gerardcole', j_password: 'norton88' }, true);
});

casper.then(function() {
    // aggregate results for the 'casperjs' search
    links = this.evaluate(getLinks);
});

casper.run(function() {
    // echo results in some pretty fashion
    this.echo(links.length + ' links found:');
    this.echo(' - ' + links.join('\n - ')).exit();
});
