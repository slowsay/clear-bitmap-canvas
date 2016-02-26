/**
 * @author slowsay
 */
var mousedown, ctx, w, h, offsetX, offsetY, picimg, setint, seti, maskimg;
var ClearBitmap = {
	init : function(path, path2) {
		mousedown = false;
		var canvas = document.getElementById('icanvas');
		ctx = canvas.getContext('2d');
		maskimg = new Image();
		maskimg.src = 'images/brush.png';
		var img = new Image();
		img.src = path;
		img.onload = function(e) {
			w = e.target.width, h = e.target.height;
			offsetX = canvas.offsetLeft, offsetY = canvas.offsetTop;
			canvas.width = w, canvas.height = h;

			canvas.style.backgroundImage = 'url(' + e.target.src + ')';	
			ctx.fillStyle = 'transparent';
			ctx.fillRect(0, 0, w, h);

			var img = new Image();
			img.src = path2;
			ctx.fillStyle = ctx.createPattern(img, "repeat");
			ctx.fillRect(0, 0, w, h);
			ctx.globalCompositeOperation = 'destination-out';
			canvas.addEventListener('touchstart', ClearBitmap.eventDown);
			canvas.addEventListener('touchend', ClearBitmap.eventUp);
			canvas.addEventListener('touchmove', ClearBitmap.eventMove);
			canvas.addEventListener('mousedown', ClearBitmap.eventDown);
			canvas.addEventListener('mouseup', ClearBitmap.eventUp);
			canvas.addEventListener('mousemove', ClearBitmap.eventMove);
		};
	},
	eventDown : function(e) {
		e.preventDefault();
		mousedown = true;
	},
	eventUp : function(e) {
		e.preventDefault();
		mousedown = false;
	},
	eventMove : function(e) {
		e.preventDefault();
		if (mousedown) {

			if (e.changedTouches) {
				e = e.changedTouches[e.changedTouches.length - 1];
			}
			var x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX || 0;
			var y = (e.clientY + document.body.scrollTop || e.pageY) - offsetY || 0;
			//draw bitmap
			with (ctx) {
				drawImage(maskimg, x - Math.ceil(maskimg.width >> 1), y - Math.ceil(maskimg.height >> 1), maskimg.width, maskimg.height);

			}
		}
	}
}; 