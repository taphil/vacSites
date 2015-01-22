$(initArticles);

function initArticles() {
	$(".action-button").on("click", function(event) {
		event.preventDefault();
		//alert("here");
		//console.log($(this).closest(".info-article").children(".article-content"));
		
		var articleContent = $(this).closest(".info-article").children(".article-content");
		//console.log(articleContent);
		/*$(articleContent).removeClass("hidden");
		$(articleContent).addClass("visible");*/
		$(articleContent).toggleClass("hidden visible");
		
		var infoArticle = $(this).closest(".info-article");
		/*$(infoArticle).removeClass("collapsed");
		$(infoArticle).addClass("expanded");*/
		$(infoArticle).toggleClass("collapsed expanded");
		
		$(this).html(($(this).html() == "Hide" ? "Show" : "Hide"));
	});
}
