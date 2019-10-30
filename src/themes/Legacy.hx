package themes;

import pixi.core.text.TextStyle;
import util.ResizeUtil;
import pixi.core.display.Container;
import pixi.core.graphics.Graphics;
import pixi.core.text.Text;
import pixi.core.sprites.Sprite;
import pixi.core.textures.Texture;
import util.Theme;
import util.LinkManager;
import zero.utilities.Timer;
import js.Browser;
using com.greensock.TweenMax;
using Math;

@:keep
@:expose
class Legacy implements util.Theme
{

	public var fonts = ['Avenir Next', 'Avenir Next Medium', 'Avenir Next Demi', 'Avenir Next Bold'];

	public static var title_h:TextStyle = new TextStyle({
		fontFamily: 'Avenir Next Demi',
		align: 'center',
		fill: 0xFFFFFF,
		fontSize: 24,
		wordWrap: true,
	});
	public static var title_sub:TextStyle = new TextStyle({
		fontFamily: 'Avenir Next Bold',
		fontSize: 12,
		fill: 0xFFFFFF,
		align: 'center',
		letterSpacing: 4,
	});
	public static var title_p:TextStyle = new TextStyle({
		fontFamily: 'Avenir Next Medium',
		align: 'left',
		fill: 0xFFFFFF,
		fontSize: 15,
		lineHeight: 24,
		wordWrap: true,
	});
	public static var p:TextStyle = new TextStyle({
		fontFamily: 'Avenir Next Medium',
		align: 'left',
		fill: 0xFFFFFF,
		fontSize: 20,
		lineHeight: 28,
		wordWrap: true,
	});
	public static var quote:TextStyle = new TextStyle({
		fontFamily: 'Avenir Next Demi',
		align: 'left',
		fill: 0xFFFFFF,
		fontSize: 20,
		lineHeight: 28,
		wordWrap: true,
	});
	public static var a:TextStyle = new TextStyle({
		fontFamily: 'Avenir Next Medium',
		align: 'left',
		fill: 0x333333,
		fontSize: 18,
		lineHeight: 22,
		wordWrap: true,
		fontWeight: '600',
	});
	public static var caption:TextStyle = new TextStyle({
		fontFamily: 'Avenir Next Medium',
		align: 'left',
		fill: 0xFFFFFF,
		fontSize: 18,
		wordWrap: true,
	});

	public var padding:Float = 48;
	public var margin:Float = 24;
	public var legacy:Bool = true;

	public function new(){}

	public function load_title() {
		var container = new Container();
		App.i.stage.addChildAt(container, 0);

		// Fallback bg
		var g = new Graphics();
		g.beginFill(0x000000);
		g.drawRect(0, 0, 1, 1);
		g.endFill();
		container.addChild(g);

		// Image
		var img = Sprite.fromImage(App.config.bg_src);
		img.anchor.set(0.5);
		container.addChild(img);

		// Gradient
		var canvas = Browser.document.createCanvasElement();
		canvas.width = img.texture.baseTexture.width.floor();
		canvas.height = img.texture.baseTexture.height.floor();
		var ctx = canvas.getContext('2d');
		var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
		gradient.addColorStop(0.25, "transparent");
		gradient.addColorStop(0.75, "black");
		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		var gradient_sprite = new Sprite(Texture.fromCanvas(canvas));
		gradient_sprite.anchor.set(0.5);
		gradient_sprite.alpha = 0;
		img.addChild(gradient_sprite);

		var shade = new Graphics();
		shade.beginFill(0x000000, 0.8);
		shade.drawRect(0, 0, 1, 1);
		shade.endFill();
		shade.alpha = 0;
		container.addChild(shade);

		// Text
		var description = new Text(App.config.description, title_p);
		description.anchor.set(0.5, 0);
		container.addChild(description);

		var subtitle = new Text(App.config.subtitle.toUpperCase(), title_sub);
		subtitle.anchor.set(0.5, 0);
		container.addChild(subtitle);

		var title = new Text(App.config.title, title_h);
		title.anchor.set(0.5, 0);
		container.addChild(title);

		var button = load_button(App.config.button_text, App.config.first_card);
		button.interactive = false;
		button.removeAllListeners();
		button.on('pointertap', () -> {
			button.interactive = false;
			title.to(1, { alpha: 0 });
			subtitle.to(1, { alpha: 0 });
			description.to(1, { alpha: 0 });
			button.to(1, { alpha: 0 });
			gradient_sprite.to(1, { alpha: 0 });
			shade.to(1, { alpha: 1 });
			Timer.get(1.5, () -> LinkManager.go_to_link(App.config.first_card));
		});
		container.addChild(button);

		gradient_sprite.alpha = 0;
		title.alpha = 0;
		subtitle.alpha = 0;
		description.alpha = 0;
		button.alpha = 0;

		var resize = () -> {
			button.y = App.i.renderer.height - padding - button.height;

			// Text
			description.style.wordWrapWidth = App.i.renderer.width - padding * 2 - margin * 2;
			description.position.set(App.i.renderer.width/2, button.y - 16 - description.height);

			subtitle.style.wordWrapWidth = App.i.renderer.width - padding * 2 - margin * 2;
			subtitle.position.set(App.i.renderer.width/2, description.y - 16 - subtitle.height);

			title.style.wordWrapWidth = App.i.renderer.width - padding * 2 - margin * 2;
			title.position.set(App.i.renderer.width/2, subtitle.y - 8 - title.height);
			
			g.scale.set(App.i.renderer.width, App.i.renderer.height);
			shade.scale.set(App.i.renderer.width, App.i.renderer.height);

			// image
			var scale_amt = Math.max(App.i.renderer.width / img.texture.baseTexture.width, App.i.renderer.height / img.texture.baseTexture.height);
			img.scale.set(scale_amt, scale_amt);
			img.position.set(App.i.renderer.width/2, App.i.renderer.height/2);
		}

		ResizeUtil.resize_map.set(container, () -> resize());
		resize();

		Timer.cancel_all();

		gradient_sprite.to(1, { alpha: 0.8 });
		title.to(1, { alpha: 1, delay: 1 });
		subtitle.to(1, { alpha: 1, delay: 1.1 });
		description.to(1, { alpha: 1, delay: 1.2 });
		button.to(1, { alpha: 1, delay: 1.5, onComplete: () -> button.interactive = true });

	}

	public function load_end() {
	}

	public function load_image(src:String, display:String):Container {
		var out = Sprite.fromImage(src);
		out.anchor.set(0.5, 0);

		var resize = (s:Sprite, d:String) -> {
			var target_width = App.i.renderer.width - (d == 'full-width' ? 0 : App.theme.padding * 2);
			var scale_amt = (target_width / s.texture.baseTexture.width).min(1);
			s.scale.set(scale_amt);
			s.x = App.i.renderer.width/2;
		}

		resize(out, display);
		ResizeUtil.resize_map.set(out, () -> resize(out, display));

		out.alpha = 0;
		Timer.get(App.i.content_container.content_array.length * 0.2, () -> out.to(0.25, { alpha: 1 }));

		return out;
	}

	public function load_paragraph(text:String):Container {
		var out = new Text(text, p);
		out.x = padding;
		
		var resize = (t:Text) -> t.style.wordWrapWidth = App.i.renderer.width - padding * 2;

		resize(out);
		ResizeUtil.resize_map.set(out, () -> resize(out));

		out.alpha = 0;
		Timer.get(App.i.content_container.content_array.length * 0.2, () -> out.to(0.25, { alpha: 1 }));

		return out;
	}

	public function load_textbox(text:String):Container {
		var out = new Graphics();
		out.x = padding;
		var text = new Text(text, quote);
		text.anchor.set(0.5);
		out.addChild(text);

		var resize = (g:Graphics, t:Text) -> {
			t.style.wordWrapWidth = App.i.renderer.width - (margin * 2 + padding * 2);
			t.position.set((App.i.renderer.width - padding * 2)/2, (t.height + margin * 2)/2);

			g.clear();
			g.beginFill(0x0277BF);
			g.drawRoundedRect(0, 0, App.i.renderer.width - padding * 2, t.height + margin * 2, 8);
			g.endFill();
		}

		resize(out, text);
		ResizeUtil.resize_map.set(out, () -> resize(out, text));

		out.alpha = 0;
		Timer.get(App.i.content_container.content_array.length * 0.2, () -> out.to(0.25, { alpha: 1 }));

		return out;
	}

	public function load_button(text:String, url:String):Container {
		var out = new Graphics();
		var text = new Text(text, a);
		text.anchor.set(0.5, 0.5);
		out.addChild(text);
		out.interactive = true;
		out.buttonMode = true;
		out.on('pointertap', () -> LinkManager.go_to_link(url));

		var resize = (g:Graphics, t:Text) -> {
			var pad = App.i.renderer.width <= 400 ? padding : padding * 2;
			t.style.wordWrapWidth = App.i.renderer.width - (margin * 2 + pad * 2);
			var height = t.height + (t.height <= t.style.lineHeight ? margin : margin * 2);
			t.x = (App.i.renderer.width - pad * 2)/2;
			t.y = height/2;

			g.clear();
			g.x = pad;
			g.beginFill(0xFFFFFF);
			g.drawRoundedRect(0, 0, App.i.renderer.width - pad * 2, height, 16);
			g.endFill();
		}

		resize(out, text);
		ResizeUtil.resize_map.set(out, () -> resize(out, text));

		out.alpha = 0;
		Timer.get(App.i.content_container.content_array.length * 0.2, () -> out.to(0.25, { alpha: 1 }));

		return out;
	}

	public function load_article(text:String, src:String, url:String):Container {
		var out:Container = new Container();
		out.interactive = true;
		out.buttonMode = true;
		out.x = padding;
		out.on('pointertap', () -> LinkManager.go_to_link(url));

		var image = Sprite.fromImage(src);

		var box = new Graphics();
		box.beginFill(0x000000, 0.75);
		box.drawRect(0,0,1,1);
		box.endFill();
		box.pivot.set(0, 1);

		var caption = new Text(text, caption);
		caption.anchor.set(0, 1);
		caption.x = margin;
		
		out.addChild(image);
		out.addChild(box);
		out.addChild(caption);

		var resize = (c:Container, i:Sprite, t:Text, g:Graphics) -> {
			var target_width = App.i.renderer.width - padding * 2;
			var scale_amt = target_width / i.texture.baseTexture.width;
			i.scale.set(scale_amt);
			t.style.wordWrapWidth = target_width - App.theme.margin * 2;
			t.y = i.height - App.theme.margin;
			g.scale.set(i.width, t.height + App.theme.margin * 2);
			g.y = i.height;
		}

		resize(out, image, caption, box);
		ResizeUtil.resize_map.set(out, () -> resize(out, image, caption, box));

		out.alpha = 0;
		Timer.get(App.i.content_container.content_array.length * 0.2, () -> out.to(0.25, { alpha: 1 }));

		return out;
	}

	public function load_points(amt:Int):Container {
		var alert = new Graphics();
		alert.beginFill(0xA3EA3E);
		alert.drawRoundedRect(-128, -32, 256, 64, 32);
		alert.endFill();
		var text = new Text('You earned $amt points!', a);
		text.anchor.set(0.5);
		alert.addChild(text);
		alert.position.set(App.i.renderer.width/2, App.i.renderer.height + 40);

		App.i.stage.addChild(alert);
		alert.to(0.5, { y: App.i.renderer.height - 64 });
		Timer.get(2.5, () -> alert.to(0.5, { y: App.i.renderer.height + 40, onComplete: () -> alert.destroy() }));

		return new Container();
	}

	public function unload(arr:Array<Container>):Float {
		var i = 0.2;
		for (obj in arr) obj.to(i, { alpha: 0 });
		return i;
	}

}