import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function Rating({ rating, total }) {
  const percentage = (rating / total) * 100;
  const totalStars = 5;
  /*
  num of full stars to show
  is simply the no. of multiples of 20
  becase there are only 5 stars and 100/5 = 20
  */
  const fullStars = Math.floor(percentage / (100 / totalStars));

  /*
  add a half star in case percentage
  is indivisible by 20, again 100/5 = 20
  */
  const halfStar = percentage % (100 / totalStars) !== 0;

  // remaing are empty stars
  const emptyStars = totalStars - fullStars - halfStar;

  const stars = [];

  for (let i = fullStars; i > 0; i -= 1) {
    stars.push((<StarIcon />));
  }

  if (halfStar === true) {
    stars.push((<StarHalfIcon />));
  }

  for (let i = emptyStars; i > 0; i -= 1) {
    stars.push((<StarBorderIcon />));
  }

  return (
    <span>
      {stars}
    </span>
  );
}
