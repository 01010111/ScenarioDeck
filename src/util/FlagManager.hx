package util;

class FlagManager {
	static var map:Map<String, Bool> = [];
	public static function set(flag:String, value:Bool) map.set(flag, value);
	public static function get(flag:String):Bool return map.exists(flag) ? map[flag] : false;
}