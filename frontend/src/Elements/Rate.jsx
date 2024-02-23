import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const Rate = () => {
	const [rate, setRate] = useState(0);

	console.log("Rating", rate)
	
	return (
		<div className="rating-container">
			{[...Array(5)].map((item, index) => {
				const givenRating = index + 1;
				return (
					<label>
					<input className="radio"
							type="radio"
							value={givenRating}
							onClick={() => {
								setRate(givenRating);
							}}
						/>
						<div className="rating">
							<FaStar
								color={
									givenRating < rate || givenRating === rate
										? "rgb(255,255,153)"
										: "rgb(211,211,211)"
								}
							/>
						</div>	
					</label>
				);
			})}
		</div>
	);
};

export default Rate;
