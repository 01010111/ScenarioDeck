package themes;

import pixi.core.text.TextStyle;
import util.ResizeUtil;
import pixi.core.display.Container;
import pixi.core.graphics.Graphics;
import pixi.core.text.Text;
import pixi.core.sprites.Sprite;
import util.Theme;
import util.LinkManager;
import zero.utilities.Timer;
using com.greensock.TweenMax;
using Math;

@:keep
@:expose
class Simple implements Theme
{

	public var padding:Float = 48;
	public var margin:Float = 24;
	public var legacy:Bool = true;

	public function new() {}

	public function load_image(src:String, display:String):Container {
		var out = Sprite.fromImage(src);
		out.anchor.set(0.5, 0);

		resize_sprite(out, display);
		ResizeUtil.resize_map.set(out, () -> resize_sprite(out, display));

		out.alpha = 0;
		Timer.get(App.i.content_container.content_array.length * 0.2, () -> out.to(0.25, { alpha: 1 }));

		return out;
	}

	public function load_paragraph(text:String):Container {
		var text = new Text(text, Styles.text_main);

		ResizeUtil.resize_map.set(text, () -> resize_text(text, padding));
		resize_text(text, padding);

		text.alpha = 0;
		Timer.get(App.i.content_container.content_array.length * 0.2, () -> text.to(0.25, { alpha: 1 }));

		return text;
	}

	public function load_textbox(text:String):Container {
		var box = new Graphics();
		var text = new Text(text, Styles.text_textbox);
		text.position.set(margin, margin);

		ResizeUtil.resize_map.set(box, () -> resize_textbox(box, text));
		resize_textbox(box, text);

		box.addChild(text);

		box.alpha = 0;
		Timer.get(App.i.content_container.content_array.length * 0.2, () -> box.to(0.25, { alpha: 1 }));
		
		return box;
	}

	public function load_button(text:String, url:String):Container {
		var text = new Text(text, Styles.text_button);

		var box = new Graphics();
		box.beginFill(0x0080FF);
		box.drawRoundedRect(0, 0, text.width + margin * 4, text.height + margin, (text.height + margin)/2);
		box.endFill();
		box.interactive = true;
		box.buttonMode = true;
		box.on('pointertap', () -> LinkManager.go_to_link(url));

		text.anchor.set(0.5);
		text.position.set(box.width/2, box.height/2);

		box.addChild(text);

		ResizeUtil.resize_map.set(box, () -> resize_button(box, text));
		resize_button(box, text);

		box.alpha = 0;
		Timer.get(App.i.content_container.content_array.length * 0.2, () -> box.to(0.25, { alpha: 1 }));

		return box;
	}

	public function load_article(text:String, src:String, url:String):Container {
		var container:Container = new Container();
		container.interactive = true;
		container.buttonMode = true;
		container.on('pointertap', () -> LinkManager.go_to_link(url));

		var image = Sprite.fromImage(src);

		var box = new Graphics();
		box.beginFill(0x000000, 0.75);
		box.drawRect(0,0,1,1);
		box.endFill();
		box.pivot.set(0, 1);

		var subtitle = new Text(text, Styles.text_button);
		subtitle.anchor.set(0, 1);
		subtitle.x = margin;
		
		container.addChild(image);
		container.addChild(box);
		container.addChild(subtitle);

		ResizeUtil.resize_map.set(container, () -> resize_article(container, image, subtitle, box));
		resize_article(container, image, subtitle, box);

		container.alpha = 0;
		Timer.get(App.i.content_container.content_array.length * 0.2, () -> container.to(0.25, { alpha: 1 }));

		return container;
	}

	public function load_points(amt:Int):Container {
		var alert = new Graphics();
		alert.beginFill(0x30C000);
		alert.drawRoundedRect(-100, -16, 200, 32, 16);
		alert.endFill();
		var text = new Text('You earned $amt points!', Styles.text_button);
		text.anchor.set(0.5);
		alert.addChild(text);
		alert.position.set(App.i.renderer.width/2, - 32);

		App.i.stage.addChild(alert);
		alert.to(1, { y: 32 });
		Timer.get(5, () -> alert.to(1, { y: -32, onComplete: () -> alert.destroy() }));

		return new Container();
	}

	public function unload(arr:Array<Container>):Float {
		var i = 0.2;
		for (obj in arr) obj.to(i, { alpha: 0 });
		return i;
	}

	public static function resize_sprite(sprite:Sprite, display:String) {
		var target_width = App.i.renderer.width - (display == 'full-width' ? 0 : App.theme.padding * 2);
		var scale_amt = (target_width / sprite.texture.baseTexture.width).min(1);
		sprite.scale.set(scale_amt);
		sprite.x = App.i.renderer.width/2;
	}

	public static function resize_button(button:Graphics, text:Text) {
		button.x = App.theme.padding;
		var target_width = App.i.renderer.width - (App.theme.padding * 2);
		if (button.width < target_width) return;
		text.style.wordWrapWidth = App.i.renderer.width - (App.theme.padding * 2 + App.theme.margin * 4);
		button.clear();
		button.beginFill(0x0080FF);
		button.drawRoundedRect(0, 0, target_width, text.height + App.theme.margin, (text.height + App.theme.margin)/2);
		button.endFill();
		text.position.set(button.width/2, button.height/2);
	}

	public static function resize_text(text:Text, margin:Float) {
		text.style.wordWrapWidth = App.i.renderer.width - margin * 2;
		text.x = App.theme.padding;
	}

	public static function resize_article(container:Container, sprite:Sprite, text:Text, box:Graphics) {
		var target_width = App.i.renderer.width - (App.theme.padding * 2);
		var scale_amt = target_width / sprite.texture.baseTexture.width;
		sprite.scale.set(scale_amt);
		text.style.wordWrapWidth = target_width - App.theme.margin * 2;
		text.y = sprite.height - App.theme.margin;
		box.scale.set(sprite.width, text.height + App.theme.margin * 2);
		box.y = sprite.height;
		container.x = App.theme.padding;
	}

	public static function resize_textbox(box:Graphics, text:Text) {
		text.style.wordWrapWidth = App.i.renderer.width - (App.theme.padding * 2 + App.theme.margin * 2);
		box.clear();
		box.beginFill(0x60605d);
		box.drawRoundedRect(0, 0, App.i.renderer.width - (App.theme.padding * 2), text.height + App.theme.margin * 2, 8);
		box.endFill();
		box.x = App.theme.padding;
	}

}

class Styles {
	public static var text_main:TextStyle = new TextStyle({
		fill: 0x202020,
		wordWrap: true,
		fontSize: 18,
	});
	public static var text_button:TextStyle = new TextStyle({
		fill: 0xFFFFFF,
		wordWrap: true,
		fontSize: 16,
	});	
	public static var text_textbox:TextStyle = new TextStyle({
		fill: 0xFFFFFF,
		wordWrap: true,
		fontSize: 20,
	});
}