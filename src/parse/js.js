exports.parse = ( file_arr = [], css_arr ) => {
	if( file_arr.length <= 0 )
		return;

	for( const file of file_arr ){

      const contents = file.contents || file;


		for( const css_class in css_arr ){//TODO(AM): (MVP) We're being more cautious on the JS side as there are many cases of use, therefore if the classname phrase comes up it will treat the CSS class as protected going forward

         const regex = new RegExp( "[\'\"\`](\\.)*\\b(" + css_class.replace('.', '') + ")\\b[\`\'\"]" );

			if( contents.match( regex ) )
				css_arr[ css_class ].protected = true;

			css_arr[ css_class ].usage.push( file.path );
		}
	}
};