const html = require( './html.js' ).parse;
const css = require( './css.js' ).parse;
const js = require( './js.js' ).parse;

class Parse {
	constructor(){

		this.css_arr = {};
	}

	css ( file_arr ) {
		this.css_arr = css( file_arr );

	}
	html ( file_arr ) {
		html( file_arr, this.css_arr );
	}

	js ( file_arr ) {
		js( file_arr, this.css_arr );
	}

}

module.exports = { Parse };