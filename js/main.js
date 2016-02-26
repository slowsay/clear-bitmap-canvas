/**
 * @author slowsay
 */

$(function() {
	Fileloader.load(alljs, function(e) {
		Fileloader.loadimg(allpng, function(e) {
			ClearBitmap.init('images/pet.jpg', 'images/pet2.jpg');
		});

	});

});
