import React, {createContext, FC, useState, useRef, useEffect} from 'react';
import {PodcastModel} from '../models/PodcastModel';
import {IDatabaseContract} from '../contracts/DatabaseContract';
import {SQLiteServices} from '../services/sqliteServices';

interface DBContextProps {
  podcasts: PodcastModel[];
  subToPodcast: (podcast: PodcastModel) => Promise<void>;
}

export const DBContext = createContext<DBContextProps>({
  podcasts: [],
  subToPodcast: () => Promise.resolve(),
});

export const DBProvider: FC = (props) => {
  const [podcasts, setPodcasts] = useState<PodcastModel[]>([]);
  const db = useRef<IDatabaseContract | null>(null);

  useEffect(() => {
    db.current = new SQLiteServices();
  }, []);

  useEffect(() => {
    if (db.current?.isReady) {
      (async () => {
        if (db.current) {
          const _podcasts = await db.current.getAllPodcast();
          setPodcasts(_podcasts);
        }
      })();
    }
  }, [db.current?.isReady]);

  const subToPodcast = async (podcast: PodcastModel) => {
    if (db.current) {
      await db.current.subscribeToPodcast(podcast);

      const _podcasts = await db.current.getAllPodcast();
      setPodcasts(_podcasts);
    }
  };

  const value: DBContextProps = {
    podcasts,
    subToPodcast,
  };

  return (
    <DBContext.Provider value={value}>{props.children}</DBContext.Provider>
  );
};
