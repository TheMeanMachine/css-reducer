const { parse } = require( 'node-html-parser' );

exports.parse = ( file_arr = [], css_arr ) => {
	if( file_arr.length <= 0 )
		return;

	for( file of file_arr ){
		const class_arr = getClasses( file.contents );

		if( !class_arr )
			continue;

		for( css_class of class_arr ){

			const css_arr_el = css_arr[ '.' + css_class ]

			if( !css_arr_el )//TODO(AM): unused class, mark as to remove if config allows
				continue;

			css_arr_el.usage.push( file.path );
		}
	}
}; 

const getClasses = ( file ) => {
	const regex = /((class="){1}([\w]{1,}[ ]{0,}){1,})+/g;
	const class_arr = file.match( regex );
	if( !class_arr )
		return;

	var res_class_arr = [];
	for( css_class_str of class_arr ){
		css_class_str = css_class_str.replace('class="', '');
		css_class_str = css_class_str.replace(/\s+/g,' ').trim();//TODO (AM): remove extra spaces; may be a more efficient method 

		const css_class_arr_t = css_class_str.split(' ');

		if( !css_class_arr_t )
			continue;

		for( cc of css_class_arr_t ){

			res_class_arr.push( cc );

		}
	}

	return res_class_arr;
}