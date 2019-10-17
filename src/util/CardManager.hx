package util;

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
}