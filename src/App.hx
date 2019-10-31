package;

import zero.utilities.Timer;
import js.Browser;
import pixi.loaders.Loader;
import util.CardManager.Card;
import pixi.core.Application;
import objects.ContentContainer;
import util.Theme;
import objects.EndScreen.ContentData;
using zero.extensions.ArrayExt;

@:expose
class App extends Application {
	
	public static var deck:Array<Card>;
	public static var i:App;
	public static var theme:Theme;
	public static var config:Config;

	static function main() {}
	
	static function init(config:Config) {
		App.deck = config.deck;
		App.theme = get_theme(config.theme);
		App.config = config;

		var load_images = () -> {
			var images = [ for (card in deck) for (item in card.content) if (item.type.toLowerCase() == 'image' || item.type.toLowerCase() == 'article') item.src ];
			if (config.bg_src != null) images.push(config.bg_src);
			var loader = new Loader();
			for (image in images.remove_duplicates()) loader.add({ url:image, crossOrigin: '' });
			//loader.on('progress', () -> trace(loader.progress));
			loader.on('complete', () -> i = new App());
			loader.load();
		}

		App.theme.fonts.length == 0 ? load_images() : webfont.WebFontLoader.load({
			custom: {
				families: App.theme.fonts.merge(['Avenir Next Demi', 'Avenir Next Bold']).remove_duplicates(), // Theme fonts + Endscreen fonts
				urls: ['include/fonts.css']
			},
			active: load_images
		});
	}

	static function get_theme(theme:String):Theme {
		return switch theme {
			case 'simple': new themes.Simple();
			case 'legacy': new themes.Legacy();
			default: new themes.Simple();
		}
	}

	public var content_container:ContentContainer;

	public function new() {
		i = this;
		super({
			width: Browser.document.documentElement.clientWidth,
			height: Browser.document.documentElement.clientHeight,
			backgroundColor: 0xFFFFFF,
			antialias: true,
			roundPixels: true,
			clearBeforeRender: true,
			forceFXAA: true,
			powerPreference: 'high-performance',
			autoResize: true,
			legacy: theme.legacy,
			forceCanvas: theme.legacy,
		});
		Browser.window.addEventListener('resize', () -> {
			renderer.resize(Browser.document.documentElement.clientWidth, Browser.document.documentElement.clientHeight);
			util.ResizeUtil.resize();
		});
		Browser.document.body.appendChild(view);
		Browser.window.requestAnimationFrame(update);
		content_container = new ContentContainer();
		stage.addChild(content_container);
		App.theme.load_title();
	}

	var last = 0.0;
	function update(time:Float) {
		var dt = get_dt(time);
		Timer.update(dt);
		Browser.window.requestAnimationFrame(update);
	}
	function get_dt(time:Float):Float {
		var out = (time - last) / 1000;
		last = time;
		return out;
	}

}

typedef Config = {
	deck:Array<Card>,
	theme:String,
	title:String,
	description:String,
	button_text:String,
	first_card:String,
	?subtitle:String,
	?bg_src:String,
	?content_links:Array<ContentData>
}