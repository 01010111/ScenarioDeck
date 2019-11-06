// Generated by Haxe 4.0.0+ef18b627e
(function ($hx_exports, $global) { "use strict";
$hx_exports["themes"] = $hx_exports["themes"] || {};
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var App = $hx_exports["App"] = function() {
	this.last = 0.0;
	var _gthis = this;
	App.i = this;
	PIXI.Application.call(this,{ width : window.document.documentElement.clientWidth, height : window.document.documentElement.clientHeight, backgroundColor : 16777215, antialias : true, roundPixels : true, clearBeforeRender : true, forceFXAA : true, powerPreference : "high-performance", autoResize : true, legacy : App.theme.legacy, forceCanvas : App.theme.legacy});
	window.addEventListener("resize",function() {
		_gthis.renderer.resize(window.document.documentElement.clientWidth,window.document.documentElement.clientHeight);
		util_ResizeUtil.resize();
		return;
	});
	window.document.body.appendChild(this.view);
	window.requestAnimationFrame($bind(this,this.update));
	this.content_container = new objects_ContentContainer();
	this.stage.addChild(this.content_container);
	App.theme.load_title();
};
App.main = function() {
};
App.init = function(config) {
	App.deck = config.deck;
	App.theme = App.get_theme(config.theme);
	App.config = config;
	var load_images = function() {
		var _g = [];
		var _g1 = 0;
		var _g2 = App.deck;
		while(_g1 < _g2.length) {
			var card = _g2[_g1];
			++_g1;
			var _g11 = 0;
			var _g21 = card.content;
			while(_g11 < _g21.length) {
				var item = _g21[_g11];
				++_g11;
				if(item.type.toLowerCase() == "image" || item.type.toLowerCase() == "article") {
					_g.push(item.src);
				}
			}
		}
		var images = _g;
		if(config.bg_src != null) {
			images.push(config.bg_src);
		}
		var loader = new PIXI.loaders.Loader();
		var _g3 = 0;
		var _g4 = zero_extensions_ArrayExt.remove_duplicates(images);
		while(_g3 < _g4.length) {
			var image = _g4[_g3];
			++_g3;
			loader.add({ url : image, crossOrigin : ""});
		}
		loader.on("complete",function() {
			return App.i = new App();
		});
		return loader.load();
	};
	if(App.theme.fonts.length == 0) {
		load_images();
	} else {
		WebFont.load({ custom : { families : zero_extensions_ArrayExt.remove_duplicates(zero_extensions_ArrayExt.merge(App.theme.fonts,["Avenir Next Demi","Avenir Next Bold"])), urls : ["include/fonts.css"]}, active : load_images});
	}
};
App.get_theme = function(theme) {
	switch(theme) {
	case "legacy":
		return new themes_Legacy();
	case "simple":
		return new themes_Simple();
	default:
		return new themes_Simple();
	}
};
App.__super__ = PIXI.Application;
App.prototype = $extend(PIXI.Application.prototype,{
	update: function(time) {
		var dt = this.get_dt(time);
		zero_utilities_Timer.update(dt);
		window.requestAnimationFrame($bind(this,this.update));
	}
	,get_dt: function(time) {
		var out = (time - this.last) / 1000;
		this.last = time;
		return out;
	}
});
var HxOverrides = function() { };
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var haxe_ds_ObjectMap = function() {
	this.h = { __keys__ : { }};
};
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = $global.$haxeUID++);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,get: function(key) {
		return this.h[key.__id__];
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) {
			return false;
		}
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) {
			a.push(this.h.__keys__[key]);
		}
		}
		return HxOverrides.iter(a);
	}
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.prototype = {
	get: function(key) {
		if(__map_reserved[key] != null) {
			return this.getReserved(key);
		}
		return this.h[key];
	}
	,setReserved: function(key,value) {
		if(this.rh == null) {
			this.rh = { };
		}
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) {
			return null;
		} else {
			return this.rh["$" + key];
		}
	}
	,existsReserved: function(key) {
		if(this.rh == null) {
			return false;
		}
		return this.rh.hasOwnProperty("$" + key);
	}
	,keys: function() {
		return HxOverrides.iter(this.arrayKeys());
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) {
			out.push(key);
		}
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) {
				out.push(key.substr(1));
			}
			}
		}
		return out;
	}
};
var haxe_iterators_MapKeyValueIterator = function(map) {
	this.map = map;
	this.keys = map.keys();
};
haxe_iterators_MapKeyValueIterator.prototype = {
	hasNext: function() {
		return this.keys.hasNext();
	}
	,next: function() {
		var key = this.keys.next();
		return { value : this.map.get(key), key : key};
	}
};
var objects_ContentContainer = function() {
	this.content_array = [];
	this.loaded = false;
	var _gthis = this;
	PIXI.Container.call(this);
	util_ResizeUtil.resize_map.set(this,function() {
		_gthis.resize();
		return;
	});
	window.addEventListener("wheel",function(e) {
		_gthis.scroll(e.deltaY);
		return;
	});
	window.addEventListener("touchstart",function(e1) {
		_gthis.touch_start(e1.touches[0]);
		return;
	});
	window.addEventListener("touchmove",function(e2) {
		_gthis.touch_move(e2.touches[0]);
		return;
	});
};
objects_ContentContainer.__super__ = PIXI.Container;
objects_ContentContainer.prototype = $extend(PIXI.Container.prototype,{
	touch_start: function(e) {
		this.last_y = e.clientY;
		this.total_move = 0;
	}
	,touch_move: function(e) {
		var delta = this.last_y - e.clientY;
		this.scroll(delta);
		this.total_move += delta;
		this.last_y = e.clientY;
	}
	,load_card: function(title) {
		this.padding = App.theme.padding * 3;
		if(this.loaded) {
			this.unload_card(title);
			return;
		}
		this.y = 0;
		if(title == "app____end") {
			App.i.stage.addChild(new objects_EndScreen());
			return;
		}
		var card = util_CardManager.get_card(title);
		var last_y = App.theme.padding;
		var _g = 0;
		var _g1 = card.content;
		while(_g < _g1.length) {
			var item = _g1[_g];
			++_g;
			if(item.flag != null) {
				if(!util_FlagManager.get(item.flag)) {
					continue;
				}
			}
			var content_item;
			switch(item.type.toLowerCase()) {
			case "article":
				content_item = App.theme.load_article(item.text,item.src,item.url);
				break;
			case "button":
				content_item = App.theme.load_button(item.text,item.end != null && item.end ? "app____end" : item.url);
				break;
			case "flag":
				util_FlagManager.set(item.text,item.value != null ? item.value : true);
				content_item = new PIXI.Container();
				break;
			case "image":
				content_item = App.theme.load_image(item.src,item.display);
				break;
			case "paragraph":
				content_item = App.theme.load_paragraph(item.text);
				break;
			case "points":
				util_PointsManager.receive_pts(title,item.amt);
				content_item = new PIXI.Container();
				break;
			case "textbox":
				content_item = App.theme.load_textbox(item.text);
				break;
			default:
				content_item = new PIXI.Container();
			}
			if(item.type == "image" && item.display == "full-width" && last_y == App.theme.padding) {
				last_y = 0;
				this.padding = App.theme.padding * 2;
			}
			content_item.position.y = last_y;
			last_y += content_item.height + App.theme.margin;
			this.content_array.push(content_item);
			this.addChild(content_item);
		}
		this.loaded = true;
	}
	,unload_card: function(next) {
		var _gthis = this;
		zero_utilities_Timer.get(App.theme.unload(this.content_array),function() {
			while(_gthis.content_array.length > 0) {
				var tmp = _gthis.content_array.shift();
				_gthis.destroy_object(tmp);
			}
			_gthis.loaded = false;
			_gthis.load_card(next);
			return;
		});
	}
	,destroy_object: function(object) {
		util_ResizeUtil.resize_map.remove(object);
		object.destroy(false);
	}
	,resize: function() {
		var last_y = App.theme.padding;
		var _g = 0;
		var _g1 = this.content_array;
		while(_g < _g1.length) {
			var item = _g1[_g];
			++_g;
			item.y = last_y;
			last_y += item.height + App.theme.margin;
		}
		this.scroll(0);
	}
	,scroll: function(delta) {
		this.y -= delta;
		this.y = Math.min(Math.max(this.y,-(this.height + this.padding) + App.i.renderer.height),0);
	}
});
var objects_EndScreen = function() {
	var _gthis = this;
	PIXI.Container.call(this);
	this.bg = new PIXI.Graphics();
	this.bg.beginFill(0,0.5);
	this.bg.drawRect(0,0,1,1);
	this.title = new PIXI.Text(App.config.title,{ fontFamily : "Avenir Next Demi", fontSize : 36, align : "left", fill : 16777215, wordWrap : true});
	this.subtitle = new PIXI.Text(App.config.subtitle.toUpperCase(),{ fontFamily : "Avenir Next Bold", fontSize : 18, align : "left", fill : 16777215});
	this.bob_pts = new PIXI.Text("Points earned: " + util_PointsManager.get_total(),{ fontFamily : "Avenir Next Bold", fontSize : 18, align : "left", fill : 16777215});
	this.replay = new PIXI.Graphics();
	this.replay.beginFill(16777215);
	this.replay.drawRoundedRect(0,0,142,48,24);
	this.replay.endFill();
	this.replay.interactive = true;
	this.replay.buttonMode = true;
	this.replay.on("pointertap",function() {
		window.location.reload();
		return;
	});
	var r_text = new PIXI.Text("Replay",{ fontFamily : "Avenir Next Demi", fontSize : 18, fill : 0});
	r_text.anchor.set(0.5);
	r_text.position.set(71,24);
	this.replay.addChild(r_text);
	this.exit = new PIXI.Graphics();
	this.exit.beginFill(16728128);
	this.exit.drawRoundedRect(0,0,142,48,24);
	this.exit.endFill();
	this.exit.interactive = true;
	this.exit.buttonMode = true;
	this.exit.on("pointertap",function() {
		return;
	});
	var e_text = new PIXI.Text("Exit",{ fontFamily : "Avenir Next Demi", fontSize : 18, fill : 16777215});
	e_text.anchor.set(0.5);
	e_text.position.set(71,24);
	this.exit.addChild(e_text);
	this.continue_text = new PIXI.Text("Recommended for you:",{ fontFamily : "Avenir Next Demi", fontSize : 24, align : "left", fill : 16777215});
	this.content_lane = new objects_ContentLane(App.config.content_links != null ? App.config.content_links : objects_EndScreen.get_articles(App.config.board));
	var resize = function() {
		if(App.i.renderer.width >= 480 && App.i.renderer.height >= 600) {
			_gthis.title.style.wordWrapWidth = App.i.renderer.width - 64;
			_gthis.title.position.set(32,App.i.renderer.height - 547);
			_gthis.subtitle.position.set(32,App.i.renderer.height - 480);
			_gthis.bob_pts.position.set(32,App.i.renderer.height - 455);
			_gthis.replay.position.set(32,App.i.renderer.height - 414);
			_gthis.exit.position.set(190,App.i.renderer.height - 414);
			_gthis.continue_text.position.set(32,App.i.renderer.height - 334);
			return _gthis.content_lane.y = App.i.renderer.height - 288;
		} else {
			_gthis.title.position.set(32,48);
			_gthis.title.style.wordWrapWidth = App.i.renderer.width - 64;
			_gthis.subtitle.position.set(32,_gthis.title.y + _gthis.title.height + 16);
			_gthis.bob_pts.position.set(32,_gthis.subtitle.y + _gthis.subtitle.height + 16);
			_gthis.replay.position.set(App.i.renderer.width / 2 - 142 - 8,App.i.renderer.height - 80);
			_gthis.exit.position.set(App.i.renderer.width / 2 + 8,App.i.renderer.height - 80);
			_gthis.continue_text.y = App.i.renderer.height + 128;
			return _gthis.content_lane.y = App.i.renderer.height + 128;
		}
	};
	util_ResizeUtil.resize_map.set(this,function() {
		return resize();
	});
	resize();
	this.addChild(this.bg);
	this.addChild(this.title);
	this.addChild(this.subtitle);
	this.addChild(this.bob_pts);
	this.addChild(this.replay);
	this.addChild(this.exit);
	this.addChild(this.continue_text);
	this.addChild(this.content_lane);
	var i = 0;
	var _g = 0;
	var _g1 = this.children;
	while(_g < _g1.length) {
		var child = _g1[_g];
		++_g;
		child.alpha = 0;
		TweenMax.to(child,0.2,{ alpha : 1, delay : i++ * 0.2});
	}
};
objects_EndScreen.get_articles = function(board) {
	if(board == null || board.assets == null) {
		return [];
	}
	var _g = [];
	var _g1 = 0;
	var _g2 = board.assets;
	while(_g1 < _g2.length) {
		var asset = _g2[_g1];
		++_g1;
		_g.push({ title : asset.title, image : asset.image.url, url : "https://www3.blueoceanbrain.com/board/" + board.id + "/article/" + asset.id});
	}
	return _g;
};
objects_EndScreen.__super__ = PIXI.Container;
objects_EndScreen.prototype = $extend(PIXI.Container.prototype,{
});
var objects_ContentLane = function(lane_data) {
	this.user_initiated_scroll = false;
	this.content_array = [];
	this.lane_padding = 16;
	this.content_width = 0;
	PIXI.Container.call(this);
	this.position.set(32,App.i.renderer.height - 288);
	var _g = 0;
	while(_g < lane_data.length) {
		var content_data = lane_data[_g];
		++_g;
		this.add_content_link(content_data);
	}
	if(this.lane_padding < 32) {
		this.content_width += 32 - this.lane_padding;
	}
	this.animate_lane(lane_data.length);
};
objects_ContentLane.__super__ = PIXI.Container;
objects_ContentLane.prototype = $extend(PIXI.Container.prototype,{
	add_content_link: function(data) {
		var _gthis = this;
		var content_container = new objects_ContentLink();
		content_container.data = data;
		content_container.beginFill(16777215);
		content_container.drawRect(0,0,300,256);
		content_container.endFill();
		var alpha_mask = new PIXI.Graphics();
		alpha_mask.beginFill(16711680);
		alpha_mask.drawRect(0,0,300,180);
		alpha_mask.endFill();
		content_container.addChild(alpha_mask);
		var loader = new PIXI.loaders.Loader();
		loader.reset();
		loader.add({ url : data.image, crossOrigin : ""}).load(function() {
			var content_graphic = PIXI.Sprite.fromImage(data.image);
			content_graphic.scale.set(300 / content_graphic.width);
			content_graphic.mask = alpha_mask;
			content_graphic.alpha = 0;
			TweenMax.to(content_graphic,0.2,{ alpha : 1});
			return content_container.addChild(content_graphic);
		});
		var content_title = new PIXI.Text(data.title,{ fontFamily : "Avenir Next Demi", fontSize : 16, fill : 0, align : "center", wordWrap : true, wordWrapWidth : 260});
		content_title.anchor.set(0.5);
		content_title.position.set(150,220);
		content_container.addChild(content_title);
		content_container.interactive = true;
		content_container.on("pointertap",function() {
			_gthis.content_action(content_container);
			return;
		});
		content_container.position.set(this.content_width,0);
		this.content_width += 300 + this.lane_padding;
		this.hitArea = new PIXI.Rectangle(0,0,this.content_width,256 + this.lane_padding);
		this.content_array.push(content_container);
		this.addChild(content_container);
	}
	,animate_lane: function(amt) {
		var _gthis = this;
		var timer_amt = 5;
		var i = 0;
		var _g = 0;
		var _g1 = this.content_array;
		while(_g < _g1.length) {
			var content = [_g1[_g]];
			++_g;
			zero_utilities_Timer.get(i++ * timer_amt,(function(content1) {
				return function() {
					if(!_gthis.user_initiated_scroll) {
						_gthis.focus_on_content(content1[0]);
					}
					return;
				};
			})(content));
		}
		zero_utilities_Timer.get(amt * timer_amt,function() {
			_gthis.animate_lane(amt);
			return;
		});
	}
	,focus_on_content: function(content) {
		var x = Math.min(Math.max(App.i.renderer.width / 2 - 150 - content.x,App.i.renderer.width - this.content_width),32);
		TweenMax.to(this,0.25,{ x : x});
		var _g = 0;
		var _g1 = this.content_array;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			c.alpha = 0.5;
			c.buttonMode = false;
		}
		TweenMax.to(content,0.25,{ alpha : 1});
		zero_utilities_Timer.get(0.25,function() {
			return content.buttonMode = true;
		});
	}
	,content_action: function(content) {
		this.user_initiated_scroll = true;
		if(content.buttonMode) {
			window.document.location.href = content.data.url;
		} else {
			this.focus_on_content(content);
		}
	}
});
var objects_ContentLink = function(nativeLines) {
	PIXI.Graphics.call(this,nativeLines);
};
objects_ContentLink.__super__ = PIXI.Graphics;
objects_ContentLink.prototype = $extend(PIXI.Graphics.prototype,{
});
var themes_Legacy = $hx_exports["themes"]["Legacy"] = function() {
	this.legacy = true;
	this.margin = 24;
	this.padding = 48;
	this.fonts = ["Avenir Next","Avenir Next Medium","Avenir Next Demi","Avenir Next Bold"];
};
themes_Legacy.prototype = {
	load_title: function() {
		var _gthis = this;
		var container = new PIXI.Container();
		App.i.stage.addChildAt(container,0);
		var g = new PIXI.Graphics();
		g.beginFill(0);
		g.drawRect(0,0,1,1);
		g.endFill();
		container.addChild(g);
		var img = PIXI.Sprite.fromImage(App.config.bg_src);
		img.anchor.set(0.5);
		container.addChild(img);
		var canvas = window.document.createElement("canvas");
		canvas.width = Math.floor(img.texture.baseTexture.width);
		canvas.height = Math.floor(img.texture.baseTexture.height);
		var ctx = canvas.getContext("2d");
		var gradient = ctx.createLinearGradient(0,0,0,canvas.height);
		gradient.addColorStop(0.25,"transparent");
		gradient.addColorStop(0.75,"black");
		ctx.fillStyle = gradient;
		ctx.fillRect(0,0,canvas.width,canvas.height);
		var gradient_sprite = new PIXI.Sprite(PIXI.Texture.fromCanvas(canvas));
		gradient_sprite.anchor.set(0.5);
		gradient_sprite.alpha = 0;
		img.addChild(gradient_sprite);
		var shade = new PIXI.Graphics();
		shade.beginFill(0,0.8);
		shade.drawRect(0,0,1,1);
		shade.endFill();
		shade.alpha = 0;
		container.addChild(shade);
		var description = new PIXI.Text(App.config.description,themes_Legacy.title_p);
		description.anchor.set(0.5,0);
		container.addChild(description);
		var subtitle = new PIXI.Text(App.config.subtitle.toUpperCase(),themes_Legacy.title_sub);
		subtitle.anchor.set(0.5,0);
		container.addChild(subtitle);
		var title = new PIXI.Text(App.config.title,themes_Legacy.title_h);
		title.anchor.set(0.5,0);
		container.addChild(title);
		var button = this.load_button(App.config.button_text,App.config.first_card);
		button.interactive = false;
		button.removeAllListeners();
		button.on("pointertap",function() {
			button.interactive = false;
			TweenMax.to(title,1,{ alpha : 0});
			TweenMax.to(subtitle,1,{ alpha : 0});
			TweenMax.to(description,1,{ alpha : 0});
			TweenMax.to(button,1,{ alpha : 0});
			TweenMax.to(gradient_sprite,1,{ alpha : 0});
			TweenMax.to(shade,1,{ alpha : 1});
			return zero_utilities_Timer.get(1.5,function() {
				util_LinkManager.go_to_link(App.config.first_card);
				return;
			});
		});
		container.addChild(button);
		gradient_sprite.alpha = 0;
		title.alpha = 0;
		subtitle.alpha = 0;
		description.alpha = 0;
		button.alpha = 0;
		var resize = function() {
			button.y = App.i.renderer.height - _gthis.padding - button.height;
			description.style.wordWrapWidth = App.i.renderer.width - _gthis.padding * 2 - _gthis.margin * 2;
			description.position.set(App.i.renderer.width / 2,button.y - 16 - description.height);
			subtitle.style.wordWrapWidth = App.i.renderer.width - _gthis.padding * 2 - _gthis.margin * 2;
			subtitle.position.set(App.i.renderer.width / 2,description.y - 16 - subtitle.height);
			title.style.wordWrapWidth = App.i.renderer.width - _gthis.padding * 2 - _gthis.margin * 2;
			title.position.set(App.i.renderer.width / 2,subtitle.y - 8 - title.height);
			g.scale.set(App.i.renderer.width,App.i.renderer.height);
			shade.scale.set(App.i.renderer.width,App.i.renderer.height);
			var scale_amt = Math.max(App.i.renderer.width / img.texture.baseTexture.width,App.i.renderer.height / img.texture.baseTexture.height);
			img.scale.set(scale_amt,scale_amt);
			img.position.set(App.i.renderer.width / 2,App.i.renderer.height / 2);
			return;
		};
		util_ResizeUtil.resize_map.set(container,function() {
			resize();
			return;
		});
		resize();
		zero_utilities_Timer.cancel_all();
		TweenMax.to(gradient_sprite,1,{ alpha : 0.8});
		TweenMax.to(title,1,{ alpha : 1, delay : 1});
		TweenMax.to(subtitle,1,{ alpha : 1, delay : 1.1});
		TweenMax.to(description,1,{ alpha : 1, delay : 1.2});
		TweenMax.to(button,1,{ alpha : 1, delay : 1.5, onComplete : function() {
			return button.interactive = true;
		}});
	}
	,load_end: function() {
	}
	,load_image: function(src,display) {
		var out = PIXI.Sprite.fromImage(src);
		out.anchor.set(0.5,0);
		var resize = function(s,d) {
			var target_width = App.i.renderer.width - (d == "full-width" ? 0 : App.theme.padding * 2);
			var scale_amt = Math.min(target_width / s.texture.baseTexture.width,1);
			s.scale.set(scale_amt);
			return s.x = App.i.renderer.width / 2;
		};
		resize(out,display);
		util_ResizeUtil.resize_map.set(out,function() {
			return resize(out,display);
		});
		out.alpha = 0;
		zero_utilities_Timer.get(App.i.content_container.content_array.length * 0.2,function() {
			return TweenMax.to(out,0.25,{ alpha : 1});
		});
		return out;
	}
	,load_paragraph: function(text) {
		var _gthis = this;
		var out = new PIXI.Text(text,themes_Legacy.p);
		out.x = this.padding;
		var resize = function(t) {
			return t.style.wordWrapWidth = App.i.renderer.width - _gthis.padding * 2;
		};
		resize(out);
		util_ResizeUtil.resize_map.set(out,function() {
			return resize(out);
		});
		out.alpha = 0;
		zero_utilities_Timer.get(App.i.content_container.content_array.length * 0.2,function() {
			return TweenMax.to(out,0.25,{ alpha : 1});
		});
		return out;
	}
	,load_textbox: function(text) {
		var _gthis = this;
		var out = new PIXI.Graphics();
		out.x = this.padding;
		var text1 = new PIXI.Text(text,themes_Legacy.quote);
		text1.anchor.set(0.5);
		out.addChild(text1);
		var resize = function(g,t) {
			t.style.wordWrapWidth = App.i.renderer.width - (_gthis.margin * 2 + _gthis.padding * 2);
			t.position.set((App.i.renderer.width - _gthis.padding * 2) / 2,(t.height + _gthis.margin * 2) / 2);
			g.clear();
			g.beginFill(161727);
			g.drawRoundedRect(0,0,App.i.renderer.width - _gthis.padding * 2,t.height + _gthis.margin * 2,8);
			return g.endFill();
		};
		resize(out,text1);
		util_ResizeUtil.resize_map.set(out,function() {
			return resize(out,text1);
		});
		out.alpha = 0;
		zero_utilities_Timer.get(App.i.content_container.content_array.length * 0.2,function() {
			return TweenMax.to(out,0.25,{ alpha : 1});
		});
		return out;
	}
	,load_button: function(text,url) {
		var _gthis = this;
		var out = new PIXI.Graphics();
		var text1 = new PIXI.Text(text,themes_Legacy.a);
		text1.anchor.set(0.5,0.5);
		out.addChild(text1);
		out.interactive = true;
		out.buttonMode = true;
		out.on("pointertap",function() {
			util_LinkManager.go_to_link(url);
			return;
		});
		var resize = function(g,t) {
			var pad = App.i.renderer.width <= 400 ? _gthis.padding : _gthis.padding * 2;
			t.style.wordWrapWidth = App.i.renderer.width - (_gthis.margin * 2 + pad * 2);
			var height = t.height + (t.height <= t.style.lineHeight ? _gthis.margin : _gthis.margin * 2);
			t.x = (App.i.renderer.width - pad * 2) / 2;
			t.y = height / 2;
			g.clear();
			g.x = pad;
			g.beginFill(16777215);
			g.drawRoundedRect(0,0,App.i.renderer.width - pad * 2,height,16);
			return g.endFill();
		};
		resize(out,text1);
		util_ResizeUtil.resize_map.set(out,function() {
			return resize(out,text1);
		});
		out.alpha = 0;
		zero_utilities_Timer.get(App.i.content_container.content_array.length * 0.2,function() {
			return TweenMax.to(out,0.25,{ alpha : 1});
		});
		return out;
	}
	,load_article: function(text,src,url) {
		var _gthis = this;
		var out = new PIXI.Container();
		out.interactive = true;
		out.buttonMode = true;
		out.x = this.padding;
		out.on("pointertap",function() {
			util_LinkManager.go_to_link(url);
			return;
		});
		var image = PIXI.Sprite.fromImage(src);
		var box = new PIXI.Graphics();
		box.beginFill(0,0.75);
		box.drawRect(0,0,1,1);
		box.endFill();
		box.pivot.set(0,1);
		var caption = new PIXI.Text(text,themes_Legacy.caption);
		caption.anchor.set(0,1);
		caption.x = this.margin;
		out.addChild(image);
		out.addChild(box);
		out.addChild(caption);
		var resize = function(c,i,t,g) {
			var target_width = App.i.renderer.width - _gthis.padding * 2;
			var scale_amt = target_width / i.texture.baseTexture.width;
			i.scale.set(scale_amt);
			t.style.wordWrapWidth = target_width - App.theme.margin * 2;
			t.y = i.height - App.theme.margin;
			g.scale.set(i.width,t.height + App.theme.margin * 2);
			return g.y = i.height;
		};
		resize(out,image,caption,box);
		util_ResizeUtil.resize_map.set(out,function() {
			return resize(out,image,caption,box);
		});
		out.alpha = 0;
		zero_utilities_Timer.get(App.i.content_container.content_array.length * 0.2,function() {
			return TweenMax.to(out,0.25,{ alpha : 1});
		});
		return out;
	}
	,load_points: function(amt) {
		var alert = new PIXI.Graphics();
		alert.beginFill(10742334);
		alert.drawRoundedRect(-128,-24,256,48,24);
		alert.endFill();
		var text = new PIXI.Text("You earned " + amt + " points!",themes_Legacy.a);
		text.anchor.set(0.5);
		alert.addChild(text);
		alert.position.set(App.i.renderer.width / 2,App.i.renderer.height + 40);
		App.i.stage.addChild(alert);
		TweenMax.to(alert,0.5,{ y : App.i.renderer.height - 48});
		zero_utilities_Timer.get(2.5,function() {
			return TweenMax.to(alert,0.5,{ y : App.i.renderer.height + 40, onComplete : function() {
				alert.destroy();
				return;
			}});
		});
		return new PIXI.Container();
	}
	,unload: function(arr) {
		var i = 0.2;
		var _g = 0;
		while(_g < arr.length) {
			var obj = arr[_g];
			++_g;
			TweenMax.to(obj,i,{ alpha : 0});
		}
		return i;
	}
};
var themes_Simple = $hx_exports["themes"]["Simple"] = function() {
	this.legacy = true;
	this.margin = 24;
	this.padding = 48;
	this.fonts = [];
};
themes_Simple.resize_sprite = function(sprite,display) {
	var target_width = App.i.renderer.width - (display == "full-width" ? 0 : App.theme.padding * 2);
	var scale_amt = Math.min(target_width / sprite.texture.baseTexture.width,1);
	sprite.scale.set(scale_amt);
	sprite.x = App.i.renderer.width / 2;
};
themes_Simple.resize_button = function(button,text) {
	button.x = App.theme.padding;
	var target_width = App.i.renderer.width - App.theme.padding * 2;
	if(button.width < target_width) {
		return;
	}
	text.style.wordWrapWidth = App.i.renderer.width - (App.theme.padding * 2 + App.theme.margin * 4);
	button.clear();
	button.beginFill(33023);
	button.drawRoundedRect(0,0,target_width,text.height + App.theme.margin,(text.height + App.theme.margin) / 2);
	button.endFill();
	text.position.set(button.width / 2,button.height / 2);
};
themes_Simple.resize_text = function(text,margin) {
	text.style.wordWrapWidth = App.i.renderer.width - margin * 2;
	text.x = App.theme.padding;
};
themes_Simple.resize_article = function(container,sprite,text,box) {
	var target_width = App.i.renderer.width - App.theme.padding * 2;
	var scale_amt = target_width / sprite.texture.baseTexture.width;
	sprite.scale.set(scale_amt);
	text.style.wordWrapWidth = target_width - App.theme.margin * 2;
	text.y = sprite.height - App.theme.margin;
	box.scale.set(sprite.width,text.height + App.theme.margin * 2);
	box.y = sprite.height;
	container.x = App.theme.padding;
};
themes_Simple.resize_textbox = function(box,text) {
	text.style.wordWrapWidth = App.i.renderer.width - (App.theme.padding * 2 + App.theme.margin * 2);
	box.clear();
	box.beginFill(6316125);
	box.drawRoundedRect(0,0,App.i.renderer.width - App.theme.padding * 2,text.height + App.theme.margin * 2,8);
	box.endFill();
	box.x = App.theme.padding;
};
themes_Simple.prototype = {
	load_title: function() {
	}
	,load_end: function() {
	}
	,load_image: function(src,display) {
		var out = PIXI.Sprite.fromImage(src);
		out.anchor.set(0.5,0);
		themes_Simple.resize_sprite(out,display);
		util_ResizeUtil.resize_map.set(out,function() {
			themes_Simple.resize_sprite(out,display);
			return;
		});
		out.alpha = 0;
		zero_utilities_Timer.get(App.i.content_container.content_array.length * 0.2,function() {
			return TweenMax.to(out,0.25,{ alpha : 1});
		});
		return out;
	}
	,load_paragraph: function(text) {
		var _gthis = this;
		var text1 = new PIXI.Text(text,themes_Styles.text_main);
		util_ResizeUtil.resize_map.set(text1,function() {
			themes_Simple.resize_text(text1,_gthis.padding);
			return;
		});
		themes_Simple.resize_text(text1,this.padding);
		text1.alpha = 0;
		zero_utilities_Timer.get(App.i.content_container.content_array.length * 0.2,function() {
			return TweenMax.to(text1,0.25,{ alpha : 1});
		});
		return text1;
	}
	,load_textbox: function(text) {
		var box = new PIXI.Graphics();
		var text1 = new PIXI.Text(text,themes_Styles.text_textbox);
		text1.position.set(this.margin,this.margin);
		util_ResizeUtil.resize_map.set(box,function() {
			themes_Simple.resize_textbox(box,text1);
			return;
		});
		themes_Simple.resize_textbox(box,text1);
		box.addChild(text1);
		box.alpha = 0;
		zero_utilities_Timer.get(App.i.content_container.content_array.length * 0.2,function() {
			return TweenMax.to(box,0.25,{ alpha : 1});
		});
		return box;
	}
	,load_button: function(text,url) {
		var text1 = new PIXI.Text(text,themes_Styles.text_button);
		var box = new PIXI.Graphics();
		box.beginFill(33023);
		box.drawRoundedRect(0,0,text1.width + this.margin * 4,text1.height + this.margin,(text1.height + this.margin) / 2);
		box.endFill();
		box.interactive = true;
		box.buttonMode = true;
		box.on("pointertap",function() {
			util_LinkManager.go_to_link(url);
			return;
		});
		text1.anchor.set(0.5);
		text1.position.set(box.width / 2,box.height / 2);
		box.addChild(text1);
		util_ResizeUtil.resize_map.set(box,function() {
			themes_Simple.resize_button(box,text1);
			return;
		});
		themes_Simple.resize_button(box,text1);
		box.alpha = 0;
		zero_utilities_Timer.get(App.i.content_container.content_array.length * 0.2,function() {
			return TweenMax.to(box,0.25,{ alpha : 1});
		});
		return box;
	}
	,load_article: function(text,src,url) {
		var container = new PIXI.Container();
		container.interactive = true;
		container.buttonMode = true;
		container.on("pointertap",function() {
			util_LinkManager.go_to_link(url);
			return;
		});
		var image = PIXI.Sprite.fromImage(src);
		var box = new PIXI.Graphics();
		box.beginFill(0,0.75);
		box.drawRect(0,0,1,1);
		box.endFill();
		box.pivot.set(0,1);
		var subtitle = new PIXI.Text(text,themes_Styles.text_button);
		subtitle.anchor.set(0,1);
		subtitle.x = this.margin;
		container.addChild(image);
		container.addChild(box);
		container.addChild(subtitle);
		util_ResizeUtil.resize_map.set(container,function() {
			themes_Simple.resize_article(container,image,subtitle,box);
			return;
		});
		themes_Simple.resize_article(container,image,subtitle,box);
		container.alpha = 0;
		zero_utilities_Timer.get(App.i.content_container.content_array.length * 0.2,function() {
			return TweenMax.to(container,0.25,{ alpha : 1});
		});
		return container;
	}
	,load_points: function(amt) {
		var alert = new PIXI.Graphics();
		alert.beginFill(3194880);
		alert.drawRoundedRect(-128,-32,256,64,16);
		alert.endFill();
		var text = new PIXI.Text("You earned " + amt + " points!",themes_Styles.text_button);
		text.anchor.set(0.5);
		alert.addChild(text);
		alert.position.set(App.i.renderer.width / 2,App.i.renderer.height + 40);
		App.i.stage.addChild(alert);
		TweenMax.to(alert,1,{ y : App.i.renderer.height - 64});
		zero_utilities_Timer.get(5,function() {
			return TweenMax.to(alert,1,{ y : App.i.renderer.height + 40, onComplete : function() {
				alert.destroy();
				return;
			}});
		});
		return new PIXI.Container();
	}
	,unload: function(arr) {
		var i = 0.2;
		var _g = 0;
		while(_g < arr.length) {
			var obj = arr[_g];
			++_g;
			TweenMax.to(obj,i,{ alpha : 0});
		}
		return i;
	}
};
var themes_Styles = function() { };
var util_CardManager = function() { };
util_CardManager.get_card = function(title) {
	var _g = 0;
	var _g1 = App.deck;
	while(_g < _g1.length) {
		var card = _g1[_g];
		++_g;
		if(card.title == title) {
			return card;
		}
	}
	console.log("src/util/CardManager.hx:7:","No card with title \"" + title + "\"");
	return { title : "Blank", content : []};
};
util_CardManager.exists = function(title) {
	var _g = 0;
	var _g1 = App.deck;
	while(_g < _g1.length) {
		var card = _g1[_g];
		++_g;
		if(card.title == title) {
			return true;
		}
	}
	return false;
};
var util_FlagManager = function() { };
util_FlagManager.set = function(flag,value) {
	var _this = util_FlagManager.map;
	if(__map_reserved[flag] != null) {
		_this.setReserved(flag,value);
	} else {
		_this.h[flag] = value;
	}
};
util_FlagManager.get = function(flag) {
	var _this = util_FlagManager.map;
	if(__map_reserved[flag] != null ? _this.existsReserved(flag) : _this.h.hasOwnProperty(flag)) {
		var _this1 = util_FlagManager.map;
		if(__map_reserved[flag] != null) {
			return _this1.getReserved(flag);
		} else {
			return _this1.h[flag];
		}
	} else {
		return false;
	}
};
var util_LinkManager = function() { };
util_LinkManager.go_to_link = function(url) {
	if(Math.abs(App.i.content_container.total_move) > util_LinkManager.move_threshold) {
		return;
	}
	if(util_CardManager.exists(url) || url == "app____end") {
		App.i.content_container.load_card(url);
	} else {
		window.location.href = url;
	}
};
var util_PointsManager = function() { };
util_PointsManager.receive_pts = function(title,amt) {
	var _this = util_PointsManager.earned;
	if(__map_reserved[title] != null ? _this.existsReserved(title) : _this.h.hasOwnProperty(title)) {
		return;
	}
	var _this1 = util_PointsManager.earned;
	if(__map_reserved[title] != null) {
		_this1.setReserved(title,amt);
	} else {
		_this1.h[title] = amt;
	}
	App.theme.load_points(amt);
};
util_PointsManager.get_total = function() {
	var out = 0;
	var _g = new haxe_iterators_MapKeyValueIterator(util_PointsManager.earned);
	while(_g.hasNext()) {
		var _g1 = _g.next();
		var title = _g1.key;
		var amt = _g1.value;
		out += amt;
	}
	return out;
};
var util_ResizeUtil = function() { };
util_ResizeUtil.resize = function() {
	var _fn = function() {
		return;
	};
	var _g = new haxe_iterators_MapKeyValueIterator(util_ResizeUtil.resize_map);
	while(_g.hasNext()) {
		var _g1 = _g.next();
		var object = _g1.key;
		var fn = _g1.value;
		if(object == App.i.content_container) {
			_fn = fn;
			continue;
		}
		if(object != null) {
			fn();
		}
	}
	_fn();
};
var zero_extensions_ArrayExt = function() { };
zero_extensions_ArrayExt.merge = function(a1,a2) {
	var _g = 0;
	while(_g < a2.length) {
		var o = a2[_g];
		++_g;
		a1.push(o);
	}
	return a1;
};
zero_extensions_ArrayExt.remove_duplicates = function(arr) {
	var unique = [];
	var _g = 0;
	while(_g < arr.length) {
		var item = arr[_g];
		++_g;
		if(unique.indexOf(item) < 0) {
			unique.push(item);
		}
	}
	arr = unique;
	return arr;
};
var zero_utilities_Timer = function() {
};
zero_utilities_Timer.get = function(time,fn,repeat) {
	if(repeat == null) {
		repeat = 1;
	}
	var timer = zero_utilities_Timer.pool.length > 0 ? zero_utilities_Timer.pool.shift() : new zero_utilities_Timer();
	timer.time = time;
	timer.fn = fn;
	timer.repeat = repeat;
	timer.paused = false;
	timer.elapsed = 0;
	zero_utilities_Timer.timers.push(timer);
	return timer;
};
zero_utilities_Timer.update = function(dt) {
	var _g = 0;
	var _g1 = zero_utilities_Timer.timers;
	while(_g < _g1.length) {
		var timer = _g1[_g];
		++_g;
		timer.run(dt);
	}
};
zero_utilities_Timer.cancel_all = function() {
	var _g = 0;
	var _g1 = zero_utilities_Timer.timers;
	while(_g < _g1.length) {
		var timer = _g1[_g];
		++_g;
		timer.cancel();
	}
};
zero_utilities_Timer.prototype = {
	cancel: function() {
		if(HxOverrides.remove(zero_utilities_Timer.timers,this)) {
			zero_utilities_Timer.pool.push(this);
		}
	}
	,run: function(dt) {
		if(this.paused) {
			return;
		}
		this.elapsed += dt;
		if(this.time - this.elapsed > zero_utilities_Timer.epsilon) {
			return;
		}
		this.fn();
		this.elapsed = 0;
		this.repeat--;
		if(this.repeat != 0) {
			return;
		}
		this.cancel();
	}
};
var $_;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
haxe_ds_ObjectMap.count = 0;
var __map_reserved = {};
themes_Legacy.title_h = new PIXI.TextStyle({ fontFamily : "Avenir Next Demi", align : "center", fill : 16777215, fontSize : 24, wordWrap : true});
themes_Legacy.title_sub = new PIXI.TextStyle({ fontFamily : "Avenir Next Bold", fontSize : 12, fill : 16777215, align : "center", letterSpacing : 4});
themes_Legacy.title_p = new PIXI.TextStyle({ fontFamily : "Avenir Next Medium", align : "left", fill : 16777215, fontSize : 15, lineHeight : 24, wordWrap : true});
themes_Legacy.p = new PIXI.TextStyle({ fontFamily : "Avenir Next Medium", align : "left", fill : 16777215, fontSize : 20, lineHeight : 28, wordWrap : true});
themes_Legacy.quote = new PIXI.TextStyle({ fontFamily : "Avenir Next Demi", align : "left", fill : 16777215, fontSize : 20, lineHeight : 28, wordWrap : true});
themes_Legacy.a = new PIXI.TextStyle({ fontFamily : "Avenir Next Medium", align : "left", fill : 3355443, fontSize : 18, lineHeight : 22, wordWrap : true, fontWeight : "600"});
themes_Legacy.caption = new PIXI.TextStyle({ fontFamily : "Avenir Next Medium", align : "left", fill : 16777215, fontSize : 18, wordWrap : true});
themes_Styles.text_main = new PIXI.TextStyle({ fill : 2105376, wordWrap : true, fontSize : 18});
themes_Styles.text_button = new PIXI.TextStyle({ fill : 16777215, wordWrap : true, fontSize : 16});
themes_Styles.text_textbox = new PIXI.TextStyle({ fill : 16777215, wordWrap : true, fontSize : 20});
util_FlagManager.map = new haxe_ds_StringMap();
util_LinkManager.move_threshold = 8;
util_PointsManager.earned = new haxe_ds_StringMap();
util_ResizeUtil.resize_map = new haxe_ds_ObjectMap();
zero_utilities_Timer.timers = [];
zero_utilities_Timer.pool = [];
zero_utilities_Timer.epsilon = 1e-8;
App.main();
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
