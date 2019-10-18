import AuthRouter from './Auth/AuthRouter';
import DefaultRouter from './Default/DefaultRouter';
import SongRouter from './Songs/SongRouter';
import ArtistRouter from './Artist/ArtistRouter';
import AlbumRouter from './Albums/AlbumRouter';
import CategoriesRouter from './Categories/CategoryRouter';

export default [
  CategoriesRouter,
  AlbumRouter,
  ArtistRouter,
  SongRouter,
  AuthRouter,
  DefaultRouter,
];
