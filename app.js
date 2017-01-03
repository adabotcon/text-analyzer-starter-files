function startAnalyzeText(){

	$('.js-text-form').submit(function(event){
		event.preventDefault();
		var textToAnalyze = $(this).find('#user-text').val();
		analyzeText(removeReturns(textToAnalyze));
	})
}

function analyzeText(textToAnalyze){
	var wordArray = textToAnalyze.toLowerCase().match(/\b[^\s]+\b/g).sort();

	var wordCount = wordArray.length;
	var uniqueWordCount = calculateUniqueWords(wordArray);
	var averageWordLength = calculateWordLength(wordArray);

	var sentenceAverageLength = calculateSentenceAverageLength(textToAnalyze);

	changeTextInDOM(wordCount, uniqueWordCount, averageWordLength, sentenceAverageLength);
	
}

function tokenizeText(text) { 
	return text.toLowerCase().match(/\b[^\s]+\b/g).sort(); 
}

function calculateUniqueWords(tokens){
 	var distinctWords = []; 
 	for (var i=0; i<tokens.length; i++) 
 	{
 		console.log(distinctWords.indexOf(tokens[i]));
  		if (distinctWords.indexOf(tokens[i]) === -1) 
  		{
   			distinctWords.push(tokens[i]); 
		} 
	} 
	return distinctWords.length; 
}

function calculateWordLength(wordArray){

  var totalLength = wordArray.join("").length;
  return (totalLength / wordArray.length).toFixed(2);

}

function calculateSentenceAverageLength(textToAnalyze){

  var numSentences = textToAnalyze.match(/[.!?]+/g) ? textToAnalyze.match(/[.!?]+/g).length : 1;
  var wordCount = tokenizeText(textToAnalyze).length;
  return (wordCount / numSentences).toFixed(2);

}

function changeTextInDOM(wordCount, uniqueWordCount, averageWordLength, sentenceAverageLength){

	var textAnalyzed = $('.js-text-report');
	textAnalyzed.find('.js-word-count').text(wordCount);
	textAnalyzed.find('.js-unique-word-count').text(uniqueWordCount);
	textAnalyzed.find('.js-average-word-length').text(averageWordLength + " characters");
	textAnalyzed.find('.js-average-sentence-length').text(sentenceAverageLength + " words");
	
	textAnalyzed.removeClass('hidden');
}

function removeReturns(text) {
  return text.replace(/\r?\n|\r/g, "");
}

$(function(){
	startAnalyzeText();
});