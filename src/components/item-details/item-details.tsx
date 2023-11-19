/* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import ApiService from '../../services/api-service';
// import Spinner from '../spinner/spinner';

// const Details = () => {
//   const { id } = useParams();
//   const [resultItem, setResultItem] = useState(Object);
//   const [loading, setLoading] = useState(true);

//   const { getItemDetails } = ApiService();

//   useEffect(() => {
//     const loadPageData = async () => {
//       try {
//         const newResultItem = await getItemDetails(Number(id));
//         setResultItem(newResultItem);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error loading data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadPageData();
//   }, [getItemDetails, id]);

//   return (
//     <>
//       {loading && <Spinner />}
//       {!loading && (
//         <div className="item-details" data-testid="Anime">
//           <div>
//             <img src={resultItem.img} alt="Anime" className="anime-img" />
//             <div className="anime-description">
//               <p className="anime-info anime-title">{resultItem.title}</p>
//               <p className="anime-info anime-title">{resultItem.titleJp}</p>
//               <p className="anime-info anime-year">Year: {resultItem.year}</p>
//               <p className="anime-info anime-type">Type: {resultItem.type}</p>
//               <p className="anime-info anime-type">Score: {resultItem.score}</p>
//               <p className="anime-info anime-type">
//                 Rating: {resultItem.rating}
//               </p>
//             </div>
//             <Link to="/rsschool_REACT2023Q4/">
//               <button className="item-details-btn">Close</button>
//             </Link>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Details;
