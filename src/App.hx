package;

import zero.utilities.Timer;
import themes.Simple;
import js.Browser;
import pixi.loaders.Loader;
import util.CardManager.Card;
import pixi.core.Application;
import objects.ContentContainer;
import util.Theme;
using zero.extensions.ArrayExt;

@:expose
class App extends Application {
	
	public static var deck:Array<Card>;
	public static var i:App;
	public static var theme:Theme;

	static function main() trace('Scenario Deck loading...');
	static function init(deck:Array<Card>, theme:String = 'simple') {
		App.deck = deck;
		App.theme = get_theme(theme);
		var images = [ for (card in deck) for (item in card.content) if (item.type.toLowerCase() == 'image' || item.type.toLowerCase() == 'article') item.src ];
		images.remove_duplicates();
		var loader = new Loader();
		loader.add(images);
		loader.on('progress', () -> trace(loader.progress));
		loader.on('complete', () -> i = new App());
		loader.load();
	}

	static function get_theme(theme:String):Theme {
		return switch theme {
			case 'simple': new Simple();
			default: new Simple();
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
		});
		Browser.window.addEventListener('resize', () -> {
			renderer.resize(Browser.document.documentElement.clientWidth, Browser.document.documentElement.clientHeight);
			util.ResizeUtil.resize();
		});
		Browser.document.body.appendChild(view);
		Browser.window.requestAnimationFrame(update);
		content_container = new ContentContainer();
		stage.addChild(content_container);
		content_container.load_card('Title');
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