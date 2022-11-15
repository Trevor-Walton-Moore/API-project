import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { writeReviewThunk } from '../../store/reviews';
import '../button.css';
import '../input.css';
import '../Errors/Errors.css'

const ReviewForm = ({ writeReview, hidden, spotId }) => {

    const [hidden2, setHidden2] = spotId.hidden;

    // if (formType === 'Add Spot') {
    //     var [hidden, setHidden] = hiddenState.hiddenState
    // }
    // if (formType === "Edit Spot") var [showModal, setShowModal] = modal;
    // else
    // if (formType === 'Add Spot') var [showModal, setShowModal] = modal.modal
    // console.log('WHAT IT DUE', formType, showModal, setShowModal);

    // const { spotId } = useParams();

    const dispatch = useDispatch();

    const history = useHistory();

    console.log('spotId', spotId.spotId)

    const sessionUser = useSelector(state => state.session.user);


    const [review, setReview] = useState(writeReview.review);
    const [stars, setStars] = useState(writeReview.stars);

    const updateReview = (e) => setReview(e.target.value);
    const updateStars = (e) => setStars(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            spotId: spotId.spotId,
            review,
            stars,
            userId: sessionUser.id
        };

        // if (formType === "Add Spot") {
        //     dispatch(addSpotThunk(payload));
        //     // setHidden(true);
        //     setShowModal(false);
        //     history.push(`/`);
        // } else
        // dispatch(editReviewThunk(payload, reviewId));
        console.log('get thunked')
        setHidden2(true);
        history.push(`/spots/${spotId.spotId}`);
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        setHidden2(true);
        history.push(`/spots/${spotId.spotId}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <input
                    placeholder='review'
                    className="input"
                    type='text'
                    value={review}
                    onChange={updateReview} />
            </label>
            <label>
                <input
                    placeholder='stars'
                    className="input"
                    type='number'
                    value={stars}
                    onChange={updateStars} />
            </label>
            <button className='submit' type="submit">

                <span className="circle" aria-hidden="true">
                    <span className="icon arrow"></span>
                </span>
                <span className="button-text">Save</span>
            </button>
            <button className="cancel" type='button' onClick={(e) => {
                // if (formType === 'Add Spot') setHidden(true);
                // if (formType === 'Add Spot') setShowModal(false);
                handleCancelClick(e);
            }}><span className="circle" aria-hidden="true">
                    <span className="icon arrow"></span>
                </span>
                <span className="button-text">Cancel</span></button>
        </form>
    );
};

export default ReviewForm;