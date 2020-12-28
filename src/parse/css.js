const css = require( 'css' );

exports.parse = ( file_arr = [] ) => {
	if( file_arr.length <= 0 )
		return;
	
	var css_arr = {};

	for( file of file_arr ){
		const parsed_css = css.parse(file);
		
		const rule_arr = parsed_css.stylesheet.rules;

		for( rule of rule_arr )
		{
			const selector_arr = rule.selectors;
			//if( selectors.length > 0 )
			if( !selector_arr )
				continue;

			for( selector of selector_arr ){
				addClass( selector, rule, css_arr );
			}
		}
	}

	return css_arr;
}; 

const classSearch = ( selector ) => {
	const regex = /([.])\w+\w+(?:-\w+)*|/g;//find classes
	const class_loc_arr = selector.match( regex ).filter(Boolean);

	return class_loc_arr;
}

const isOwnClass = ( selector, css_class ) => {
	return selector === css_class;
};


const addClass = ( selector, rule, css_arr ) => {
	
	const class_arr = classSearch( selector );

	for( css_class of class_arr )
	{

		if( !css_arr[ css_class ] )
			css_arr[ css_class ] = {
				protected: false,
				usage: [],
				original_selectors:[],
			};
		css_arr[ css_class ].original_selectors.push( selector );
		if( isOwnClass( selector, css_class ) )
			css_arr[ css_class ].delarations = rule.declarations;
		else
			css_arr[ css_class ].protected = true;//TODO (AM): this will only support classes declared simply (no children selecting etc)
		
	}

}