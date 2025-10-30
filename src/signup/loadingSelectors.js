import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-overlay" data-testid="loading-screen">
      <div className="spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default LoadingScreen;
import { createSelector } from '@reduxjs/toolkit';

/**
 * A memoized selector to determine if any RTK Query queries or mutations are pending.
 * @param {object} api - The RTK Query api slice.
 * @returns {function(object): boolean} - A selector function that returns true if any request is pending.
 */
export const createIsLoadingSelector = (api) => createSelector(
  (state) => state[api.reducerPath].queries,
  (state) => state[api.reducerPath].mutations,
  (queries, mutations) => {
    const isQueryPending = Object.values(queries).some(
      (query) => query?.status === 'pending'
    );
    const isMutationPending = Object.values(mutations).some(
      (mutation) => mutation?.status === 'pending'
    );
    return isQueryPending || isMutationPending;
  }
);
