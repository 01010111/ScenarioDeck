package util;

import js.Browser;
using Math;

class LinkManager {

	static var move_threshold:Float = 8;

	public static function go_to_link(url:String) {
		if (App.i.content_container.total_move.abs() > move_threshold) return;
		CardManager.exists(url) || url == 'app____end' ? App.i.content_container.load_card(url) : Browser.window.location.href = url;
	}

}