import React, { useState, useEffect } from 'react';
import RatingBreakdownBar from './RatingBreakdownBar.jsx';

export default function RatingBreakdown({ allReviews, numReviews }) {
  const [percentage, setPercentage] = useState(null);
  const [reviewDist, setReviewDist] = useState({});
  const [reviewCount, setReviewCount] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });

  // On render + change in # of reviews calculate % of people who recommend
  useEffect(() => {
    let count = 0;

    // Tally tot # of recommendations & # of reviews per rating
    allReviews.map((review) => {
      reviewCount[review.rating] += 1;
      if (review.recommend) {
        count += 1;
      }
    });

    setReviewCount(reviewCount);
    setPercentage(Math.floor((count / numReviews) * 1000) / 10);

    // Calc # of reviews per rating distribution
    Object.keys(reviewCount).map((key) => {
      reviewDist[key] = (reviewCount[key] / numReviews) * 100;
    });

    setReviewDist(reviewDist);
  }, [numReviews]);

  return (
    <div id="RatingBreakdown">
      { numReviews === 0 ? null : (
        <div>
          {percentage}
          % of reviews recommend this product
          {/* {JSON.stringify(reviewCount)} */}
          <br />
          {/* {JSON.stringify(reviewDist)} */}
          { Object.keys(reviewDist).map(key => <RatingBreakdownBar rating={key} dist={reviewDist[key]} />) }
        </div>
      ) }
    </div>
  );
}
