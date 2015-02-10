$(initArticles);

function initArticles() {
	$(".action-button").on("click", toggleExpander);
	//$(".control-img").on("click", toggleExpander);
	$(".article-header").on("click", toggleExpander);
}

function toggleExpander(event) {
	event.preventDefault();
	
	console.log($(this));
	
	var articleContent = $(this).closest(".info-article").children(".content-div");
	$(articleContent).toggleClass("content-hidden content-visible");

	var infoArticle = $(this).closest(".info-article");
	$(infoArticle).toggleClass("collapsed expanded");

	var controlImg = $(this).closest(".info-article").find(".control-img");
	$(controlImg).attr('src', ($(controlImg).attr('src') === 'img/tiny-arrow-top-double-512.png' ? 'img/tiny-arrow-bottom-double-512.png' : 'img/tiny-arrow-top-double-512.png'));
	
	var expandButton = $(this).closest(".info-article").find(".action-button");
	$(expandButton).html(($(expandButton).html() === "Hide" ? "Show" : "Hide"));
	
	var videoPlayers = $(this).closest(".info-article").find("video");
	if ($(this).html() === "Hide") {
		$.each(videoPlayers, function(index, video) {
			video.pause();
		});
	}
}
