package util;

import pixi.core.display.Container;

interface Theme {
	public var padding:Float;
	public var margin:Float;
	public var legacy:Bool;
	public var fonts:Array<String>;
	public function load_title():Void;
	public function load_image(src:String, display:String):Container;
	public function load_paragraph(text:String):Container;
	public function load_textbox(text:String):Container;
	public function load_button(text:String, url:String):Container;
	public function load_article(text:String, src:String, url:String):Container;
	public function load_points(amt:Int):Container;
	public function unload(obj:Array<Container>):Float;
	public function load_end():Void;
}