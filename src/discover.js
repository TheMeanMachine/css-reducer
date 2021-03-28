const glob = require('glob-fs')();
const fs = require('fs');

const root = process.cwd();

const config = require( root + '/config' );

class Discover {
	constructor( path ){
		this.file_arr = {};
		this.path = path;
		this.discover( );
	}

	discover ( ) {
		this.file_raw_arr = glob.readdirSync( '**/*.*', {
			cwd: this.path,
			nodir: true,
			
		})
		this.filterFiles();
		
	};

	filterFiles( ){
		const extension_arr = config.extension;

		const html_ext = ( Array.isArray( extension_arr.html ) ) ? [ ...extension_arr.html ] : [ extension_arr.html ];
		const css_ext = ( Array.isArray( extension_arr.css ) ) ? [ ...extension_arr.css ] : [ extension_arr.css ];
		const js_ext = ( Array.isArray( extension_arr.js ) ) ? [ ...extension_arr.js ] : [ extension_arr.js ];
		
		if( !this.file_arr )
			this.file_arr = { };


		for( const extension in extension_arr ){
			if( !this.file_arr[ extension ] )
				this.file_arr[ extension ] = [];
		}

		for( const file of this.file_raw_arr ){
			const ext = file.split('.').pop();

			if( html_ext.includes( ext ) )
				this.file_arr[ 'html' ].push( file );
			else if( css_ext.includes( ext ) )
				this.file_arr[ 'css' ].push( file );
			else if( js_ext.includes( ext ) )
				this.file_arr[ 'js' ].push( file );
			
		}

		delete this.file_raw_arr;
	}

	html(){
		let file_arr = [];
		for( const file of this.file_arr.html ){
			try{
				file_arr.push( { path: file, contents: this.readFile( file ) } )
			}catch(e){
				console.log(e);
			}
		}
		return file_arr;
	}
	css(){
		let file_arr = [];
		for( const file of this.file_arr.css ){
			try{
				file_arr.push( this.readFile( file ) )
			}catch(e){
				console.log(e);
			}
		}
		return file_arr;
	}
	js(){
		let file_arr = [];
		for( const file of this.file_arr.js ){
			try{
				file_arr.push( this.readFile( file ) )
			}catch(e){
				console.log(e);
			}
		}
		return file_arr;
	}

	readFile( file ){
		return fs.readFileSync( this.path + file, {
			encoding: 'utf8'
		}).toString();
	}

}

module.exports = { Discover };