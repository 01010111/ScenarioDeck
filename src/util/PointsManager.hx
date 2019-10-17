package util;

class PointsManager {

	static var earned:Map<String, Int> = [];

	public static function receive_pts(title:String, amt:Int) {
		if (earned.exists(title)) return;
		earned.set(title, amt);
		App.theme.load_points(amt);
	}

	public static function get_total():Int {
		var out = 0;
		for (title => amt in earned) out += amt;
		return out;
	}

}