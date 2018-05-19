const findRankingChanges = (ranking1, ranking2, upset) => {
  var rankingDelta = Math.abs(ranking2 - ranking1);
  var expectedPoints = 0;
  var upsetPoints = 0;
  if (rankingDelta <= 12) {
    expectedPoints = 8;
    upsetPoints = 8;
  } else if (rankingDelta <= 37) {
    expectedPoints = 7;
    upsetPoints = 10;
  } else if (rankingDelta <= 62) {
    expectedPoints = 6;
    upsetPoints = 13;
  } else if (rankingDelta <= 87) {
    expectedPoints = 5;
    upsetPoints = 16;
  } else if (rankingDelta <= 112) {
    expectedPoints = 4;
    upsetPoints = 20;
  } else if (rankingDelta <= 137) {
    expectedPoints = 3;
    upsetPoints = 25;
  } else if (rankingDelta <= 162) {
    expectedPoints = 2;
    upsetPoints = 30;
  } else if (rankingDelta <= 187) {
    expectedPoints = 2;
    upsetPoints = 35;
  } else if (rankingDelta <= 212) {
    expectedPoints = 1;
    upsetPoints = 40;
  } else if (rankingDelta <= 237) {
    expectedPoints = 1;
    upsetPoints = 45;
  } else {
    expectedPoints = 0;
    upsetPoints = 50;
  }
  return upset ? upsetPoints : expectedPoints;
};


module.exports = {
  findRankingChanges
}