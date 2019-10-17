package objects;

import util.FlagManager;
import js.html.TouchEvent;
import js.Browser;
import zero.utilities.Timer;
import util.ResizeUtil;
import pixi.core.display.DisplayObject;
import util.CardManager;
import pixi.core.display.Container;
using Math;

class ContentContainer extends Container
{
	
	public var loaded:Bool = false;
	public var content_array:Array<Container> = [];
	var padding:Float;

	public function new() {
		super();
		ResizeUtil.resize_map.set(this, () -> resize());
		Browser.window.addEventListener('wheel', (e) -> scroll(e.deltaY));
		Browser.window.addEventListener('touchstart', (e) -> touch_start(e.touches[0]));
		Browser.window.addEventListener('touchmove', (e) -> touch_move(e.touches[0]));
	}

	var last_y:Float;
	public var total_move:Float;
	function touch_start(e) {
		last_y = e.clientY;
		total_move = 0;
	}
	function touch_move(e) {
		var delta = last_y - e.clientY;
		scroll(delta);
		total_move += delta;
		last_y = e.clientY;
	}

	public function load_card(title:String) {
		padding = App.theme.padding * 3;
		trace('Loading card: ${title}');
		if (loaded) return unload_card(title);
		y = 0;
		var card = CardManager.get_card(title);
		var last_y = App.theme.padding;
		for (item in card.content) {
			if (item.flag != null) if (!FlagManager.get(item.flag)) continue;
			var content_item:Container = switch (item.type.toLowerCase()) {
				case 'image': App.theme.load_image(item.src, item.display);
				case 'paragraph': App.theme.load_paragraph(item.text);
				case 'textbox': App.theme.load_textbox(item.text);
				case 'button': App.theme.load_button(item.text, item.url);
				case 'article': App.theme.load_article(item.text, item.src, item.url);
				case 'flag': 
					util.FlagManager.set(item.text, (item.value != null ? item.value : true));
					new Container();
				case 'points': 
					util.PointsManager.receive_pts(title, item.amt);
					new Container();
				default: new Container();
			}
			if (item.type == 'image' && item.display == 'full-width' && last_y == App.theme.padding) {
				last_y = 0;
				padding = App.theme.padding * 2;
			}
			content_item.position.y = last_y;
			last_y += content_item.height + App.theme.margin;
			content_array.push(content_item);
			addChild(content_item);
		}
		loaded = true;
	}

	public function unload_card(next:String) {
		trace('unloading ${content_array.length} objects');
		Timer.get(App.theme.unload(content_array), () -> {
			while (content_array.length > 0) destroy_object(content_array.shift());
			loaded = false;
			load_card(next);
		});
	}

	function destroy_object(object:Container) {
		ResizeUtil.resize_map.remove(object);
		object.destroy(false);
	}

	public function resize() {
		var last_y = App.theme.padding;
		for (item in content_array) {
			item.y = last_y;
			last_y += item.height + App.theme.margin;
		}
		scroll(0);
	}

	public function scroll(delta:Float) {
		y -= delta;
		y = y.max(-(height + padding) + App.i.renderer.height).min(0);
	}

}