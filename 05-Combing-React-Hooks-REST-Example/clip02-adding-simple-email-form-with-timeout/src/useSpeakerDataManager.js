import speakersReducer from './speakersReducer';
import { useEffect, useReducer, useContext } from 'react';
import axios from 'axios';

import { InitialSpeakersDataContext } from '../pages/speakers';

function useSpeakerDataManager() {
  const initialSpeakersData = useContext(InitialSpeakersDataContext);

  const [
    {
      isLoading,
      speakerList,
      favoriteClickCount,
      hasErrored,
      error,
      imageRerenderIdentifier,
    },
    dispatch,
  ] = useReducer(speakersReducer, {
    isLoading: true,
    speakerList: [],
    favoriteClickCount: 0,
    hasErrored: false,
    error: null,
    imageRerenderIdentifier: 0,
  });

  function incrementFavoriteClickCount() {
    dispatch({ type: 'incrementFavoriteClickCount' });
  }

  function forceImageRerender() {
    dispatch({ type: 'forceImageRerender' });
  }

  function toggleSpeakerFavorite(speakerRec) {
    const updateData = async function () {
      axios.put(`/api/speakers/${speakerRec.id}`, {
        ...speakerRec,
        favorite: !speakerRec.favorite,
      });
      speakerRec.favorite === true
        ? dispatch({ type: 'unfavorite', id: speakerRec.id })
        : dispatch({ type: 'favorite', id: speakerRec.id });
    };
    updateData();
  }

  useEffect(() => {
    const fetchData = async function () {
      try {
        let result = await axios.get('/api/speakers');
        dispatch({ type: 'setSpeakerList', data: result.data });
      } catch (error) {
        dispatch({ type: 'errored', error });
      }
    };
    fetchData();

    return () => {
      console.log('cleanup');
    };
  }, []); // [speakingSunday, speakingSaturday]);
  return {
    isLoading,
    speakerList,
    favoriteClickCount,
    incrementFavoriteClickCount,
    toggleSpeakerFavorite,
    hasErrored,
    error,
    forceImageRerender,
    imageRerenderIdentifier,
  };
}

export default useSpeakerDataManager;
