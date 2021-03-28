const root = process.cwd();

const { Discover } = require( root + '/src/discover.js' );
const { Parse } = require( root + '/src/parse/parse.js' );

const main = () => {

	const test_path = root + '/test/';

	const discover = new Discover( test_path );
	const parse = new Parse();

	parse.css( discover.css() );
	parse.html( discover.html() );
	parse.js( discover.js() );
};

main();