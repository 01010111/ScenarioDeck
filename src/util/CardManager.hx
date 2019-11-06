package util;

@:expose
class CardManager {
	
	public static function get_card(title:String):Card {
		for (card in App.deck) if (card.title == title) return card;
		trace('No card with title "$title"');
		return { title: 'Blank', content: [] };
	}

	public static function exists(title:String):Bool {
		for (card in App.deck) if (card.title == title) return true;
		return false;
	}

	public static function validate() {
		for (card in App.deck) validate_card(card);
	}

	static function validate_card(card:Card) {
		for (content_item in card.content) {
			validate_content(card, content_item);
		}
	}

	static var content_types = [
		'paragraph',
		'image',
		'button',
		'textbox',
		'article',
		'flag',
		'points'
	];

	static var display_options = [
		'full-width',
		'padded',
	];

	static function validate_content(card:Card, content:Content) {
		if (content_types.indexOf(content.type) == -1) {
			error(card, content, 'Unknown content type ${content.type}');
			return;
		}
		switch content.type {
			case 'paragraph': return;
			case 'image': return;
			case 'button': return;
			case 'textbox': return;
			case 'article': return;
			case 'flag': return;
			case 'points': return;
		}
	}

	static function validate_paragraph(card:Card, content:Content) {
		validate_text(card, content);
	}

	static function validate_image(card:Card, content:Content) {
		validate_image_src(card, content);
		if (content.display == null) content.display = 'padded';
		if (display_options.indexOf(content.display) == -1) return error(card, content, 'Image object `display` must be one of: ${display_options}');
	}

	static function validate_button(card:Card, content:Content) {
		validate_link(card, content);
		validate_text(card, content);
	}

	static function validate_textbox(card:Card, content:Content) {
		validate_text(card, content);
	}

	static function validate_article(card:Card, content:Content) {
		validate_image_src(card, content);
		validate_link(card, content);
	}

	static function validate_flag(card:Card, content:Content) {
		validate_text(card, content);
	}

	static function validate_points(card:Card, content:Content) {
		if (content.amt == null) return error(card, content, 'Content must include `amt` object!');
	}

	static function validate_text(card:Card, content:Content) {
		if (content.text == null) return error(card, content, 'Content must include `text` object!');
		if (content.text.length == 0) return error(card, content, 'Text Blank!');
	}

	static function validate_image_src(card:Card, content:Content) {
		if (content.src == null) return error(card, content, 'Content must include `src` object!');
	}

	static function validate_link(card:Card, content:Content) {
		if (content.url == null && content.end == null) return error(card, content, 'No link found!');
	}

	static function error(card:Card, content:Content, message:String) {
		trace('Error in card ${card.title} - $message \nContent: $content');
	}

}

typedef Card = {
	title:String,
	content:Array<Content>,
}

typedef Content = {
	type:String,
	?text:String,
	?src:String,
	?display:String,
	?url:String,
	?amt:Int,
	?flag:String,
	?value:Bool,
	?end:Bool,
}