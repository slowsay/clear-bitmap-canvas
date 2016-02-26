/**
 * @author slowsay
 */
var Comm = {
	fixedlayer : function(obj, _w, _h, _left, _top) {
		$(obj).css({
			width : _w,
			height : _h,
			left : _left,
			top : _top
		});

	},
	getAwardsName : function(id) {
		var _obj;
		for (var j = 0; j < awardname.length; j++) {
			if (id == awardname[j].id) {
				_obj = awardname[j].name;
				break;
			}

		}
		return _obj;
	},
	click : function(n, fun) {
		$(n).on('click', fun);
	},
	remove : function(n) {
		$(n).off();
	},
	movelayer : function(obj) {
		$(obj).css({
			left : $(document).scrollLeft() + _wid / 2,
			top : $(document).scrollTop() + _hei / 2
		});
	},

	mousewheel : function(n, fun) {
		$(n).on('mousewheel', fun);
	},
	mDown : function(n, fun) {
		$(n).on('mousedown', fun);
	},
	mUp : function(n, fun) {
		$(n).on('mouseup', fun);
	},
	focusIn : function(n, fun) {
		$(n).on('focusin', fun);

	},
	focusOut : function(n, fun) {
		$(n).on('focusout', fun);
	},
	mMove : function(n, fun) {
		$(n).on('mousemove', fun);
	},
	mouseOO : function(n, obj) {
		$(n).on('mouseover', function(e) {
			$(this).addClass(obj);
		});
		$(n).on('mouseout', function(e) {
			$(this).removeClass(obj);
		});
	},
	mouseOverOut : function(n, obj, obj2) {
		$(n).on('mouseover', function(e) {
			$(this).css(obj);
		});
		$(n).on('mouseout', function(e) {
			$(this).css(obj2);
		});
	},
	mouseOverOutTw : function(n) {
		$(n).on('mouseover', function(e) {
			Comm.Tw($(this), speeds, {
				alpha : 1
			});
		});

		$(n).on('mouseout', function(e) {
			Comm.Tw($(this), speeds, {
				alpha : 0
			});
		});
	},
	mouseOverOutList : function(n, n1, n2) {

		$(n).find(n1).on('mouseover', function(e) {
			var id = $(this).index();
			for (var i = 0; i < $(n).find(n1).length; i++) {
				if (id == i) {
					Comm.Tw($(n).find(n1).eq(id).find(n2), speeds, {
						alpha : 1
					});
				} else {
					Comm.Tw($(n).find(n1).eq(i).find(n2), speeds, {
						alpha : 0
					});
				}
			};

		});
		$(n).on('mouseout', function(e) {
			for (var i = 0; i < $(n).find(n1).length; i++) {
				Comm.Tw($(n).find(n1).eq(i).find(n2), speeds, {
					alpha : 0
				});
			}

		});

	},
	Tw : function(n, s, obj) {
		TweenMax.to(n, s, obj);
	},
	isNumonly : function(obj) {
		return /\d+/.test(obj);
	},
	searchAwardName : function(id) {
		for (var i = 0; i < awardname.length; i++) {
			if (id == awardname[i].id) {
				var s = awardname[i].name;
				break;
			}
		};
		return s;
	},
	snshare : function(obj) {
		if (obj.kind == 'qq') {
			window.open('http://v.t.qq.com/share/share.php?url=' + obj.url + '&title=' + obj.con + '&pic=' + obj.path);
		} else if (obj.kind == 'sina') {
			window.open('http://v.t.sina.com.cn/share/share.php?url=' + obj.url + '&title=' + obj.con + '&pic=' + obj.path);
		} else if (obj.kind == 'ren') {
			window.open('http://widget.renren.com/dialog/share?resourceUrl=' + obj.url + '&srcUrl=' + obj.url + '&title=' + obj.title + '&charset=UTF-8&description=' + obj.con + '&images=' + obj.path);
		} else if (obj.kind == 'happy') {
			window.open('http://www.kaixin001.com/repaste/share.php?rtitle=' + obj.con + ' &rurl=' + obj.url + '&pic=' + obj.path);
		}
	},
	trackQQ : function(v) {
		$.ajax({
			url : v,
			cache : false,
			type : 'GET'
		});
	},
	tracking : function(page, v) {
		setTimeout(function() {
			SUDA.click(v);
		}, 500);

	},
	trackevent : function(page, v) {
		window._CiQ45892.push(['_trackEvent', {
			type : 1,
			labels : [{
				'按钮名称' : v
			}],
			values : [{
				'数量' : 1
			}]
		}]);

		_gaq.push(['_trackEvent', page, v]);
	},
	trackpage : function(page, v) {

		window._CiQ45892.push(['_trackPageView', {
			"urlPath" : page,
			"pageTitle" : v
		}]);
		_gaq.push(['_trackPageview', v]);
	},
	scrollAction : function(obj) {

		if (obj.targety < obj.inity) {
			obj.targety = obj.inity;
		}

		if (obj.targety > $(obj.barbg).height() - $(obj.bar).height()) {
			obj.targety = $(obj.barbg).height() - $(obj.bar).height();
		}

		$(obj.bar).css({
			top : obj.targety
		});
		Comm.Tw(obj.con, obj.speed, {
			top : obj.start - Math.ceil((obj.conH - obj.setmaskH) * (obj.targety / ($(obj.barbg).height() - $(obj.bar).height())))
		});
	},
	scrollMobile : function(obj) {
		Comm.Tw(obj.bar, obj.speed, {
			top : 0 - Math.ceil((obj.targety - obj.start) * (obj.barbgH - obj.barh) / (obj.conH - obj.setmaskH))
		});
	},
	checkMobileTools : function() {

		var ua = navigator.userAgent;
		if (/AppleWebKit.*Mobile/i.test(ua) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(ua))) {

			if (window.location.href.indexOf("?mobile") < 0) {

				if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(ua)) {
					// $('.mesbox').html('Android|webOS|iPhone|iPod|BlackBerry');

				} else if (/iPad/i.test(ua)) {
					// $('.mesbox').html('ipad');

				} else {
					// $('.mesbox').html('other');
				}
			}
			return true;

		} else {
			// $('.mesbox').html('pc');
			return false;
		}
	}
};
