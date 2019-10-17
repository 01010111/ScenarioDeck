package util;

import objects.ContentContainer;
import pixi.core.display.Container;

class ResizeUtil {
	public static var resize_map:Map<Container, Void -> Void> = [];
	public static function resize() {
		var _fn:Void -> Void = () -> {};
		for (object => fn in resize_map) {
			if (object == App.i.content_container) {
				_fn = fn;
				continue;
			}
			if (object != null) fn();
		}
		_fn();
	}
}