window.hiddenProperty =
	"hidden" in document
		? "hidden"
		: "webkitHidden" in document
		? "webkitHidden"
		: "mozHidden" in document
		? "mozHidden"
		: null;

window.DIRECTIONS = {
	UP: "UP",
	DOWN: "DOWN",
	LEFT: "LEFT",
	RIGHT: "RIGHT",
	UNDIRECTED: "UNDIRECTED",
};
window.isPhone =
	/Mobile|Android|iOS|iPhone|iPad|iPod|Windows Phone|KFAPWI/i.test(
		navigator.userAgent
	);

function getMoveDirection(startx, starty, endx, endy) {
	if (!isPhone) {
		return;
	}

	const angx = endx - startx;
	const angy = endy - starty;

	if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
		return DIRECTIONS.UNDIRECTED;
	}

	const getAngle = (angx, angy) => (Math.atan2(angy, angx) * 180) / Math.PI;

	const angle = getAngle(angx, angy);
	if (angle >= -135 && angle <= -45) {
		return DIRECTIONS.UP;
	} else if (angle > 45 && angle < 135) {
		return DIRECTIONS.DOWN;
	} else if (
		(angle >= 135 && angle <= 180) ||
		(angle >= -180 && angle < -135)
	) {
		return DIRECTIONS.LEFT;
	} else if (angle >= -45 && angle <= 45) {
		return DIRECTIONS.RIGHT;
	}

	return DIRECTIONS.UNDIRECTED;
}

function loadIntro() {
	setTimeout(() => {
		$(".wrap").classList.add("in");
		setTimeout(() => {
			$(".content-subtitle").innerHTML = `<span>${[...subtitle].join(
				"</span><span>"
			)}</span>`;
		}, 270);
	}, 0);
}

let currentPage = "intro";
function switchPage() {
	const DOM = {
		intro: $(".content-intro"),
		path: $(".shape-wrap path"),
		shape: $("svg.shape"),
	};
	DOM.shape.style.transformOrigin = "50% 0%";
	if (currentPage === "intro") {
		anime({
			targets: DOM.intro,
			duration: 1100,
			easing: "easeInOutSine",
			translateY: "-200vh",
		});

		anime({
			targets: DOM.shape,
			scaleY: [
				{ value: [0.8, 1.8], duration: 550, easing: "easeInQuad" },
				{ value: 1, duration: 550, easing: "easeOutQuad" },
			],
		});

		anime({
			targets: DOM.path,
			duration: 1100,
			easing: "easeOutQuad",
			d: DOM.path.getAttribute("pathdata:id"),
			complete: function (anim) {
				if (canvas) {
					cancelAnimationFrame(animationID);
					canvas.parentElement.removeChild(canvas);
					canvas = null;
				}
			},
		});
		loadMain();
		currentPage = "main";
	} else {
		anime({
			targets: DOM.path,
			duration: 1100,
			easing: "easeOutQuad",
			d: DOM.path.getAttribute("pathdata:id"),
			complete: function (anim) {
				if (canvas) {
					cancelAnimationFrame(animationID);
					canvas.parentElement.removeChild(canvas);
					canvas = null;
				}
			},
		});

		anime({
			targets: DOM.shape,
			scaleY: [
				{ value: [1.8, 0.8], duration: 550, easing: "easeInQuad" }, // 反向动画，将页面形状的 scaleY 值从 1.8 到 0.8
				{ value: 1, duration: 550, easing: "easeOutQuad" },
			],
		});

		anime({
			targets: DOM.intro,
			duration: 1100,
			easing: "easeInOutSine",
			translateY: "0", // 将 translateY 值设置为 "0"，使页面上移至 intro 页面的初始位置
		});

		loadIntro();
		setTimeout(() => {
			location.reload();
		}, 2250);
		currentPage = "intro";
	}
}

function loadMain() {
	// if (loadMain.loaded) {
	// 	return;
	// }
	setTimeout(() => {
		$(".card-inner").classList.add("in");
	}, 400);
	// loadMain.loaded = true;
}

window.visibilityChangeEvent = hiddenProperty.replace(
	/hidden/i,
	"visibilitychange"
);
window.addEventListener(visibilityChangeEvent, loadIntro);
window.addEventListener("DOMContentLoaded", loadIntro);

const enterEl = $(".enter");
enterEl.addEventListener("click", switchPage);
enterEl.addEventListener("touchenter", switchPage);

let wheelEnabled = true;

function handleScroll(event) {
	if (!wheelEnabled) {
		return;
	}

	// 处理滚轮滑动事件的逻辑
	switchPage();
	// 设置标志变量为 true
	wheelEnabled = false;

	// 一秒后重置标志变量为 false
	setTimeout(() => {
		wheelEnabled = true;
	}, 2000);
}
document.body.addEventListener("mousewheel", handleScroll, { passive: true });
$(".arrow").addEventListener("mouseenter", switchPage);
$(".arrow-up").addEventListener("mouseenter", switchPage);

if (isPhone) {
	document.addEventListener(
		"touchstart",
		function (e) {
			window.startx = e.touches[0].pageX;
			window.starty = e.touches[0].pageY;
		},
		{ passive: true }
	);
	document.addEventListener(
		"touchend",
		function (e) {
			let endx, endy;
			endx = e.changedTouches[0].pageX;
			endy = e.changedTouches[0].pageY;

			const direction = getMoveDirection(startx, starty, endx, endy);
			if (direction !== DIRECTIONS.UP) {
				return;
			}
			switchPage();
		},
		{ passive: true }
	);
}
