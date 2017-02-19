;
(function(window) {
	document.addEventListener('touchstart', (e) => {
		e.preventDefault();
	})

	function translate(node, yValue) {
		if (typeof node.isTranslate === 'undefined') {
			node.isTranslate = 0;
		}
		if (arguments.length === 1) {
			return node.isTranslate;
		} else if (arguments.length === 2) {
			var yValue = yValue || 0;
			node.isTranslate = yValue;
			node.style.transform = 'translateZ(1px) translateY(' + yValue + 'px)';
		} else {
			throw new Error('参数错误！');
		}
	}

	var top = document.querySelector('.top-fixed'),
		bottom = document.querySelector('.bottom-fixed'),
		scrollWarp = document.querySelector('.scroll-warp'),
		scrollContent = scrollWarp.querySelector('.scroll-content'),
		topHeight = top.offsetHeight,
		maxTranslate = scrollWarp.clientHeight - scrollContent.offsetHeight;

	// 赋值0
	translate(scrollContent, 0);

	function getSize(node) {
		return node.getBoundingClientRect();
	}

	// 判断是否到边界
	function isNotScroll(node) {
		var size = getSize(node),
			maxTranslate = scrollWarp.clientHeight - scrollContent.offsetHeight;
		console.log(size.top - topHeight, maxTranslate, scrollContent.offsetHeight)
		if (size.top > topHeight) {
			return -1;
		} else if (size.top - topHeight < maxTranslate) {
			return 1;
		}
		return
	}

	// 触摸事件
	var lastY = 0;
	var start = 0;

	scrollContent.addEventListener('touchstart', (e) => {
		var target = e.changedTouches[0];
		lastY = target.pageY;
		scrollContent.style.transition = 'none';
		start = translate(scrollContent);
	})
	scrollContent.addEventListener('touchmove', (e) => {
		var target = e.changedTouches[0];
		var nowY = target.pageY - lastY;
		translateY = start + nowY;
		translate(scrollContent, translateY);
	})
	scrollContent.addEventListener('touchend', (e) => {
		var type = isNotScroll(scrollContent);
		scrollContent.style.transition = 'transform .25s ease-out';
		if (type === 1) {
			translate(scrollContent, -scrollContent.offsetHeight + scrollWarp.clientHeight);
		} else if (type === -1) {
			translate(scrollContent, 0);
		}
	})
})(window);