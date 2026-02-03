// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.

const movies = require("./data");

// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  return moviesArray.map(movie => movie.director);
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  if (moviesArray.length === 0) return 0;

  const stevenSpielbergDramaMovies = moviesArray.filter(movie =>
     movie.director === "Steven Spielberg" && 
    movie.genre.includes("Drama")
);
  return stevenSpielbergDramaMovies.length;
  
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (moviesArray.length === 0) return 0;


  const totalScore = moviesArray.reduce((sum, movie) =>{
      return sum + (movie.score || 0);
  },0);

  const average = totalScore / moviesArray.length;

  return Number(average.toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramaMovies = moviesArray.filter(movie =>
     movie.genre.includes("Drama")
    );
    return scoresAverage(dramaMovies);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
 return [...moviesArray].sort((a,b) => { 
  if (a.year === b.year) {
    return a.title.localeCompare(b.title); 
  }
  return a.year - b.year;
 });
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  return [...moviesArray]
  .sort((a, b) => a.title.localeCompare(b.title))
  .map(movie => movie.title)
  .slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  return moviesArray.map(movie =>{
    let minutes = 0;
    const duration = movie.duration;

    if (duration.includes("h")){
      minutes += parseInt(duration) * 60;
    }
    if (duration.includes("min")){
      minutes += parseInt(duration.split("min")[0].split(" ").pop());
    }
    return {
      ...movie,
      duration: minutes
    };
  });
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (moviesArray.length === 0) return null;
    const scoreByYear = {};

  // Group scores by year
  moviesArray.forEach(movie => {
    if (movie.score !== undefined){
      if (!scoreByYear[movie.year]){
        scoreByYear[movie.year] =[];
      }
      scoreByYear[movie.year].push(movie.score);
    }
  });
  let bestYear = null;
  let bestAverage = 0;

  // calculate averages and find best year
  for (const year in scoreByYear){
    const scores = scoreByYear[year];
    const sum = scores.reduce((acc, score)=> acc + score, 0);
    const average = sum / scores.length;

    if (average > bestAverage || (average === bestAverage && Number(year) < Number(bestYear) ) 
    ) {
      bestAverage = average;
      bestYear = year;
    }
  }
  return `The best year was ${bestYear} with an average score of ${Number(bestAverage.toFixed(2))}`;
}



// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}
