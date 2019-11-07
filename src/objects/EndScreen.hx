package objects;

import App.BoardData;
import zero.utilities.Timer;
import pixi.core.math.shapes.Rectangle;
import pixi.core.sprites.Sprite;
import pixi.loaders.Loader;
import pixi.core.text.Text;
import pixi.core.graphics.Graphics;
import pixi.core.display.Container;

using com.greensock.TweenMax;
using Math;

class EndScreen extends Container
{

	var bg:Graphics;
	
	var title:Text;
	var subtitle:Text;
	var bob_pts:Text;

	var replay:Graphics;
	var exit:Graphics;

	var continue_text:Text;
	var content_lane:ContentLane;

	public function new() {
		super();

		bg = new Graphics();
		bg.beginFill(0x000000, 0.5);
		bg.drawRect(0, 0, 1, 1);

		title = new Text(App.config.title, {
			fontFamily: 'Avenir Next Demi',
			fontSize: 36,
			align: 'left',
			fill: 0xFFFFFF,
			wordWrap: true
		});

		subtitle = new Text(App.config.subtitle.toUpperCase(), {
			fontFamily: 'Avenir Next Bold',
			fontSize: 18,
			align: 'left',
			fill: 0xFFFFFF,
		});

		bob_pts = new Text('Points earned: ${util.PointsManager.get_total()}', {
			fontFamily: 'Avenir Next Bold',
			fontSize: 18,
			align: 'left',
			fill: 0xFFFFFF,
		});

		replay = new Graphics();
		replay.beginFill(0xFFFFFF);
		replay.drawRoundedRect(0, 0, 142, 48, 24);
		replay.endFill();
		replay.interactive = true;
		replay.buttonMode = true;
		replay.on('pointertap', () -> {
			// Reload game TODO: does this work ok?
			App.restart();
		});

		var r_text = new Text('Replay', {
			fontFamily: 'Avenir Next Demi',
			fontSize: 18,
			fill: 0x000000,
		});
		r_text.anchor.set(0.5);
		r_text.position.set(71, 24);
		replay.addChild(r_text);

		exit = new Graphics();
		exit.beginFill(0xFF4040);
		exit.drawRoundedRect(0, 0, 142, 48, 24);
		exit.endFill();
		exit.interactive = true;
		exit.buttonMode = true;
		exit.on('pointertap', () -> {
			// TODO Close modal
		});

		var e_text = new Text('Exit', {
			fontFamily: 'Avenir Next Demi',
			fontSize: 18,
			fill: 0xFFFFFF,
		});
		e_text.anchor.set(0.5);
		e_text.position.set(71, 24);
		exit.addChild(e_text);

		continue_text = new Text('Recommended for you:', {
			fontFamily: 'Avenir Next Demi',
			fontSize: 24,
			align: 'left',
			fill: 0xFFFFFF
		});

		content_lane = new ContentLane(App.config.content_links != null ? App.config.content_links : get_articles(App.config.board));

		var resize = () -> {
			if (App.i.renderer.width >= 480 && App.i.renderer.height >= 600) { // Desktop
				title.style.wordWrapWidth = App.i.renderer.width - 64;
				title.position.set(32, App.i.renderer.height - 547);
				subtitle.position.set(32, App.i.renderer.height - 480);
				bob_pts.position.set(32, App.i.renderer.height - 455);
				replay.position.set(32, App.i.renderer.height - 414);
				exit.position.set(190, App.i.renderer.height - 414);
				continue_text.position.set(32, App.i.renderer.height - 334);
				content_lane.y = App.i.renderer.height - 288;
			}
			else { // Mobile
				title.position.set(32, 48);
				title.style.wordWrapWidth = App.i.renderer.width - 64;
				subtitle.position.set(32, title.y + title.height + 16);
				bob_pts.position.set(32, subtitle.y + subtitle.height + 16);
				replay.position.set(App.i.renderer.width/2 - 142 - 8, App.i.renderer.height - 80);
				exit.position.set(App.i.renderer.width/2 + 8, App.i.renderer.height - 80);
				continue_text.y = App.i.renderer.height + 128;
				content_lane.y = App.i.renderer.height + 128;
			}
		}

		util.ResizeUtil.resize_map.set(this, () -> resize());
		resize();

		addChild(bg);
		addChild(title);
		addChild(subtitle);
		addChild(bob_pts);
		addChild(replay);
		addChild(exit);
		addChild(continue_text);
		addChild(content_lane);

		var i = 0;
		for (child in children) {
			child.alpha = 0;
			child.to(0.2, { alpha: 1, delay: i++ * 0.2 });
		}
	}

	static function get_articles(board:BoardData):Array<ContentData> {
		if (board == null || board.assets == null) return [];
		return [ for (asset in board.assets) {
			title: asset.title,
			image: asset.image.url,
			url: 'https://www3.blueoceanbrain.com/board/${board.id}/article/${asset.id}'
		}];
	}

}

class ContentLane extends Container {

	var content_width = 0;
	var lane_padding = 16;
	var content_array:Array<ContentLink> = [];
	var user_initiated_scroll = false;

	public function new(lane_data:Array<ContentData>)
	{
		super();
		position.set(32, App.i.renderer.height - 288);
		for (content_data in lane_data) add_content_link(content_data);
		if (lane_padding < 32) content_width += 32 - lane_padding;
		animate_lane(lane_data.length);
	}

	function add_content_link(data:ContentData)
	{

		var content_container = new ContentLink();
		content_container.data = data;
		content_container.beginFill(0xFFFFFF);
		content_container.drawRect(0, 0, 300, 256);
		content_container.endFill();

		var alpha_mask = new Graphics();
		alpha_mask.beginFill(0xFF0000);
		alpha_mask.drawRect(0, 0, 300, 180);
		alpha_mask.endFill();
		content_container.addChild(alpha_mask);

		var loader = new Loader();
		loader.reset();
		loader.add({
			url: data.image, 
			crossOrigin: ''
		}).load(() -> {
			var content_graphic = Sprite.fromImage(data.image);
			content_graphic.scale.set(300/content_graphic.width);
			content_graphic.mask = alpha_mask;
			content_graphic.alpha = 0;
			content_graphic.to(0.2, { alpha: 1 });
			content_container.addChild(content_graphic);
		});

		var content_title = new Text(data.title, {
			fontFamily: 'Avenir Next Demi', 
			fontSize: 16,
			fill: 0x000000,
			align: 'center',
			wordWrap: true,
			wordWrapWidth: 260,
		});
		content_title.anchor.set(0.5);
		content_title.position.set(150, 220);
		content_container.addChild(content_title);

		content_container.interactive = true;
		content_container.on('pointertap', () -> content_action(content_container));

		content_container.position.set(content_width, 0);
		content_width += 300 + lane_padding;
		hitArea = new Rectangle(0, 0, content_width, 256 + lane_padding);

		content_array.push(content_container);

		addChild(content_container);
	}

	function animate_lane(amt:Float)
	{
		var timer_amt = 5;
		var i = 0;
		for (content in content_array) Timer.get(i++ * timer_amt, () -> if (!user_initiated_scroll) focus_on_content(content));
		Timer.get(amt * timer_amt, () -> animate_lane(amt));
	}

	function focus_on_content(content:ContentLink)
	{
		var x = Math.min(Math.max(App.i.renderer.width/2 - 150 - content.x, App.i.renderer.width - content_width), 32);
		//var y = App.i.renderer.height - 288;
		this.to(0.25, { x: x });

		for (c in content_array)
		{
			c.alpha = 0.5;
			c.buttonMode = false;
		}

		content.to(0.25, { alpha: 1 });
		Timer.get(0.25, () -> content.buttonMode = true);
	}

	function content_action(content:ContentLink)
	{
		user_initiated_scroll = true;
		content.buttonMode ? js.Browser.window.top.location.href = content.data.url : focus_on_content(content);
	}

}

class ContentLink extends Graphics {
	public var data:ContentData;
}

typedef ContentData = {
	image:String,
	title:String,
	url:String,
}