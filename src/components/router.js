import AuthRouter from './Auth/AuthRouter';
import DefaultRouter from './Default/DefaultRouter';
import SongRouter from './Songs/SongRouter';
import ArtistRouter from './Artist/ArtistRouter';

export default [
  ArtistRouter,
  SongRouter,
  AuthRouter,
  DefaultRouter,
];
