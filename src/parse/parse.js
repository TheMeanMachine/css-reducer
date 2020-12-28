const html = require( './html.js' ).parse;
const css = require( './css.js' ).parse;

class Parse {
	constructor( path ){

		this.css_arr = {};
	}

	css ( file_arr ) {
		this.css_arr = css( file_arr );

	}
	html ( file_arr ) {
		html( file_arr, this.css_arr );
	}

}

module.exports = { Parse };