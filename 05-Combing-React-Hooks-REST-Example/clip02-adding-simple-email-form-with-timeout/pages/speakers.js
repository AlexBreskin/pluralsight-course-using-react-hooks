import App from '../src/App';
import path from 'path';
import fs from 'fs';
import React from 'react';

export const InitialSpeakersDataContext = React.createContext();

export async function getServerSideProps() {
  const { promisify } = require('util');
  const readFile = promisify(fs.readFile);
  const jsonFile = path.resolve('./', 'db.json');
  let initialSpeakersData;
  try {
    const readFileData = await readFile(jsonFile);
    initialSpeakersData = JSON.parse(readFileData).speakers;
  } catch (error) {
    console.log('/api/speakers/ error:', error);
  }

  return { props: { initialSpeakersData } };
}

function speakers({ initialSpeakersData }) {
  return (
    <InitialSpeakersDataContext.Provider value={initialSpeakersData}>
      <App pageName="Speakers" />
    </InitialSpeakersDataContext.Provider>
  );
}

export default speakers;
